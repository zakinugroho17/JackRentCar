const { User } = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { createTransport} = require("nodemailer")
class controllerLogin {
    static async register(req, res, next) {
        try {
            // console.log(req.body)
            const transporter = createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {
                    user: process.env.DEV_EMAIL,
                    pass: process.env.DEV_PASS,
                },
              });
            let data = await User.create(req.body);
            // console.log(req.body);
            // console.log(User);
            await transporter.sendMail({
                from: 'JackRentCar@mail.com',
                to: req.body.email,
                subject: "Welcome to Jack Rental Car",
                html : "Congrats for successfully register"
               })
            res.status(201).json({ id: data.id, email : data.email})
        } catch (error) {
            next(error)

        }
    }

    static async login(req,res,next){
        try {

            if(!req.body.email){
                throw {name : "NotEmptyEmail"}
            }
            if(!req.body.password){
                throw {name : "NotEmptyPassword"}
            }
            
            // console.log(req.body.email, "<>>>");
            
            let data = await User.findOne({
                where : {
                    email : req.body.email,
                }
            })
            // console.log(data, "<<<<<<");
            if(!data){
                throw {name : "invalidUser/Password"}
            }
            const isValid = comparePassword(req.body.password, data.password);
            if (isValid === true){
                const token = createToken({
                    id : data.id,
                    role :  data.role,
                    phoneNumber : data.phoneNumber
                })
                

                res.status(200).json({ access_token : token, email : data.email, role : data.role})
            } else {
                throw {name : "invalidUser/Password"}
                
            }
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }
}

module.exports = controllerLogin