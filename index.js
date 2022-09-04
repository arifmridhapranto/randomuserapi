const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const usersRoutes = require("./routes/v1/users.route.js");



app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/api/v1/users", usersRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
