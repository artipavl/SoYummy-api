const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const {
  recipeRouter,
  authRouter,
  emailRouter,
  shoppingListRoute,
  favoriteRouter,
} = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app
  .use(logger(formatsLogger))
  .use(cors())
  .use(express.json())

  .use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  .use("/api/recipes", recipeRouter)

  .use("/api/users", authRouter, emailRouter, shoppingListRoute)

  .use("/api/favorites", favoriteRouter)

  .use((req, res) => {
    res.status(404).json({ message: "Not found" });
  })

  .use((err, req, res, next) => {
    const { message = "Internal Server Error", status = 500 } = err;
    res.status(status).json({ message });
  });

module.exports = app;
