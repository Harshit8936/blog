const UserModel = require('../models/User');



const signInPage = (req,res,next)=>{
    return res.render("signin")
}
const signUpPage = (req,res,next)=>{
    return res.render("signup")
}

const addUser = async(req,res,next)=>{
    const {fullname,email,password} = req.body;
    let userSave = new UserModel({fullname,email,password});
    const userObj = await userSave.save();
    return res.redirect("/")
}


const loginUser = async(req,res,next)=>{
    try {
    const {email,password} = req.body;
    const token = await UserModel.matchPasswordandgenerateToken(email,password);
    console.log("token",token);
    return res.cookie('token',token).redirect("/")
    } catch (error) {
        return res.render("signin",{
            error:"Invalid email or password"
        })
    }
}

const logoutUser = async(req,res,next)=>{
    try {
        return res.clearCookie('token').redirect("/");
    } catch (error) {
        return res.render("signin",{
            error:"something went wrong"
        })
    }
}


module.exports = {signInPage,signUpPage,addUser,loginUser,logoutUser}