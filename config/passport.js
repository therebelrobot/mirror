var _ = require('lodash')
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy
var GitHubApi = require('github')
var github = new GitHubApi({
  version: '3.0.0',
  headers: {
    'user-agent': 'manualfork-app' // GitHub is happy with a unique user agent
  }
})
var secrets = require('./secrets')
var User = require('../models/User')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

/**
 * Sign in with GitHub.
 */
passport.use(new GitHubStrategy(secrets.github, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ github: profile.id }, function (err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
        done(err)
      } else {
        // Get Github Username
        github.authenticate({ type: 'oauth', token: accessToken })
        console.log(github)
        github.user.get({}, function (err, res) {
          if (err) {
            req.flash('errors', { msg: 'There was an issue fetching your username.' })
            done(err)
          }
          console.log(res)
          User.findById(req.user.id, function (err, user) {
            user.github = profile.id
            user.githubUsername = res.login
            user.tokens.push({ kind: 'github', accessToken: accessToken })
            user.profile.name = user.profile.name || profile.displayName
            user.profile.picture = user.profile.picture || profile._json.avatar_url
            user.profile.location = user.profile.location || profile._json.location
            user.profile.website = user.profile.website || profile._json.blog
            user.save(function (err) {
              req.flash('info', { msg: 'GitHub account has been linked.' })
              done(err, user)
            })
          })
        })
      }
    })
  } else {
    User.findOne({ github: profile.id }, function (err, existingUser) {
      if (existingUser) return done(null, existingUser)
      github.authenticate({ type: 'oauth', token: accessToken })
      console.log(github)
      github.user.get({}, function (err, res) {
        if (err) {
          req.flash('errors', { msg: 'There was an issue fetching your username.' })
          done(err)
        }
        console.log(res)
        User.findOne({ email: profile._json.email }, function (err, existingEmailUser) {
          if (existingEmailUser) {
            req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' })
            done(err)
          } else {
            var user = new User()
            user.email = profile._json.email
            user.github = profile.id
            user.githubUsername = res.login
            user.tokens.push({ kind: 'github', accessToken: accessToken })
            user.profile.name = profile.displayName
            user.profile.picture = profile._json.avatar_url
            user.profile.location = profile._json.location
            user.profile.website = profile._json.blog
            user.save(function (err) {
              done(err, user)
            })
          }
        })
      })
    })
  }
}))

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function (req, res, next) {
  var provider = req.path.split('/').slice(-1)[0]

  if (_.find(req.user.tokens, { kind: provider })) {
    next()
  } else {
    res.redirect('/auth/' + provider)
  }
}
