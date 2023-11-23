const request = require('supertest')
const app = require('../app')
const {User, Transportation} = require('../models/index')

let token 
let tokenUser
let invalidToken = "invalidToken"


beforeAll(async () => {
    await User.bulkCreate(
        [{
        "email": "user1@example.com",
        "password": "password1",
        "role" : "Admin"
        },
        {
            "email" : "user2@example.com",
            "password" : "password2"

        }], { individualHooks: true }
    )

    await Transportation.bulkCreate([
        {
            "name": "Suzuki GTR IIII",
    "description": "Mobil tercepat di nganjukk",
    "imgUrl": "https://example.com/hotel-a.jpg",
    "location": "nganjulk",
    "price": 2500001
        }
    ])

    const admin = {
        "email": "user1@example.com",
        "password": "password1"
    }

    const response = await request(app)
    .post('/login')
    .send(admin)
    .expect(200)

    expect(response.body).toHaveProperty('access_token')
    token = response.body.access_token

    const user = {
        "email": "user2@example.com",
        "password": "password2"
    }

    const responseUser = await request(app)
    .post('/login')
    .send(user)
    .expect(200)

    expect(responseUser.body).toHaveProperty('access_token')
    tokenUser = responseUser.body.access_token

})

afterAll(async() => {
    await User.destroy({
        truncate: true,
        restartIdentity :true,
        cascade : true
        
    })
})


describe("POST /transportation", () =>{
    test('Berhasil membuat entitas utama', async() =>{
        const transportation = {
            "name" : "Suzuki GTR",
            "description" : "Mobil tercepat di nganjuk",
            "imgUrl" : "https://example.com/hotel-a.jpg",
            "location" : "nganjuk",
            "price" : 2500000,
        }
        let {status,body} = await request(app)
        .post("/transportation")
        .set('authorization', `Bearer ${token}`)
        .send(transportation)

        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        // console.log(body, "<body atas");
        expect(body).toHaveProperty("name",expect.any(String))
        expect(body).toHaveProperty("description", expect.any(String))
        expect(body).toHaveProperty("imgUrl",expect.any(String))
        expect(body).toHaveProperty("location", expect.any(String))
        expect(body).toHaveProperty("price",expect.any(Number))
    })

    test('Gagal Menjalankan fitur karena belum login', async() =>{
        const transportation = {
            "name" : "Suzuki GTR",
            "description" : "Mobil tercepat di nganjuk",
            "imgUrl" : "https://example.com/hotel-a.jpg",
            "location" : "nganjuk",
            "price" : 2500000,
        }
        let {status,body} = await request(app)
        .post("/transportation")
        .send(transportation)

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Token is Empty")
       
        
    })

    test('gagal menjalankan fitur karena token diberikan tidak valid', async() =>{
        const transportation = {
            "name" : "Suzuki GTR",
            "description" : "Mobil tercepat di nganjuk",
            "imgUrl" : "https://example.com/hotel-a.jpg",
            "location" : "nganjuk",
            "price" : 2500000
        }
        let {status,body} = await request(app)
        .post("/transportation")
        .set('authorization', `Bearer ${invalidToken}`)
        .send(transportation)

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Invalid Token")
       
        
    })

    test('gagal ketika request body tidak sesuai(validation required)', async() =>{
        const transportation = {
            "description" : "Mobil tercepat di nganjuk",
            "imgUrl" : "https://example.com/hotel-a.jpg",
            "location" : "nganjuk",
            "price" : 2500000
        }
        let {status,body} = await request(app)
        .post("/transportation")
        .set('authorization', `Bearer ${token}`)
        .send(transportation)

        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Name is not NULL")
       
        
    })
})


describe("GET /transportation", ()=>{
    test('Berhasil Mendapatkan Data Entitas Utama', async()=>{
        let {status,body} = await request(app)
        .get("/transportation")
        .set('authorization', `Bearer ${token}`)

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        // console.log(body, "<<body get");
        // console.log(body, "ini body");
        expect(body.rows[0]).toHaveProperty("name",expect.any(String))
        expect(body.rows[0]).toHaveProperty("description", expect.any(String))
        expect(body.rows[0]).toHaveProperty("imgUrl",expect.any(String))
        expect(body.rows[0]).toHaveProperty("location", expect.any(String))
        expect(body.rows[0]).toHaveProperty("price", expect.any(Number))   
    })

    test('Gagal menjalankan fitur karena belum login', async()=>{
        let {status,body} = await request(app)
        .get("/transportation")
      

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'Token is Empty' )
    })

    test('Gagal menjalankan fitur karena token tidak valid', async()=>{
        let {status,body} = await request(app)
        .get("/transportation")
        .set('authorization', `Bearer ${invalidToken}`)
      

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'Invalid Token' )
    })


})

