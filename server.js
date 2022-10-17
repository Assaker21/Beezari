if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const compression = require("compression");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const Admin = require("./models/admin");
const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (username) => {
    return await Admin.find({ username: username });
  },
  async (id) => {
    return await Admin.findById(id);
  }
);

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const featuredProductsRouter = require("./routes/featuredProducts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(compression());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // Session expires after 1 hour of inactivity.
      expires: 3600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connection to database
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://tester:pass@beezari-cluster.4evggsw.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dbName: "BeezariDB",
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connection established"));

// Router Usage Declaration
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/featured-products", featuredProductsRouter);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.listen(process.env.PORT || 3000);
