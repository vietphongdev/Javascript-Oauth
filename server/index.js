const express = require("express");

const app = express();
const PORT = 4000;
const path = require("path");

// Body Parser middleware - parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/pages/signin.html"));
});

app.post("/login", (req, res) => {
  const { redirect_url, client_id, email, password } = req.body;
  res.statusCode = 301;
  res.setHeader("location", `${redirect_url}?token=xxx`);
  res.json({ redirect_url, client_id });
});

app.listen(PORT, () => {
  console.log(`Example app listening at PORT 4000`);
});
