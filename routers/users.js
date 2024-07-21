const express = require('express')
const router = express.Router()
const User= require('../models/user')
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthUser = require('../models/authUser');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

router.get('/',authenticateToken, async(req, res) =>{
    try{
        const users= await User.find({ userId: req.user._id})
        res.json(users)
    }catch(err){
        res.send('Error ' +err )
    }
})

router.get('/:id', authenticateToken, async(req, res) =>{
    try{
        const user= await User.findById({ _id: req.params.id, userId: req.user._id })
        if (!user) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(user)
    }catch(err){
        res.send('Error ' +err )
    }
})

router.post('/', authenticateToken, async(req, res) =>{
    console.log('User ID from token:', req.user._id);
    console.log('Request body:', req.body);
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        company: req.body.company,
        phone: req.body.phone,
        userId: req.user._id
    })

    try{
        const a1= await user.save()
        console.log('Saved user:', a1);
        res.status(201).json(a1);
    }catch(err){
        console.log(err);
        res.send('Error ' +err)
    }

})

router.put('/:id', authenticateToken, async(req, res) =>{
    try{
    const user = await User.findById({ _id: req.params.id, userId: req.user._id })
    if (!user) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    user.fname=req.body.fname
    user.lname=req.body.lname
    user.address=req.body.address
    user.company=req.body.company
    user.phone=req.body.phone

    const a1= await user.save()
    res.json(a1)
    }catch(err){
        res.send('Error' +err)
    }
})

router.delete('/:id', authenticateToken, async(req, res) =>{
    try{
        const user= await User.findByIdAndDelete({ _id: req.params.id, userId: req.user._id })
        if (!user) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({message:"user deleted"})
    }catch(err){
        res.send('Error ' +err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await AuthUser.findOne({ email: req.body.email, password: req.body.password });
        if (user) {
            const accessToken = jwt.sign({ _id: user._id,email: req.body.email }, process.env.ACCESS_TOKEN_SECRET);
            return res.json({ message: "Authentication successful", accessToken, user });
        } else {
            return res.status(401).json({ message: "Authentication failed" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phone,
            address
        } = req.body;
        
        const profilePicture = req.file ? req.file.path : null;

        const existingUser = await AuthUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new AuthUser({
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phone,
            address,
            profilePicture
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = router