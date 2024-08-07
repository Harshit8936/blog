const router = require('express').Router();
const userController = require('../controllers/userController')




router.get("/signin",userController.signInPage)
router.get("/signup",userController.signUpPage)
router.post("/adduser",userController.addUser)
router.post("/login",userController.loginUser)
router.get("/logout",userController.logoutUser)


module.exports = router