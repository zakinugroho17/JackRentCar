const jwt = require("jsonwebtoken")

function createToken(input){
    return jwt.sign(input, process.env.SECRET)
}
function compareToken(token){
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded
}


module.exports = {createToken, compareToken};