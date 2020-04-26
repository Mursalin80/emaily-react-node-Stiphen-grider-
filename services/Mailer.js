const sgMail = require("@sendgrid/mail");
const key = require("../config/keys");
const helper = sgMail.MailService;

class Mailer extends helper {}

module.exports = Mailer;
