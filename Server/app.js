const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const MONGODB_PASSWORD = "z16oMyPcm5LIab02";


const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000',credentials : true}));
app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});


app.use(express.json()) 
app.use(require("./routes/userRoutes"))
app.use(require("./routes/purchaseRoutes"))
app.use(require("./amazon/market_data"))

// require("./amazon/scrape.js")(); //BE CAREFUL

const mongoose = require("mongoose");
mongoose.connect(
    `mongodb+srv://bullmeza:${MONGODB_PASSWORD}@cluster0.svbe7.mongodb.net/KidBank?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
);

app.get('/yo', (req,res) =>{
    res.send("yo")
});

app.listen(PORT, ()=>{
    console.log("Port: " +  PORT)
})
