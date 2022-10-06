if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require('path');

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const loginRouter = require("./routes/login");
const productsRouter = require("./routes/products");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

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
app.use("/authors", authorRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);

app.listen(process.env.PORT || 3000);
