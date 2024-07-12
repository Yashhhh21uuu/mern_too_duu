require("dotenv").config();
// import express
const express = require("express");
const cors=require("cors");
const { connectToMongoDB }=require("./database");

const path=require("path");
// create an instance of express called app
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"build")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build/index.html"));
})

const router = require("./routes");

app.use("/api", router);


// create a port variable
const port = process.env.PORT || 5000;

async function startServer(){
    await connectToMongoDB();

    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    })
}

startServer();