const key = require("../config/keys");
const stripe = require("stripe")(key.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 email credits",
      source: req.body.id,
    });
    console.log("charge stripe object : ", charge);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
