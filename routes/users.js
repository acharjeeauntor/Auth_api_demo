const express = require("express");
// const router = require("express-promise-router")();
const router = express.Router();
const { validateBody, schemas } = require("../helper/routeHelpers");
const usersController = require("../controllers/users");
const passport = require("passport");
const passportConf = require('../passport')
const passportJwt = passport.authenticate("jwt", { session: false })
const passportLocal = passport.authenticate("local", { session: false }) 

router.post(
  "/signup",
  validateBody(schemas.authSchema),
  usersController.signUp
);
router.post("/signin",validateBody(schemas.authSchema),passportLocal,usersController.signIn);
router.get(
  "/secret",
  passportJwt,
  usersController.secret
);

module.exports = router;
