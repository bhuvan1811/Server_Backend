const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect("mongodb+srv://bhuvansharma1811:LP76NQoUzHLxVEiz@cluster0.xeshggt.mongodb.net/?appName=Cluster0")
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => console.error(err));
