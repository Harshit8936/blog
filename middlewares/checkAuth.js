const { validateToken } = require("./auth");

function checkUserLogin(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        try {
            const userpayload = validateToken(tokenCookieValue);
            req.user = userpayload;
        } catch (error) {
            
        }
        return next();
    }
}

module.exports = {checkUserLogin}