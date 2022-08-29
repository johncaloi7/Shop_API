require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");

const notFoundMiddleware = require("./middleware/not-found.js");
const errorMiddleware = require("./middleware/error-handler.js");

const productsRouter = require("./routes/products.js");

// middleware
app.use(express.json());

//  routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>');
});

app.use("/api/v1/products", productsRouter);

// error and not found middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running on port ${port}`));
  } catch (error) {}
};

start();
