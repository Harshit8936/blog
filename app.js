require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkUserLogin } = require('./middlewares/checkAuth');
const Blog = require('./models/Blog');
const mongoURI = process.env.MONGO_URI;
// "mongodb://localhost:27017/blogify";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkUserLogin("token"))
app.use(express.static(path.resolve('./public')))       // to tell the express to serve this folder as static
//set template engine
app.set("view engine","ejs");
app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})
app.use('/',require('./routes/user'));
app.use('/',require('./routes/blog'));

mongoose.connect(mongoURI).then(e=>console.log("Mongodb is connected"))


app.listen(port,()=>console.log(`App is running on ${port}`))