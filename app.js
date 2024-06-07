const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/UsersDB'
const cors = require('cors');


const app = express();
app.use(cors());


mongoose.connect(url, {useNewUrlParser:true})
const con= mongoose.connection

con.on('open', () =>{
    console.log("Database connected...")
})

app.use(express.json())

const usersRouter= require('./routers/users')
app.use('/users', usersRouter)


app.listen(9000)