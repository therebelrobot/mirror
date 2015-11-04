<<<<<<< HEAD
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
=======
var bcrypt = require('bcrypt-nodejs')
var crypto = require('crypto')
var mongoose = require('mongoose')
>>>>>>> upstream/master

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
<<<<<<< HEAD
  github: String,
  githubUsername: String,
=======

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
>>>>>>> upstream/master
  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

<<<<<<< HEAD
  mirrors: Array,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});
=======
  resetPasswordToken: String,
  resetPasswordExpires: Date
})
>>>>>>> upstream/master

/**
 * Password hash middleware.
 */
<<<<<<< HEAD
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
=======
userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})
>>>>>>> upstream/master

/**
 * Helper method for validating user's password.
 */
<<<<<<< HEAD
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
=======
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}
>>>>>>> upstream/master

/**
 * Helper method for getting user's gravatar.
 */
<<<<<<< HEAD
userSchema.methods.gravatar = function(size) {
  if (!size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('User', userSchema);
=======
userSchema.methods.gravatar = function (size) {
  if (!size) size = 200
  if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro'
  var md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro'
}

module.exports = mongoose.model('User', userSchema)
>>>>>>> upstream/master
