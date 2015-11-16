var _ = require('lodash')
var User = require('../models/User')
var mirror = require('mirror').fork
var request = require('request')
var _ = require('lodash')

exports.postMirror = function (req, res, next) {
  req.assert('source', 'Source Repo cannot be blank').notEmpty()
  req.assert('target', 'Target Repo cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/')
  }
  var source = req.body.source
  source = buildRepoObject(source)
  var target = req.body.target
  target = buildRepoObject(target)

  // console.log(req.user)

  // get token
  var token = _.filter(req.user.tokens, {kind: 'github'})[0].accessToken
  console.log(token)
  var mfOpts = {
    username: req.user.githubUsername,
    oauth: token,
    source: source,
    target: target
  }
  if (req.body.create) {
    mfOpts.create = true
  }
  console.log(mfOpts)
  var mirrorRepo = mirror(mfOpts)
  mirrorRepo.then(function (results) {
    // Update User Repos
    User.findById(req.user.id, function (err, user) {
      if (err) {
        req.flash('errors', err)
        return res.redirect('/')
      }
      var current = Math.round((new Date()).getTime() / 1000)
      var mirrorInfo = {
        source: source,
        target: target,
        mirrorDate: current,
        display: true
      }
      user.mirrors.push(mirrorInfo)
      user.save(function (err) {
        if (err) {
          req.flash('errors', err)
          return res.redirect('/')
        }
        req.flash('success', { msg: 'mirror of ' + source.account + '/' + source.repo + ' to ' + target.account + '/' + target.repo + ' was successful.' })
        res.redirect(req.session.returnTo || '/')
      })
    })
  })
  mirrorRepo.catch(function (err) {
    req.flash('errors', { msg: 'There was an issue forking ' + source.account + '/' + source.repo + ' to ' + target.account + '/' + target.repo + ' : ' + err })
    res.redirect(req.session.returnTo || '/')
  })
// // Fork Repo here
// req.flash('success', { msg: 'mirror of '+source+' to '+target+' was successful.' })
// res.redirect(req.session.returnTo || '/')
}

function buildRepoObject (repoString) {
  repoString = repoString.split('/')
  return {
    account: repoString[0],
    repo: repoString[1]
  }
}
