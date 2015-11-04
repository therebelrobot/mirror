<<<<<<< HEAD
var secrets = require('../config/secrets');
var nodemailer = require("nodemailer");
=======
var secrets = require('../config/secrets')
var nodemailer = require('nodemailer')
>>>>>>> upstream/master
var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: secrets.sendgrid.user,
    pass: secrets.sendgrid.password
  }
<<<<<<< HEAD
});
=======
})
>>>>>>> upstream/master

/**
 * GET /contact
 * Contact form page.
 */
<<<<<<< HEAD
exports.getContact = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};
=======
exports.getContact = function (req, res) {
  res.render('contact', {
    title: 'Contact'
  })
}
>>>>>>> upstream/master

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
<<<<<<< HEAD
exports.postContact = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'your@email.com';
  var subject = 'Contact Form | Hackathon Starter';
=======
exports.postContact = function (req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('message', 'Message cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/contact')
  }

  var from = req.body.email
  // var name = req.body.name
  var body = req.body.message
  var to = 'your@email.com'
  var subject = 'Contact Form | Hackathon Starter'
>>>>>>> upstream/master

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
<<<<<<< HEAD
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};
=======
  }

  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      req.flash('errors', { msg: err.message })
      return res.redirect('/contact')
    }
    req.flash('success', { msg: 'Email has been sent successfully!' })
    res.redirect('/contact')
  })
}
>>>>>>> upstream/master
