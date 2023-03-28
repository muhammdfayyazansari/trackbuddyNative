const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;
const app = express();
const MONGODB_URL = require("./database/db")

app.use(cors());
app.use(express.json()); 
mongoose.set("strictQuery", false);
 
mongoose.connect(MONGODB_URL).then(console.log("mongodb connected"))
.catch((error)=>{
  console.log("error>>>", error)
})
app.use('/', require('./routes/rootRoute'))
// app.use('/', (req, res)=>{
//   res.status(200).send({
//     data: 'fayyaz ansaseri'
//   })
// })





app.listen(PORT, ()=>{
  console.log(`Your Todo App is running on ${PORT}`)
})


















