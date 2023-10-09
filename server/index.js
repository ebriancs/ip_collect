require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const ipRoutes = require("./routes/ipRoute");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

connectDb();

app.use("/ip", ipRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
