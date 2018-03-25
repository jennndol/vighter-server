process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let Log = require('../models/Log')
let User = require('../models/User')
require('dotenv').config()

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../MockServer')
let should = chai.should()
const bcrypt = require('bcrypt');

chai.use(chaiHttp)

describe('/Logs', () => {

  beforeEach((done) => {
    Log.remove({}, (err) => {
      done()
    })
  })

  describe('/POST Success post a log', () => {
    it('should have status 200', (done) => {
      let login = new User({ name: 'apaja', email: 'apa@mail.com' })
      let user = {
        email: 'apa@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'jab', power: 9999, status: 'good', user: login })
              .end((err, res) => {
                res.should.have.status(200)
                done()
              })
          })
      })
    })
    it('res.body should be an object', (done) => {
      let login = new User({ name: 'apaja', email: 'apa@mail.com' })
      let user = {
        email: 'apa@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'jab', power: 9999, status: 'good', user: login })
              .end((err, res) => {
                res.body.should.be.a('object')
                done()
              })
          })
      })
    })
    it('res.body should have property message equal to \'successfully created\' ', (done) => {
      let login = new User({ name: 'apaja', email: 'apa@mail.com' })
      let user = {
        email: 'apa@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'jab', power: 9999, status: 'good', user: login })
              .end((err, res) => {
                res.body.should.have.property('message').eql('successfully created')
                done()
              })
          })
      })
    })
  })


  describe('/POST should error because type field is empty', () => {
    it('should have status 400', (done) => {
      let login = new User({ name: 'yahaja', email: 'yah@mail.com' })
      let user = {
        email: 'yah@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ power: 888, status: 'perfect', user: login })
              .end((err, res) => {
                res.should.have.status(400)
                done()
              })
          })
      })
    })
    it('res.body should be an object', (done) => {
      let login = new User({ name: 'iyaaja', email: 'iya@mail.com' })
      let user = {
        email: 'iya@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', status: 'perfect', user: login })
              .end((err, res) => {
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('bad request')
                done()
              })
          })
      })
    })
    it('res.body should have property message equal to \'bad request\' ', (done) => {
      let login = new User({ name: 'iyaaja', email: 'iya@mail.com' })
      let user = {
        email: 'iya@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', status: 'perfect', user: login })
              .end((err, res) => {
                res.body.should.have.property('message').eql('bad request')
                done()
              })
          })
      })
    })
  })

  describe('/POST should error because power field is empty', () => {
    it('should have status 400', (done) => {
      let login = new User({ name: 'iyaaja', email: 'iya@mail.com' })
      let user = {
        email: 'iya@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', status: 'perfect', user: login })
              .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('bad request')
                done()
              })
          })
      })
    })
    it('res.body should be an object', (done) => {
      let login = new User({ name: 'iyaaja', email: 'iya@mail.com' })
      let user = {
        email: 'iya@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', status: 'perfect', user: login })
              .end((err, res) => {
                res.body.should.be.a('object')
                done()
              })
          })
      })
    })
    it('res.body should have property message equal to \'bad request\'', (done) => {
      let login = new User({ name: 'iyaaja', email: 'iya@mail.com' })
      let user = {
        email: 'iya@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', status: 'perfect', user: login })
              .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('bad request')
                done()
              })
          })
      })
    })
  })


  describe('/POST should error because status field is empty', () => {
    it('res should have status 400', (done) => {
      let login = new User({ name: 'ahhh', email: 'ahhh@mail.com' })
      let user = {
        email: 'ahhh@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', power: 9999, user: login })
              .end((err, res) => {
                res.should.have.status(400)
                done()
              })
          })
      })
    })
    it('res.body should be an object', (done) => {
      let login = new User({ name: 'ahhh', email: 'ahhh@mail.com' })
      let user = {
        email: 'ahhh@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', power: 9999, user: login })
              .end((err, res) => {
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('bad request')
                done()
              })
          })
      })
    })
    it('res.body should have property message equal to \'bad request\' ', (done) => {
      let login = new User({ name: 'ahhh', email: 'ahhh@mail.com' })
      let user = {
        email: 'ahhh@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .post('/log')
              .set('token', res.body.token)
              .send({ type: 'hook', power: 9999, user: login })
              .end((err, res) => {
                res.body.should.have.property('message').eql('bad request')
                done()
              })
          })
      })
    })
  })


  // describe('/POST should error because user have\'nt login yet', () => {
  //   it('should error', (done) => {
  //     chai.request(server)
  //       .post('/log')
  //       .send({ type: 'jab', power: 9999, status: 'good' })
  //       .end((err, res) => {
  //         res.should.be.a('object')
  //         done()
  //       })
  //   })
  // })


  describe('/GET Success get all data a log', () => {
    it('res should have status 200 and be a object', (done) => {
      let login = new User({ name: 'apaja', email: 'apa@mail.com' })
      let user = {
        email: 'apa@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .get('/log')
              .set('token', res.body.token)
              .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
              })
          })
      })
    })
    it('res.body should have property message equal to \'successfully get data\'', (done) => {
      let login = new User({ name: 'apaja', email: 'apa@mail.com' })
      let user = {
        email: 'apa@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .get('/log')
              .set('token', res.body.token)
              .end((err, res) => {
                res.body.should.have.property('message').eql('successfully get data')
                res.body.should.have.property('payload')
                res.body.payload.should.be.a('array')
                done()
              })
          })
      })
    })
    it('res.body should have property payload', (done) => {
      let login = new User({ name: 'apaja', email: 'apa@mail.com' })
      let user = {
        email: 'apa@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .get('/log')
              .set('token', res.body.token)
              .end((err, res) => {
                res.body.should.have.property('payload')
                res.body.payload.should.be.a('array')
                done()
              })
          })
      })
    })
    it('res.body.paylaod must be an array', (done) => {
      let login = new User({ name: 'apaja', email: 'apa@mail.com' })
      let user = {
        email: 'apa@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            chai.request(server)
              .get('/log')
              .set('token', res.body.token)
              .end((err, res) => {
                res.body.payload.should.be.a('array')
                done()
              })
          })
      })
    })
  })


  describe('/DELETE should delete a log', () => {
    it('res.body must be object', (done) => {
      let login = new User({ name: 'ngapus', email: 'ngapus@mail.com' })
      let user = {
        email: 'ngapus@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            let log = new Log({ type: 'jab', status: 'good', power: 1000, user: login })
            log.save((err, log) => {
              chai.request(server)
                .delete(`/log/${log.id}`)
                .set('token', res.body.token)
                .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  done()
                })
            })
          })
      })
    })
    it('should have property \'ok\' equal to 1', (done) => {
      let login = new User({ name: 'ngapus', email: 'ngapus@mail.com' })
      let user = {
        email: 'ngapus@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            let log = new Log({ type: 'jab', status: 'good', power: 1000, user: login })
            log.save((err, log) => {
              chai.request(server)
                .delete(`/log/${log.id}`)
                .set('token', res.body.token)
                .end((err, res) => {
                  res.body.should.have.property('ok').eql(1)
                  res.body.should.have.property('n').eql(1)
                  done()
                })
            })
          })
      })
    })
    it('should have property \'n\' equal to 1', (done) => {
      let login = new User({ name: 'ngapus', email: 'ngapus@mail.com' })
      let user = {
        email: 'ngapus@mail.com'
      }
      login.save((err, login) => {
        chai.request(server)
          .post('/auth')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('success')
            res.body.should.have.property('token')
            let log = new Log({ type: 'jab', status: 'good', power: 1000, user: login })
            log.save((err, log) => {
              chai.request(server)
                .delete(`/log/${log.id}`)
                .set('token', res.body.token)
                .end((err, res) => {
                  res.body.should.have.property('ok').eql(1)
                  res.body.should.have.property('n').eql(1)
                  done()
                })
            })
          })
      })
    })
  })



})