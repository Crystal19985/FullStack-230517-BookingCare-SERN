import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
require('dotenv').config();
import connectDB from "./config/connectDB";

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log('Server is running on the port :' + port);
});



