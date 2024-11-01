import express from "express";
const app = express();
const port = 3000;

//parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});




export default app;