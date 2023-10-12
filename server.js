const express = require("express");
require("dotenv").config({ path: ".env" });
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 8000;
const Router = require("./router");
const db = require("./models/index");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Main Router
app.use("/api/v1", Router);

// Database Connection
db.sequelize
  .sync({ logging: console.log })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

router.get("/", (req, res) => {
  res.json("Welcome to Warehousity!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
