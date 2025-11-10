const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/userRoutes");
const todoRoutes = require("./src/routes/todoRoutes");
dotenv.config();

const app = express();

//middleware to parse json
app.use(express.json());

//connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB is connected"))
  .catch((err)=>console.log("MongoDB connection failed",err));

//Routes
app.use("/api/users",userRoutes);
app.use("/api/todos",todoRoutes);

  //default route
  app.get("/",(req,res)=>{
    res.send("API is running...");
  });

  //server listen
  const PORT = process.env.PORT || 5000;
  app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
  });



