const jwtStrategy = require('passport-jwt').Strategy,
      jwtExtract = require('passport-jwt').ExtractJwt,
      config = require('./db.config');
let User = require('../models/user.model');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = jwtExtract.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, (jwt_payload, done)=>{
        User.findOne({_id: jwt_payload._id}, (err, user)=>{
            if(err)
                return done(err, false);
            if(!user)
                return done(null, false, {mess: "no user", jwt: jwt_payload});
            return done(null, user);
        });
    }));
};
