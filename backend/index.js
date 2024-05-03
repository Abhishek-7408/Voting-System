const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000
app.use(cors());
app.use(express.json());
const dbconnect = require("./config/databse");
dbconnect.dbconnect();

const upload = require("./routes/userRoutes");
app.use("/api/v1",upload);

app.listen(PORT, ()=>{
    console.log(`you are listning at ${PORT}`)
});

app.get("/", (req,res)=>{
    res.send(`<h1>hyy aashirwad </h1>`)
})