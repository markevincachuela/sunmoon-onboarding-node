require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userRouter = require("./api/users/user.router");
const basicAuth = require('express-basic-auth')


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));




app.use("/api/users",userRouter);


app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running on PORT:",process.env.APP_PORT);
});