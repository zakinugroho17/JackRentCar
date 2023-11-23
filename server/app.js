const express = require('express')
const app = express()
// const port = 3000
const Controller = require('./Controllers/controller')
const ControllerLogin = require('./Controllers/controllerLogin')
const { OAuth2Client } = require("google-auth-library")
const { User } = require('./models/index')
const cors = require("cors")
const jwt = require("jsonwebtoken")
const {createToken} = require("./helpers/jwt")

const showError = require('./middleware/nextError')
const { authentication, authorizationRentCar, authorization } = require('./middleware/auth')
const Car = require('./Controllers/controllerRent')




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())




//user
app.post("/login", ControllerLogin.login)
app.post("/register", ControllerLogin.register)
app.post('/auth/google/callback', async (req, res) => {
    try {
        const code = req.body.code
        // console.log(code, 'ini cod');
        const client = new OAuth2Client();

        const ticket = await client.verifyIdToken({
            idToken: code,
            audience: process.env.CLIENT_ID, 

  });

        const {email, sub, password, providerId} = ticket.getPayload();

        const [user, created] = await User.findOrCreate({ where: { email }, defaults: {
            email,
            password: sub
          } });
        console.log(user, created, "<<<");
        const access_token = createToken({id : user.id})

    res.status(200).json(access_token);
    } catch (error) {
    console.log(error.message);
    }
  });

app.post("/rentstatus", Car.rentStatus)
app.use(authentication)
app.get("/checkrole", async(req,res) =>{
    try {
        // console.log(req.user);
        res.status(200).json({role : req.user.role})
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }
})

app.post("/transportation", Controller.createRentCar) //done
app.get("/transportation", Controller.showRentCar) //done
app.post("/rental/:id", Car.rentCar)
app.get("/transportation/:id", Controller.showRentCarById) //done
app.put("/transportation/edit/:id",authorizationRentCar, Controller.updateRentCar) //done
app.delete("/transportation/:id",authorizationRentCar, Controller.deleteRentCar) //done

// app.use(authentication)//middleware


app.use(showError)


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app