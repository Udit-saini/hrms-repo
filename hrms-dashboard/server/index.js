const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/candidates", require("./Routes/CandidatesRoutes"));

// console.log("Mongo URI:", process.env.MONGO_URI);
// mongodb+srv://uditsaini8607:<db_password>@hrms.xxqeptw.mongodb.net/
mongoose
  .connect(
    "mongodb+srv://uditsaini8607:<db_password>@hrms.xxqeptw.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
