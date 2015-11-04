/**
 * GET /
 * Home page.
 */
<<<<<<< HEAD
var moment = require('moment')
var _ = require('lodash')
exports.index = function(req, res) {
  var mirrors = []
  if (req.user){
    mirrors = _.map(req.user.mirrors, function(mirror){
      mirror.mirrorDate = moment(mirror.mirrorDate, 'X').format('YYYY-MM-DD HH:mm:SSZ')
      return mirror
    })
  }
  res.render('home', {
    title: 'Home',
    mirrors: mirrors
  });
};
=======
exports.index = function (req, res) {
  res.render('home', {
    title: 'Home'
  })
}
>>>>>>> upstream/master
