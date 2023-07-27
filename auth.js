const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID ="225766996753-e3u44asbuqskk1ttle6fm3brsamhga7d.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
   
  }
));

passport.serializeUser(function(user,done){
     done(null,user)
});
passport.deserializeUser(function(user,done){
     done(null,user)
});
