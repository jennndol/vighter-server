process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let User = require('../models/User')
require('dotenv').config()

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../MockServer')
let should = chai.should()
const bcrypt = require('bcrypt');

chai.use(chaiHttp)

describe('Users', () => {

  beforeEach((done) => {
    User.remove({}, (err) => {
      done()
    })
  })

  describe('/Login success login ', () => {
    it('should have status 200', (done) => {
      let login = new User({ name: 'user', email: 'user@mail.com' })
      let user = {
        email: 'user@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            done()
          })
      })
    })
    it('res.body should be an object', (done) => {
      let login = new User({ name: 'user', email: 'user@mail.com' })
      let user = {
        email: 'user@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.body.should.be.a('object')
            done()
          })
      })
    })
    it('res.body should have property message equal to \'success\' ', (done) => {
      let login = new User({ name: 'user', email: 'user@mail.com' })
      let user = {
        email: 'user@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            done()
          })
      })
    })
  })


  describe('/Login should fail because name field empty', () => {
    it('should have status 400', (done) => {
      let login = new User({ email: 'user2@mail.com' })
      chai.request(server)
        .post('/auth')
        .send(login)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
    it('res.body should be an object', (done) => {
      let login = new User({ email: 'user2@mail.com' })
      chai.request(server)
        .post('/auth')
        .send(login)
        .end((err, res) => {
          res.body.should.be.a('object')
          done()
        })
    })
    it('res.body should have property message equal to \'bad request\' ', (done) => {
      let login = new User({ email: 'user2@mail.com' })
      chai.request(server)
        .post('/auth')
        .send(login)
        .end((err, res) => {
          res.body.should.have.property('message').eql('bad request')
          done()
        })
    })
  })

  describe('/Login should fail because email field empty',()=>{
    it('should have status 400',(done)=>{
      let login = new User({name:'username'})
      chai.request(server)
      .post('/auth')
      .send(login)
      .end((err,res)=>{
        res.should.have.status(400)
        done()
      })
    })
    it('res.body should be an object', (done) => {
      let login = new User({ email: 'user2@mail.com' })
      chai.request(server)
        .post('/auth')
        .send(login)
        .end((err, res) => {
          res.body.should.be.a('object')
          done()
        })
    })
    it('res.body should have property message equal to \'bad request\' ', (done) => {
      let login = new User({ email: 'user2@mail.com' })
      chai.request(server)
        .post('/auth')
        .send(login)
        .end((err, res) => {
          res.body.should.have.property('message').eql('bad request')
          done()
        })
    })
  })


  describe('/Login should create new user',()=>{
    it('should have status 200',(done)=>{
      let user = {
        name:'newUser',
        email:'new@mail.com'
      }
      chai.request(server)
      .post('/auth')
      .send(user)
      .end((err,res)=>{
        res.should.have.status(200)
        done()
      })
    })
    it('res.body should be an object', (done) => {
      let user = {
        name:'newUser',
        email:'new@mail.com'
      }
      chai.request(server)
      .post('/auth')
      .send(user)
      .end((err, res) => {
        res.body.should.be.a('object')
        done()
      })
    })
    it('res.body should have property message equal to \'successfully created\' ', (done) => {
      let user = {
        name:'newUser',
        email:'new@mail.com'
      }
      chai.request(server)
      .post('/auth')
      .send(user)
      .end((err, res) => {
        res.body.should.have.property('message').eql('successfully created')
          done()
        })
    })
  })

})