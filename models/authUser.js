const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String } // URL to the profile picture
});

const AuthUser = mongoose.model('AuthUser', authUserSchema);

module.exports = AuthUser;
