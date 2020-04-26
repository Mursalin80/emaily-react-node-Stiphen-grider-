const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const User = mongoose.model("users");

// cooke set from user model
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// offload cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//load google strategy and succes callback
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google_ClientID,
      clientSecret: keys.google_ClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((hasUser) => {
        if (hasUser) {
          done(null, hasUser);
        } else {
          new User({ googleId: profile.id }).save().then((newUser) => {
            done(null, newUser);
          });
        }
      });
    }
  )
);
