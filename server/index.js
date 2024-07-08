const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoutes');
const chatRoute = require('./Routes/chatRoutes');
const messageRoute = require('./Routes/messageRoutes');



require('dotenv').config();

const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/users',userRoute);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);


app.get("/",(req,res)=>{
    res.send("Welcome from LittleTalk");
})

const port = process.env.PORT || 5000;
app.listen(port, (req, res)=>{
    console.log(`server running on port : ${port}`);
})

const uri = process.env.ATLAS_URL|| 5000;
mongoose
  .connect(uri)
  .then(() => console.log("Mongodb Connecion Established"))
  .catch((error) => console.log("mongodb connection field", error.message));
 
 