var chai = require('chai')
var expect = chai.expect
var User = require('../models/User')

/* Definitions for JS Standard */
/* global describe, it */

describe('User Model', function () {
  it('should create a new user', function (done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    })
    user.save(function (err) {
      if (err) return done(err)
      done()
    })
  })

  it('should not create a user with the unique email', function (done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    })
    user.save(function (err) {
      if (err) expect(err.code).to.equal(11000)
      done()
    })
  })

  it('should find user by email', function (done) {
    User.findOne({ email: 'test@gmail.com' }, function (err, user) {
      if (err) return done(err)
      expect(user.email).to.equal('test@gmail.com')
      done()
    })
  })

  it('should delete a user', function (done) {
    User.remove({ email: 'test@gmail.com' }, function (err) {
      if (err) return done(err)
      done()
    })
  })
})
