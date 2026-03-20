const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect("mongodb://127.0.0.1:27017/testDb")
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => console.error(err));
