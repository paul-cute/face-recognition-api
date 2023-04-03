const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const morgan = require('morgan')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const { profiles, handleProfileUpdate } = require('./controllers/profile');
const { images } = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.POSTGRES_HOST,
      port : 5432,
      user : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB
    }
  });

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res)=> {profiles(req,res,db)})
app.post('/profile/:id', (req,res)=> {handleProfileUpdate(req,res,db)})
app.put('/image', (req,res) => {images(req,res,db)})

app.listen(3000, () =>{
    console.log('app is running')
})