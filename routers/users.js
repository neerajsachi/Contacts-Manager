const express = require('express')
const router = express.Router()
const User= require('../models/user')
const cors = require('cors');




router.get('/', async(req, res) =>{
    try{
        const users= await User.find()
        res.json(users)
    }catch(err){
        res.send('Error ' +err )
    }
})

router.get('/:id', async(req, res) =>{
    try{
        const user= await User.findById(req.params.id)
        res.json(user)
    }catch(err){
        res.send('Error ' +err )
    }
})

router.post('/', async(req, res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })

    try{
        const a1= await user.save()
        res.json(a1)
    }catch(err){
        res.send('Error ' +err)
    }

})

router.put('/:id', async(req, res) =>{
    try{
    const user = await User.findById(req.params.id)
    user.name=req.body.name
    user.email=req.body.email
    user.phone=req.body.phone

    const a1= await user.save()
    res.json(a1)
    }catch(err){
        res.send('Error' +err)
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        res.json({message:"user deleted"})
    }catch(err){
        res.send('Error ' +err)
    }
})


module.exports = router