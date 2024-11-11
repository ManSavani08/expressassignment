const express = require("express");
const app = express();
const PORT = 3000;
let gadgets = require("./data/data.json");
const fs = require("fs");

// Middleware to parse JSON bodies
app.use(express.json());

// GET all gadgets
app.get("/gadgets", (req, res) => {
  res.json(gadgets);
});

// POST to add a new gadget
app.post("/gadgets", (req, res) => {
  const newGadget = req.body;

  // Generate a unique ID for the new gadget
  newGadget.id = gadgets.length > 0 ? gadgets[gadgets.length - 1].id + 1 : 1;

  gadgets.push(newGadget);
  fs.writeFileSync("./data/data.json", JSON.stringify(gadgets, null, 2));
  res.status(201).json(newGadget);
});

// PUT to update a gadget by ID
app.put("/gadgets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = gadgets.findIndex((gadget) => gadget.id === id);

  if (index !== -1) {
    gadgets[index] = { ...gadgets[index], ...req.body };
    fs.writeFileSync("./data/data.json", JSON.stringify(gadgets, null, 2));
    res.json(gadgets[index]);
  } else {
    res.status(404).send("Gadget not found");
  }
});

// DELETE a gadget by ID
app.delete("/gadgets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newGadgets = gadgets.filter((gadget) => gadget.id !== id);

  if (newGadgets.length !== gadgets.length) {
    gadgets = newGadgets;
    fs.writeFileSync("./data/data.json", JSON.stringify(gadgets, null, 2));
    res.status(204).send();
  } else {
    res.status(404).send("Gadget not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
