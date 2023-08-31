const mongoose = require("mongoose");

try {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
} catch (error) {
  console.error("Error outside of the connection:", error);
}
