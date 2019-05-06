require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path')

const app = express();
const port = process.env.PORT || 5000;

// created modules
const db = process.env.mongoURI;
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

// connect to database
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error:", err));
// mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
// require models
require("./models/User");
require("./models/Profile");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
  })
}

app.listen(port, () => console.log(`Server started on port ${port}`));
