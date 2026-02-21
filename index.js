const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("./schema/schema");

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected")
}).catch(e=> console.log(e));

const app = express();

app.all('/graphql', createHandler({
     schema,
     graphiql: true
 }));



app.listen(4000, ()=>{
    console.log("Server is running");
});