const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});