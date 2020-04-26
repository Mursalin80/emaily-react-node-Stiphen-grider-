const loginUser = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");
const KEY = require("../config/keys");
const Mailgun = require("mailgun-js");

const mg = new Mailgun({
  apiKey: KEY.MAILGUN_API_KEY,
  domain: KEY.MAILGUN_DOMAIN,
});

module.exports = (app) => {
  app.post("/api/survey", loginUser, requireCredit, (req, res) => {
    const { title, body, subject, recipients } = req.body;
    let recipient = recipients.split(",").map((email) => ({ email }));
    console.log(recipients);
    let data = {
      from: "me@samples.mailgun.org",
      to: recipients,
      subject: subject,
      text: body,
    };

    mg.messages().send(data, function (error, resBody) {
      console.log("mail gun Body:", resBody);
      if (error) {
        console.log(`mailgun error ${error}`);
      } else {
        new Survey({
          title,
          body,
          subject,
          recipients: recipient,
          _user: req.user.id,
          dateSend: Date.now(),
        })
          .save()
          .then((res) => {
            console.log(`mongoose save ${res}`);
          })
          .catch((e) => console.log(e));
      }
    });
  });
};
