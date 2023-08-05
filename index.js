// Importing express
const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

const port = 8000;

const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

// Used for session Cookie
const session = require("express-session");

const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

const passportJWT = require("./config/passport-jwt-strategy");

const MongoStore = require("connect-mongodb-session")(session);

const flash = require("connect-flash");

const customMware = require("./config/middleware");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));
// make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayouts);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used the session cookie in the db
app.use(
  session({
    name: "Major Project",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        uri: "mongodb://127.0.0.1:27017/major_development",
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use("/", require("./routes"));

// Listening the server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running the port: ${port}`);
});
