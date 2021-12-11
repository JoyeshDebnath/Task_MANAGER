const express = require("express");
const app = express();
const tasks = require("./Routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
//middlware
app.use(express.static("./public")); //middlware for serving static files
app.use(express.json()); //middle ware for serving json

//routes
// app.get("/hello", (req, res) => {
//   res.send("This is Task Manager App");
// });

app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected To DB");
    app.listen(port, console.log(`Server is listening on PORT: ${port}`));
  } catch (err) {
    console.log(err.message);
  }
};

start();

//  /api/v1/tasks---->>>getting tasks
//  /api/v1/tasks --->> posting tasks
//   /api/v1/tasks/:id --->deleteing a task
//  /api/v1/tasks/:id --->  gettig a single task
// /api/v1/tasks/:id --->  updating a task
