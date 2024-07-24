require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log("Database 1 connected...");
});

const url2 = process.env.MONGODB_URI_2;
const mongoose2 = new mongoose.Mongoose();
mongoose2.connect(url2, { useNewUrlParser: true });
const con2 = mongoose2.connection;

con2.on('open', () => {
    console.log("Database 2 connected...");
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log("Server started on port 9000");
});
