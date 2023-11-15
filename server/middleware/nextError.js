const Controller = require('../Controllers/controller')

function showError(error,req,res,next){
    switch (error.name) {
        case "invalidUser/Password":
            res.status(401).json({ message : "invalid email or password"})
            break;
        case "EmptyToken":
            res.status(401).json({message : "Token is Empty"})
            break;
        case "Forbidden":
            res.status(403).json({message : "Forbidden Access"})
            break;
        case "SequelizeValidationError" :
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: error.errors[0].message })
            break;
        case "NotEmptyEmail" :
            res.status(400).json({ message : "Email is not empty"})
            break;
        case "NotEmptyPassword" :
            res.status(400).json({ message : "Password is not empty"})
            break;
        case "JsonWebTokenError" : 
            res.status(401).json({message : "Invalid Token"})
            break;
        case "InvalidImg":
            res.status(400).json({ message: "Invalid Img" })
            break;
        case "NotFound":
            res.status(404).json({ message : `data not found`})
            break;
        case "NotFoundId":
            res.status(404).json({ message : `integer id (required)`})
            break;
        default:
            console.log(error, "<<< error 500");
            res.status(500).json({ message : "Internal Server Error"});
            break;
    }
}

module.exports = showError