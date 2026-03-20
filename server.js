const mongoose = require("mongoose");
const app = require("./app");

console.log("App starting...");
console.log("Connecting to DB...");

mongoose
  .connect("mongodb+srv://bhuvansharma1811:LP76NQoUzHLxVEiz@cluster0.xeshggt.mongodb.net/testDbs", {
    serverSelectionTimeoutMS: 5000 // 👈 VERY IMPORTANT
  })
  .then(() => {
    console.log("✅ Database connected");
    app.listen(3000, "0.0.0.0", () => {
      console.log("🚀 Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("❌ DB ERROR:", err);
  });


  