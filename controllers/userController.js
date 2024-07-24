const User = require('../models/user');
const AuthUser = require('../models/authUser');
const jwt = require('jsonwebtoken')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ userId: req.user._id });
        res.json(users);
    } catch (err) {
        res.status(500).send('Error ' + err);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, userId: req.user._id });
        if (!user) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Error ' + err);
    }
};

exports.createUser = async (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        company: req.body.company,
        phone: req.body.phone,
        userId: req.user._id
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send('Error ' + err);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, userId: req.user._id });
        if (!user) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.address = req.body.address;
        user.company = req.body.company;
        user.phone = req.body.phone;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send('Error ' + err);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!user) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).send('Error ' + err);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all the required fields" });
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
        return res.status(400).json({ error: "Please enter a valid email address" });
    }

    try {
        const user = await AuthUser.findOne({ email, password });
        if (user) {
            const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            return res.json({ message: "Authentication successful", accessToken, user });
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.register = async (req, res) => {
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

    try {
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
};
