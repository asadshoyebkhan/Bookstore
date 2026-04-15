import 'dotenv/config'
import express from 'express';
import connectDB from './config/db.js';


const app = express();

app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send("<H1> Hello World </H1>");
});

connectDB(app);