describe("GET /transportation", ()=>{
    test('Berhasil Mendapatkan Data Entitas Utama berdasarkan ID', async()=>{
        let {status,body} = await request(app)
        .get("/transportation/1")
        .set('authorization', `Bearer ${token}`)

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        // console.log(body, "ini body");
        expect(body.data).toHaveProperty("name",expect.any(String))
        expect(body.data).toHaveProperty("description", expect.any(String))
        expect(body.data).toHaveProperty("imgUrl",expect.any(String))
        expect(body.data).toHaveProperty("location", expect.any(String))
        expect(body.data).toHaveProperty("price", expect.any(Number))  
        
    })

    test('Gagal menjalankan fitur karena belum login', async()=>{
        let {status,body} = await request(app)
        .get("/transportation/1")
      

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'Token is Empty' )
    })

    test('Gagal menjalankan fitur karena token tidak valid', async()=>{
        let {status,body} = await request(app)
        .get("/transportation/1")
        .set('authorization', `Bearer ${invalidToken}`)
      

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'Invalid Token' )
    })

    test('Gagal menjalankan fitur karena id tidak ada di database', async()=>{
        let {status,body} = await request(app)
        .get("/transportation/10")
        .set('authorization', `Bearer ${token}`)
      

        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'data not found' )
    })
})

describe("PUT /transportation/:id", ()=>{
    test('Berhasil mengupdate data entitas utama berdasarkan id', async()=>{
        const transportation = {
            "name" : "Suzuki GTR I",
            "description" : "Mobil tercepat di nganjuk",
            "imgUrl" : "https://example.com/hotel-a.jpg",
            "location" : "nganjuk",
            "price" : 2500000
        }
        let {status,body} = await request(app)
        .put("/transportation/edit/1")
        .set('authorization', `Bearer ${token}`)
        .send(transportation)
        

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        // console.log(body, "ini boddy <<<<<<");
        expect(body).toHaveProperty("name",expect.any(String))
        expect(body).toHaveProperty("description", expect.any(String))
        expect(body).toHaveProperty("imgUrl",expect.any(String))
        expect(body).toHaveProperty("location", expect.any(String))
        expect(body).toHaveProperty("price", expect.any(Number))


    })

    test('Gagal menjalankan fitur karena belum login', async()=>{
        let {status,body} = await request(app)
        .put("/transportation/edit/1")
        
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'Token is Empty' )
    })

    test('Gagal menjalankan fitur karena token tidak valid', async()=>{
        let {status,body} = await request(app)
        .put("/transportation/edit/1")
        .set('authorization', `Bearer ${invalidToken}`)
        
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'Invalid Token' )
    })

    test('Gagal karena id entity yang diberikan tidak terdapat di database', async()=>{
        let {status,body} = await request(app)
        .put("/transportation/edit/1000")
        .set('authorization', `Bearer ${token}`)
        
        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        // console.log(body, "<<<<");
        expect(body).toHaveProperty("message", 'data not found' )
        
    })

    test('Gagal menjalankan fitur ketika staff mengolah data entity yang bukan miliknya', async()=>{
        const transportation = {
            "name" : "Suzuki GTR IXXX",
            "description" : "Mobil tercepat di jogja",
            "imgUrl" : "https://example.com/hotel-a.jpg",
            "location" : "jogja",
            "price" : 999999,
        }
        let {status,body} = await request(app)
        .put("/transportation/edit/2")
        .set('authorization', `Bearer ${tokenUser}`)
        .send(transportation)
    
        expect(status).toBe(403)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Forbidden Access")
    })

    test('Gagal ketika request body yang diberikan tidak sesuai', async()=>{
        const transportation = {
            "name" : "",
            "description" : "Mobil tercepat di jogja",
            "imgUrl" : "https://example.com/hotel-a.jpg",
            "location" : "jogja",
            "price" : 999999,
        }
        let {status,body} = await request(app)
        .put("/transportation/edit/2")
        .set('authorization', `Bearer ${token}`)
        .send(transportation)

        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", `Name is not Empty`)
      
      
    })
})

describe("DELETE /transportation/:id", ()=>{
    test('Berhasil menghapus data entitas utama berdasarkan params id', async()=>{
        let {status,body} = await request(app)
        .delete("/transportation/1")
        .set('authorization', `Bearer ${token}`)
        

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", `Id with 1 success delete`)
        // console.log(body, "<<<<<<<<<<");
    })

    test('Gagal menjalankan fitur karena belum login', async()=>{
        let {status,body} = await request(app)
        .delete("/transportation/1")
     
        

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", `Token is Empty`)
        // console.log(body, "<<<<<<<<<<");
    })

    test('Gagal menjalankan fitur karena token tidak valid', async()=>{
        let {status,body} = await request(app)
        .delete("/transportation/1")
        .set('authorization', `Bearer ${invalidToken}`)
     
        

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", `Invalid Token`)
        // console.log(body, "<<<<<<<<<<");
    })

    test('Gagal karena id entity yang dikirim tidak terdapat didatabase', async()=>{
        let {status,body} = await request(app)
        .delete("/transportation/1000")
        .set('authorization', `Bearer ${token}`)
     
        

        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", `data not found`)
        // console.log(body, "<<<<<<<<<<");
    })

    test('Gagal menjalankan fitur karena staff', async()=>{
        const transportation = {
            "name": "Hotel ABCD",
            "facility": "Kolam renang, spa, restoran,Billiard",
            "roomCapacity": 1000,
            "imgUrl": "https://example.com/hotel-a.jpg",
            "location": "Kota X",
            "price": 1500000,
            "typeId": 1,
            "authorId": 1
        }
        await request(app)
        .post("/transportation")
        .set('authorization', `Bearer ${token}`)
        .send(transportation)


        let {status,body} = await request(app)
        .delete("/transportation/2")
        .set('authorization', `Bearer ${tokenUser}`)
        

    
        expect(status).toBe(403)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", `Forbidden Access`)
        // console.log(body, "<<<<<<<<<<");
    })
})