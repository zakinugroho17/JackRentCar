# Transportation API Documentation

## Endpoints :

List of available endpoints:

**User**

- `POST /register`
- `POST /login`

**Transportation**

- `POST /transportation`
- `GET /transportation`
- `GET /transportation/:id`
- `PUT /transportation/edit/:id`
- `DELETE /transportation/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "user2@xample.com",
  "password": "password21"
}
```

_Response (201 - Created)_

```json
{
  "id": 19,
  "email": "user2@xample.com"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "email is not NULL"
}
OR
{
    "message": "Format email INVALID"
}
OR
{
    "message": "email is EXIST"
}
OR
{
    "message": "Password is not NULL"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "user2@xample.com",
  "password": "password21"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiJVc2VyIiwicGhvbmVOdW1iZXIiOm51bGwsImlhdCI6MTcwMDczNzk1Nn0.EmNfXiz5_UPuGN0kbavVNzeSM1nT6T0W8r4WWkSTDwA",
  "email": "user2@xample.com",
  "role": "User"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is not empty"
}
OR
{
    "message": "Password is not empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Password is not empty"
}
```

&nbsp;

## 3. POST /transportation

Description:

- create transportation

Request:

- headers:

```json
{
  "Authorization": "Bearer string"
}
```

- body:

```json
{
  "name": "Suzuki GTR",
  "description": "Mobil tercepat di nganjuk",
  "imgUrl": "https://example.com/hotel-a.jpg",
  "location": "nganjuk",
  "price": 2500000
}
```

_Response (201 - OK)_

```json
{
  {
    "id": 23,
    "name": "Suzuki GTR",
    "description": "Mobil tercepat di nganjuk",
    "imgUrl": "https://example.com/hotel-a.jpg",
    "location": "nganjuk",
    "price": 2500000,
    "authorId": 1,
    "updatedAt": "2023-11-23T11:19:28.353Z",
    "createdAt": "2023-11-23T11:19:28.353Z",
    "status": null,
    "typeId": null
}
}
```

_Response (400 - BodyName)_

```json
{
    "message": "Name is not NULL"
}
```

_Response (400 - BodyDescription)_

```json
{
    "message": "Description is not NULL"
}
```

_Response (400 - BodyImgUrl)_

```json
{
    "message": "Image is not NULL"
}
```


_Response (400 - Bodylocation)_

```json
{
  "message": "Location is not NULL"
}
```

_Response (400 - BodyPrice)_

```json
{
  "message": "Price is not NULL"
}
```


&nbsp;

## 4. GET /Transportation

Description:

- show all transportation from database

Request:

- headers:

```json
{
  "Authorization": "Bearer string"
}
```

_Response (200 - OK)_

