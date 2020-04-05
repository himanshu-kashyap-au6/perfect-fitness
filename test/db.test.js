process.env.NODE_ENV = 'test'
const db = require('../db')
const request = require('supertest')
const app = require('../app')
let token = null
let resetToken = null
let confirmToken = null
let tToken = null

describe('DataBseRelatedTests', function(){
    beforeAll(function(done){
        db.connect().then(function(res){
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post('/user/register').send({
            "name": "Himanshu",
            "email": "hkashyap488@gmail.com",
            "password": "1234",
            "confirmToken": "123456789",
            "isConfirm": true
        }).then((res)=>{
            expect(res.body.statusCode).toBe(201)
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post('/forgot-password').send({
                "email": "hkashyap488@gmail.com"
        }).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post('/login').send({
            "email": "hkashyap488@gmail.com",
            "password": "1234",
        }).then((res)=>{
            token = res.body.accessToken
            resetToken = res.body.commenUser.resetToken
            confirmToken = res.body.commenUser.confirmToken
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post('/user/crteate-password').set({ Authorization: token }).send({
                "email": "hkashyap488@gmail.com",
                "newPassword": "4321",
                "confirmPassword": "4321"
        }).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post(`/reset/${resetToken}`).send({
            "newPassword": "1122",
            "confirmPassword": "1122"
        }).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/confirm/${confirmToken}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of DELETE/', function(done){
        request(app).delete('/logout').set({ Authorization: token }).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })


    test('should get a response of POST/', function(done){
        request(app).post('/admin/register').send({
            "name": "Himanshu",
            "email": "adminhk@pf.com",
            "perEmail": "hkashyap488@gmail.com",
            "password": "1234",
        }).then((res)=>{
            expect(res.body.statusCode).toBe(201)
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post('/login').send({
            "email": "adminhk@pf.com",
            "password": "1234",
        }).then((res)=>{
            token = res.body.accessToken
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/admin/profile').set({ Authorization: token }).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/get/cart').set({ Authorization: token }).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/alldiet').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/diet/veg').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/diet/non-veg').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/diet/kitto').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })
    // Speial One As no gym is present in Test DataBase
    test('should get a response of GET/', function(done){
        request(app).get(`/findgym/${'Mumbai'}`).then((res)=>{
            expect(res.body.statusCode).toBe(401)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/findgym/country/${'India'}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/findgym/state/${'Maharahstra'}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/findgym/city/${'Panipat'}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    // Speial One As no Membership is present in Test DataBase
    test('should get a response of GET/', function(done){
        request(app).get(`/findMS/${'Mumbai'}`).then((res)=>{
            expect(res.body.statusCode).toBe(401)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/findMS/country/${'India'}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/findMS/state/${'Maharahstra'}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/findMS/city/${'Panipat'}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/searchproduct?${'product'}=${'protein'}&${'page'}=${1}&${'size'}=${10}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/all/product?${'page'}=${1}&${'size'}=${10}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/product/suppliments').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/product/gymwears').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/product/gymgears').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/allTrainer').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/allworkout').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/workout/begineer').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/workout/intermediate').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get('/workout/professional').then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post('/add/trainer').set({ Authorization: token }).send({
            "name": "Himanshu",
            "email": "hk@pf.com",
            "perEmail": "hkashyap488@gmail.com",
            "password": "1234",
            "price": 4000,
            "isConfirm": true
        }).then((res)=>{
            expect(res.body.statusCode).toBe(201)
            done()
        })
    })

    test('should get a response of POST/', function(done){
        request(app).post('/login').send({
            "email": "hk@pf.com",
            "password": "1234",
        }).then((res)=>{
            token = res.body.accessToken
            tToken = res.body.commenUser.confirmToken
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    test('should get a response of GET/', function(done){
        request(app).get(`/trainer/confirm/${tToken}`).then((res)=>{
            expect(res.body.statusCode).toBe(200)
            done()
        })
    })

    afterAll(function(done){
        db.disconnect().then(function(){
            done()
        })
    })
})