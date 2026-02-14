import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

// image routes
app.use("/cortex/api", routes);

// connect db
connectDB();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