```json
{
    "count": 20,
    "rows": [
        {
            "id": 13,
            "name": "Porsche Cayenne",
            "description": "SUV performa tinggi dengan gaya dan kekuatan yang mengesankan.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6VXqKLJG0TknJFE9b6DpbmiPq4nVps_ciGQ&usqp=CAU",
            "location": "City M",
            "price": 25000000,
            "status": null,
            "typeId": 2,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T06:12:58.309Z"
        },
        {
            "id": 14,
            "name": "Lexus RX",
            "description": "SUV mewah dengan kualitas material premium dan fitur canggih.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkMPtU9wuoC7M2A5LGzbaG2ScyJGtgFDmHuA&usqp=CAU",
            "location": "City N",
            "price": 22000000,
            "status": null,
            "typeId": 2,
            "authorId": 2,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T06:12:58.309Z"
        },
        {
            "id": 15,
            "name": "Mazda CX-5",
            "description": "SUV sporty dengan kinerja yang menyenangkan dan kenyamanan yang baik.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_SKv4pgK5a2qoKJV0c8YHPN8L1zCTDX22AQ&usqp=CAU",
            "location": "City O",
            "price": 11000000,
            "status": null,
            "typeId": 2,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T06:12:58.309Z"
        },
        {
            "id": 18,
            "name": "Jaguar F-Pace",
            "description": "SUV premium dengan gaya yang elegan dan performa yang hebat.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf9jcAc9xya4p3zF-bJ6kqDBmHSTNhm0yF9w&usqp=CAU",
            "location": "City R",
            "price": 230,
            "status": null,
            "typeId": 2,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T06:12:58.309Z"
        },
        {
            "id": 20,
            "name": "Tesla Model S",
            "description": "Sedan listrik dengan kinerja luar biasa dan teknologi terkini.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyc51b6ucvSp_g_5Nfk4whbz7bL8w3GQboJA&usqp=CAU",
            "location": "City T",
            "price": 30000000,
            "status": null,
            "typeId": 1,
            "authorId": 2,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T06:12:58.309Z"
        },
        {
            "id": 6,
            "name": "Tesla Model 3",
            "description": "Mobil listrik dengan desain futuristik dan kinerja luar biasa.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThiGz8PU7DM4VLuNl2TaUkKGD5fIGNEYuwnQ&usqp=CAU",
            "location": "City F",
            "price": 15000000,
            "status": "Rent Successfully Booked",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-17T01:17:23.854Z"
        },
        {
            "id": 5,
            "name": "Chevrolet Malibo",
            "description": "Sedan mewah dengan teknologi canggih dan kenyamanan tinggi.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQho1LDNVrKH-WnAgOFf79lUtKAnsg9KvfhUg&usqp=CAU",
            "location": "City E",
            "price": 850000,
            "status": "Ready",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-17T01:18:40.270Z"
        },
        {
            "id": 16,
            "name": "Subaru Outback",
            "description": "Wagon yang andal dengan kemampuan off-road yang baik.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPM8fubAd04vBHSw8i0Lc2Nxi4hpV7EFWz8w&usqp=CAU",
            "location": "City P",
            "price": 12000000,
            "status": "rent",
            "typeId": 2,
            "authorId": 2,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T14:56:47.484Z"
        },
        {
            "id": 17,
            "name": "Infiniti Q50",
            "description": "Sedan mewah dengan kabin yang elegan dan performa yang mengesankan.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd87ICEo441EEcDaPZbdaIakTaNBiqxnLdNA&usqp=CAU",
            "location": "City Q",
            "price": 16000000,
            "status": "rent",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T15:01:21.552Z"
        },
        {
            "id": 3,
            "name": "Nissan Altima",
            "description": "Sedan sporty dengan desain modern dan efisiensi bahan bakar yang tinggi.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc8F4Dm9CmeEpU2rDv8qAimolctp2OJ3u8sw&usqp=CAU",
            "location": "City C",
            "price": 9000000,
            "status": "rent",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T17:16:26.137Z"
        },
        {
            "id": 2,
            "name": "Honda CR-V",
            "description": "SUV multifungsi dengan ruang kabin yang luas dan desain yang tangguh.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe5dUJ4Mp2-7P77mEVOgHaKwgr2G6M91TDQw&usqp=CAU",
            "location": "City B",
            "price": 10000000,
            "status": "Rent Successfully Booked",
            "typeId": 2,
            "authorId": 2,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T17:53:52.692Z"
        },
        {
            "id": 7,
            "name": "BMW X5",
            "description": "SUV mewah dengan kenyamanan premium dan teknologi mutakhir.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHWLfXC8ia6ctDPnKar-bKUgO1hz6aILG_Yg&usqp=CAU",
            "location": "City G",
            "price": 18000000,
            "status": "Rent Successfully Booked",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-16T19:31:58.745Z"
        },
        {
            "id": 8,
            "name": "Audi A4",
            "description": "Sedan premium dengan performa luar biasa dan desain yang elegan.",
            "imgUrl": "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/audi-a4-rt-2015-0024_0.jpg?itok=7cJ1PI3F",
            "location": "City H",
            "price": 13000000,
            "status": "Rent Successfully Booked",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-17T06:02:05.191Z"
        },
        {
            "id": 11,
            "name": "Volvo XC60",
            "description": "SUV premium dengan kombinasi yang luar biasa antara gaya dan kenyamanan.",
            "imgUrl": "https://placekitten.com/g/200/300",
            "location": "City K",
            "price": 17000000,
            "status": "Ready",
            "typeId": 2,
            "authorId": 2,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-17T07:45:39.643Z"
        },
        {
            "id": 21,
            "name": "Mobil GG",
            "description": "tes123",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf9jcAc9xya4p3zF-bJ6kqDBmHSTNhm0yF9w&usqp=CAU",
            "location": "Jakarta",
            "price": 1222222,
            "status": null,
            "typeId": null,
            "authorId": 1,
            "createdAt": "2023-11-17T06:05:41.857Z",
            "updatedAt": "2023-11-17T06:05:41.857Z"
        },
        {
            "id": 19,
            "name": "Land Rover Discovery",
            "description": "SUV premium dengan kemampuan off-road yang luar biasa.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqoMPDtG2Hw21efo3LQr50u219EA7y0qG_3hnmPT-_RDMeyPpuZYugGD4VOLdiCuqy1Q&usqp=CAU",
            "location": "City S",
            "price": 27000000,
            "status": "Rent Successfully Booked",
            "typeId": 2,
            "authorId": 2,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-17T06:16:29.126Z"
        },
        {
            "id": 12,
            "name": "Kia Forte",
            "description": "Sedan hemat bahan bakar dengan desain yang menarik.",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0nBpQCbT2j3lotj-OgKC74Qd1_0YlB8kpTA&usqp=CAU",
            "location": "City L",
            "price": 7500000,
            "status": "Rent Successfully Booked",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-17T07:43:47.729Z"
        },
        {
            "id": 4,
            "name": "Suzuki GTR I",
            "description": "Mobil tercepat di nganjuk",
            "imgUrl": "https://example.com/hotel-a.jpg",
            "location": "nganjuk",
            "price": 2500000,
            "status": "rent",
            "typeId": 2,
            "authorId": 2,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-23T10:09:04.848Z"
        },
        {
            "id": 1,
            "name": "Suzuki GTR IXXX",
            "description": "Mobil tercepat di nganjuk",
            "imgUrl": "https://example.com/hotel-a.jpg",
            "location": "nganjuk",
            "price": 2500000,
            "status": "rent",
            "typeId": 1,
            "authorId": 1,
            "createdAt": "2023-11-16T06:12:58.309Z",
            "updatedAt": "2023-11-23T10:26:55.254Z"
        },
        {
            "id": 23,
            "name": "Suzuki GTR",
            "description": "Mobil tercepat di nganjuk",
            "imgUrl": "https://example.com/hotel-a.jpg",
            "location": "nganjuk",
            "price": 2500000,
            "status": null,
            "typeId": null,
            "authorId": 1,
            "createdAt": "2023-11-23T11:19:28.353Z",
            "updatedAt": "2023-11-23T11:19:28.353Z"
        }
    ]
}
```

