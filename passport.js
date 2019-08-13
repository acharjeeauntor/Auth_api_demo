const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./config/index");
const bcrypt = require('bcryptjs')
const User = require("./models/User");
const Sequelize = require("sequelize");

//json web token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    (payload, done) => {
      User.findByPk(payload.sub)
        .then((user) => {
          //console.log(user)
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((error) => {
          done(error, false);
        });
    }
  )
);

// Local Strategy
passport.use(new LocalStrategy({
     usernameField:'email'
},(email,password,done) => {
          User.findOne({ where: { email } })
               .then(user => {
                    if (!user) {
                         return done(null,false)
                    }
                   bcrypt.compare(password,user.password)
                   .then(isMatch=>{
                     if(!isMatch){
                       return done(null,false)
                     }
                     return done(null,user)
                   })
                   .catch()
               })
               .catch(error => {
               done(error,false)
          })
}))