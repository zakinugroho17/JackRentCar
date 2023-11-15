const express = require('express')
const app = express()
// const port = 3000
const Controller = require('./Controllers/controller')
const ControllerLogin = require('./Controllers/controllerLogin')

const showError = require('./middleware/nextError')
const { authentication, authorizationRentCar, authorization } = require('./middleware/auth')

// const multer  = require('multer')
// const storage = multer.memoryStorage()
// const upload = multer({ storage })




app.use(express.urlencoded({ extended: true }));
app.use(express.json());




//user
app.post("/login", ControllerLogin.login)
//pub rentcar
// app.get("/", Controller.showHome)
app.use(authentication)
app.post("/transportation", Controller.createRentCar) //done
app.get("/transportation", Controller.showRentCar) //done
app.get("/transportation/:id", Controller.showRentCarById) //done
app.put("/transportation/:id",authorizationRentCar, Controller.updateRentCar) //done
// app.patch("/transportation/:id",authorizationLodging, upload.single('imgUrl'), Controller.updateLodgingUpload) //done
app.delete("/transportation/:id",authorizationRentCar, Controller.deleteRentCar) //done

// app.use(authentication)//middleware
app.post("/register", authorization, ControllerLogin.register)
//type
app.post("/types", Controller.createSupport) //done
app.get("/types", Controller.showType) //done
app.put("/types/:id", Controller.updateType) //done
app.delete("/types/:id", Controller.deleteType) //done






app.use(showError)


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app