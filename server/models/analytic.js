import mongoose from "mongoose";

// This is the blueprint for our analytics data
const analyticSchema = new mongoose.Schema({
  postType: {
    type: String,
    required: true,
    enum: ['Image Post', 'Video Post', 'Text Update', 'Story'], // Defines allowed values
  },
  engagement: {
    type: Number,
    required: true,
    default: 0,
  },
  reach: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// The 'model' is the tool we use to interact with the collection in the database
const Analytic = mongoose.model("Analytic", analyticSchema);

export default Analytic;