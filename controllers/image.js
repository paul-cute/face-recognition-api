const images = (req,res, db)=>{
    const {id} = req.body;
    db.from('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
    res.json(entries[0])
   })
   .catch(error => res.status(400).json('unable to get the entries'))
}

module.exports = {
    images,
}