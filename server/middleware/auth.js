const {createToken, compareToken} = require('../helpers/jwt')
const {User, Transportation} = require('../models')

const authentication = async(req,res,next) => {
    try {
        const {authorization} = req.headers
        if (!authorization){
            throw {name : "EmptyToken"}
        }
        const rowToken = authorization.split(' ')
        if(rowToken[0]!== "Bearer"){
            throw {name : "EmptyToken"}
        }
        if(rowToken.length < 2){
            throw {name : "EmptyToken"}
        }
        const token = rowToken[1];
        const playload = compareToken(token)
        // console.log(playload, ">>>>>>>>>>>>>");
        const data = await User.findByPk(playload.id)
        req.user = data
       
  
        next()

    } catch (error) {
        next(error)
        
    }
    
}

const authorization = async(req,res,next) => {
    try {
        if(req.user.role === 'Admin'){
            next()
        }else {
            throw {name : "Forbidden"}
        }
    } catch (error) {
        next(error)
    }
}

const authorizationRentCar = async (req,res,next) => {
    try {
        const {id} = req.params
        // console.log(id, "<id");
        if(req.user.role === 'Admin'){
            next()
        }else {
            const rentcar = await Transportation.findByPk(+id)
            console.log(rentcar);
            let authorId = rentcar.authorId
            if (authorId === id){
                next()
            } else {
                throw {name : "Forbidden"}
            }
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {authentication,authorization, authorizationRentCar}