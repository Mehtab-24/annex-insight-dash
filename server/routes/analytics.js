import express from "express";
import Analytic from "../models/analytic.js"; // We import our 'blueprint'

const router = express.Router();

// ROUTE 1: A special route to add some sample data to the database
// We will visit this URL once in our browser to create the data.
router.get("/seed", async (req, res) => {
  const sampleData = [
    { postType: 'Image Post', engagement: 85, reach: 5432 },
    { postType: 'Video Post', engagement: 92, reach: 7890 },
    { postType: 'Text Update', engagement: 67, reach: 3210 },
    { postType: 'Story', engagement: 74, reach: 4123 },
  ];
  
  // Clear existing data before adding new samples
  await Analytic.deleteMany({});
  await Analytic.insertMany(sampleData);
  
  res.json({ message: "Sample data has been added successfully!" });
});

// ROUTE 2: The main route to get all analytics data from the database
// This is the endpoint our front-end will eventually call.
router.get("/", async (req, res) => {
  try {
    const analytics = await Analytic.find(); // find() gets all documents
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics data" });
  }
});

export default router;