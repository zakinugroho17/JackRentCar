const express = require('express')
const app = express()
// const port = 3000
const Controller = require('./Controllers/controller')
const ControllerLogin = require('./Controllers/controllerLogin')
const { OAuth2Client } = require("google-auth-library")
const User = require('./models/user')
const cors = require("cors")

const showError = require('./middleware/nextError')
const { authentication, authorizationRentCar, authorization } = require('./middleware/auth')

// const multer  = require('multer')
// const storage = multer.memoryStorage()
// const upload = multer({ storage })




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())




//user
app.post("/login", ControllerLogin.login)
//pub rentcar
// app.get("/", Controller.showHome)
app.post("/register", ControllerLogin.register)
app.use(authentication)
app.post("/transportation", Controller.createRentCar) //done
app.get("/transportation", Controller.showRentCar) //done
app.get("/transportation/:id", Controller.showRentCarById) //done
app.put("/transportation/edit/:id",authorizationRentCar, Controller.updateRentCar) //done
// app.patch("/transportation/:id",authorizationLodging, upload.single('imgUrl'), Controller.updateLodgingUpload) //done
app.delete("/transportation/:id",authorizationRentCar, Controller.deleteRentCar) //done

// app.use(authentication)//middleware

//type
app.post("/types", Controller.createSupport) //done
app.get("/types", Controller.showType) //done
app.put("/types/:id", Controller.updateType) //done

app.delete("/types/:id", Controller.deleteType) //done
//buy
app.post("/transportation/buy/:id", Controller)




app.post('/auth/google/callback', async (req, res) => {
 
    try {
        const code = req.body.code

        const client = new OAuth2Client();

        const ticket = await client.verifyIdToken({
            idToken: code,
            audience: process.env.CLIENT_ID, 

  });

        const {email, sub, password, providerId} = ticket.getPayload();


        const user = await User.findOrCreate({ where: { email, username : sub, password : sub } });
        const access_token = jwt.sign({id : user[0].id})

    res.status(200).json(access_token);
    } catch (error) {
    console.log(error.message);
    }
  });


app.use(showError)


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app