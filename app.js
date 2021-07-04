const express = require("express");

// Database
const db = require("./db/models");

// Routes
const productRoutes = require("./routes/products");
const bakeryRoutes = require("./routes/bakeries");
const userRoutes = require("./routes/users");

//cors
const cors = require("cors");

//path
const path = require("path");

const app = express();
//we put it at the beganing of the code
app.use(cors());

app.use(express.json());

app.use("/products", productRoutes);
app.use("/bakeries", bakeryRoutes);
app.use(userRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  // await db.sequelize.sync();
  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
