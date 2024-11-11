const express = require("express");
const app = express();
const PORT = 3000;
const data = require("./data/data.json"); // Import JSON data

// Route to display JSON data
app.get("/gadgets", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
