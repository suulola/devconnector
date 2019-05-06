const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const password = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => res.json({ hello: "users" }));

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      // create new user
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "User doesn't exist" });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // if successful create a token
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          jwt.sign(
            payload,
            process.env.secretOrKey,
            { expiresIn: 3600 }, //change back to 3600 for 1 hour later
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = 'Password Incorrect'
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});

router.get(
  "/current",
  password.authenticate("jwt", { session: false }),
  (req, res) => {
   return res.json(req.user);
  }
);

module.exports = router;
