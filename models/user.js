
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    address: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthUser', required: true } 
});


module.exports= mongoose.model('User', userSchema)
