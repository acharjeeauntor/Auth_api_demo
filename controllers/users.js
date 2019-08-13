const User = require("../models/User");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
const bcrypt = require('bcryptjs');

signToken = (user) => {
  return JWT.sign(
    {
      iss: "apiToken",
      sub: user.id,
      iat: new Date().setTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};

exports.signUp = (req, res, next) => {
  const { email, password } = req.value.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        return res.status(403).json({ error: "email already used" });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          User.create({ email, password:hashedPassword })
            .then((user) => {
              const token = signToken(user);
              return res.json({ token });
            })
            .catch((err) => console.log(err));
        })
        .catch(error => {
          console.log(error)
        });
    })
    .catch((err) => console.log(err));
};

exports.signIn = (req, res, next) => {
 const token = signToken(req.user)
 return res.json({ token });
};

exports.secret = (req, res, next) => {
  return res.json({ secret: "resources" });
};
