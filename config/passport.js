const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./index');

module.exports = {
  init: function () {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      secretOrKey: config.secrets.jwt,
      issuer: config.jwt.issuer,
      audience: config.jwt.audience
    };


    passport.use(new JwtStrategy(options, (jwtPayload, done) => {
      var user = {
        email: jwtPayload.email
      };
      return done(null, user);
    }));
  }
};