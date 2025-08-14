import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Use middlewares
app.use(cors());
app.use(express.json());

// Import the new router
import analyticsRoutes from "./routes/analytics.js";
// Tell Express to use the new router for any URL starting with "/api/analytics"
app.use("/api/analytics", analyticsRoutes);
// Get variables from .env file
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and start the server
app.get("/", (req, res) => {
  res.send("Hello from AnnexAI Server!");
});

// ### ADD THIS NEW CODE BLOCK ###
// A test API endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working correctly!",
    status: "success",
  });
});
// #############################

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)

  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error.message);
  });