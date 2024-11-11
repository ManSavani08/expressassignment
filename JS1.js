const express = require("express");
const app = express();
const PORT = 3000;

// Route for home page to display group names
app.get("/", (req, res) => {
  res.send(
    "<h1>Group Members</h1><ul><li>Man Savani</li><li>Yug Vaghani</li></ul>"
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
