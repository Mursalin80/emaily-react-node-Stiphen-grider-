const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
require("./models/User");
require("./models/Survey");
require("./services/passport");
const keys = require("./config/keys");

// App const
const PORT = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "client", "build");
const app = express();

// serve public contents

app.use(express.static(publicPath));
app.use(bodyParser.json());
// express cookie setup
app.use(
  cookieSession({
    maxAge: 7 * 60 * 60 * 24 * 1000,
    keys: [keys.cookieKey],
  })
);

// passport use cookie
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mlab_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// routers
require("./routes/authRouters")(app);
require("./routes/billingRouter")(app);
require("./routes/surveyRouter")(app);

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
