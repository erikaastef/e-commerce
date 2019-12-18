const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/db");
const routes = require("./routes");
const session = require("express-session"); // req.session || https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm
const cookieParser = require("cookie-parser"); // req.cookies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Product, Comment, User, Order, OrderItem } = require("./models");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
// serialize: how we save the user and stored in session object by express-session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize: how we look for the user
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(user => done(null, user));
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // input name for username
      passwordField: "password" // input name for password
    },
    function (inputEmail, inputPassword, done) {
      User.findOne({ where: { email: inputEmail } }) // searching for the User
        .then(user => {
          console.log(user);
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(inputPassword)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user); // the user is authenticated ok!! pass user to the next middleware in req object (req.user)
        })
        .catch(done); // this is returning done(error)
    }
  )
);

app.use("/api", routes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch(error => {
    console.log(error);
  });

module.exports = { passport };
