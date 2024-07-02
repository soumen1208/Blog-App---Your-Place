const express = require('express');
const app = express();
const blogRoutes = require('./api/routes/blog')
const categoryRoutes = require('./api/routes/category')
const authRoutes = require('./api/routes/auth')
const commentRoutes = require('./api/routes/comment')
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');


const dotenv = require('dotenv');
dotenv.config()
mongoose.connect(process.env.MONGO_URL);
// await mongoose.connect(process.env.MONGO);
mongoose.connection.on('connected', () => {
    console.log("Connected with DB");
})
mongoose.connection.on('error', (err) => {
    console.log("Connections failed");
    console.log(err);
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/blog', blogRoutes);
app.use('/category', categoryRoutes);
app.use('/auth', authRoutes);
app.use('/comment', commentRoutes);


app.use((req, res) => {
    res.status(200).json({
        msg: "bad request"
    })
})

module.exports = app;