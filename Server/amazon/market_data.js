const fs = require('fs');
const express = require("express");
const app = express();

app.get("/getData",  async(req,res) => {
    res.send(JSON.parse(fs.readFileSync("./amazon/output.json")))
});

module.exports = app