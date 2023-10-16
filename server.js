const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
 

const app = express();

const port = process.env.PORT || 5000;

//parser for the body the data stream from the client to server name email mnamn malet nw begna case 
app.use(express.json());

app.use("/api/contacts" , require("./routes/contactRouts"));
app.use("/api/users" , require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(5000 , ()=>{
    console.log (`server is running on port${port}`)
})

connectDb();
  
