const request = require('supertest')
const app = require('../app')
const {User} = require('../models/index')

let token


beforeAll(async ()=>{
    await User.bulkCreate([
        {
            "email" : "user1@example.com",
            "password" : "password1",
            "role" : "Admin"
        },
        {
            "email" : "user2@example.com",
            "password" : "password2"
        }
    ], { individualHooks : true})

    const admin = {
        "email" : "user1@example.com",
        "password" : "password1"
    }

    const response = await request(app)
    .post("/login")
    .send(admin)
    .expect(200)

    expect(response.body).toHaveProperty('access_token')
    token = response.body.access_token

    const user = {
        "email" : "user2@example.com",
        "password" : "password2"
    }

    const responseUser = await request(app)
    .post("/login")
    .send(user)
    .expect(200)

    expect(responseUser.body).toHaveProperty("access_token")
    tokenUser = responseUser.body.access_token
})

afterAll(async()=>{
    await User.destroy({
        truncate: true,
        restartIdentity :true,
        cascade : true 
    })
})

describe("post /login", () => {
    test('Berhasil Login dan mengirimkan access token', async () =>{
        const user = {
            "email": "user1@example.com",
            "password": "password1"
        }

        const response = await request(app)
        .post('/login')
        .send(user)
        .expect(200)
    
        expect(response.body).toHaveProperty('access_token')
        token = response.body.access_token

    
    })

    test('Email tidak diberikan / tidak di input', async () =>{
        const user = {
            // "email": "user2@example.com",
            "password": "password1"
        }
        const response = await request(app)
        .post('/login')
        .send(user)
        
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Email is not empty')
    
    })

    test('Password tidak diberikan / tidak di input', async () =>{
        const user = {
            "email": "staff1@example.com",
            // "password": "password1"
        }
        const response = await request(app)
        .post('/login')
        .send(user)
        
  
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Password is not empty')
    
    })

    test('Email diberikan invalid/tidak terdaftar', async () =>{
        const user = {
            "email": "hh@example.com",
            "password": "password1"
        }
        const response = await request(app)
        .post('/login')
        .send(user)
        
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'invalid email or password')
    
    })

    test('Password diberikan salah/tidak match', async () =>{
        const user = {
            "email": "zakiasd@example.com",
            "password": "password12"
        }
        const response = await request(app)
        .post('/login')
        .send(user)
        

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'invalid email or password')
    
    })
})

describe("/register", () => {
    test('Berhasil Register User', async() => {
        const user = {
            "email": "adasd@example.com",
            "password": "password13"
        }
     
        let {status,body} = await request(app)
        .post('/register')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("id",expect.any(Number))
        expect(body).toHaveProperty("email",user.email)
    })

    test('Email tidak di input', async() => {
        const user = {
            "password": "password13"
        }
  
        let {status,body} = await request(app)
        .post('/register')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Email is not NULL')
     
    })

    test('Password tidak di input', async() => {
        const user = {
            "email": "admin13@example.com"
        }
  
        let {status,body} = await request(app)
        .post('/register')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Password is not NULL')
     
    })

    test('Email input string kosong', async() => {
        const user = {
            "email": "",
            "password": "password13"
        }
  
        let {status,body} = await request(app)
        .post('/register')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Email is not EMPTY')
    })

    test('Password input string kosong', async() => {
        const user = {
            "email": "admin13@example.com",
            "password": ""
        }
  
        let {status,body} = await request(app)
        .post('/register')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Validation len on password failed')
     
    })

    test('Email sudah terdaftar', async() => {
        const user = {
            "email": "adasd@example.com",
            "password": "password13"
        }
  
        let {status,body} = await request(app)
        .post('/register')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Email is EXIST')
     
    })

    test('Format Email Invalid', async() => {
        const user = {
            "email": "user1mail.com",
            "password": "password13"
        }
  
        let {status,body} = await request(app)
        .post('/register')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Format email INVALID')
     
    })

    
})