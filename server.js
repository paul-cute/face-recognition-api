const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register');
const { signin } = require('./controllers/signin');
const { profiles } = require('./controllers/profile');
const { images } = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'postgres',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.post('/signin', (req,res) => {signin(req,res,bcrypt,db)})
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res)=> {profiles(req,res,db)})
app.put('/image', (req,res) => {images(req,res,db)})

app.listen(process.env.PORT, () =>{
    console.log(`app is running in port ${process.env.PORT}`)
})