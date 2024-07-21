const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(express.json())


const url = 'mongodb://localhost:27017/UsersDB'
mongoose.connect(url, {useNewUrlParser:true})
const con= mongoose.connection

con.on('open', () =>{
    console.log("Database 1 connected...")
})


const url2='mongodb://localhost:27017/test'
const mongoose2 = new mongoose.Mongoose();
mongoose2.connect(url2, {useNewUrlParser:true})
const con2= mongoose2.connection

con2.on('open', () =>{
    console.log("Database 2 connected...")
})



const usersRouter= require('./routers/users')
app.use('/users', usersRouter)


app.listen(9000)