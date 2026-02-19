const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-type", "Authorization"]
}));
app.use(express.json());

// Import booking routes
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");


// Use booking routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Nature Heaven Backend Running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err.message));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