&nbsp;

## 5. GET /transportation/:id

Description:

- show transportation by id from database

Request:

- headers:

```json
{
  "Authorization": "Bearer string"
}
```

- params: `id (required)`

_Response (200 - OK)_

```json
{
    "data": {
        "id": 1,
        "name": "Suzuki GTR IXXX",
        "description": "Mobil tercepat di nganjuk",
        "imgUrl": "https://example.com/hotel-a.jpg",
        "location": "nganjuk",
        "price": 2500000,
        "status": "rent",
        "typeId": 1,
        "authorId": 1,
        "createdAt": "2023-11-16T06:12:58.309Z",
        "updatedAt": "2023-11-23T10:26:55.254Z"
    }
}
```

_Response (404 - NotFound)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 6. PUT /transportation/edit/:id

Description:

- Update transportation by id from database

Request:

- params: `id (required)`

- headers:

```json
{
  "Authorization": "Bearer string"
}
```

- body:

```json
{
    "name": "Suzuki GTR IXXX",
    "description": "Mobil tercepat di nganjuk",
    "imgUrl": "https://example.com/hotel-a.jpg",
    "location": "nganjuk",
    "price": 2500000
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Suzuki GTR IXXX",
    "description": "Mobil tercepat di nganjuk",
    "imgUrl": "https://example.com/hotel-a.jpg",
    "location": "nganjuk",
    "price": 2500000,
    "status": "rent",
    "typeId": 1,
    "authorId": 1,
    "createdAt": "2023-11-16T06:12:58.309Z",
    "updatedAt": "2023-11-23T11:27:24.045Z"
}
```

_Response (400 - BodyName)_

```json
{
    "message": "Name is not Empty"
}
```

_Response (400 - BodyDescription)_

```json
{
   "message": "Description is not Empty"
}
```

_Response (400 - BodyimgUrl)_

```json
{
  "message": "imgUrl is not Empty"
}
```

_Response (400 - Bodylocation)_

```json
{
  "message": "Location is not Empty"
}
```

_Response (400 - BodyPrice)_

```json
{
   "message": "Price is not Empty"
}
```

_Response (404 - NotFound)_

```json
{
  "message": "data not found"
}
```

&nbsp;


## 7. DELETE /transportation/:id

Description:

- Delete transportation by id

Request:

- params: `id (required)`

- headers:

```json
{
  "Authorization": "Bearer string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Id with 1 success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
``
```
