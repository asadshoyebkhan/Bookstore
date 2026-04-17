import 'dotenv/config'
import express from 'express';
import connectDB from './config/db.js';
import {Book} from './models/BookModel.js';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send("<H1> Hello World </H1>");
});


app.post('/books', async (req, res) =>{
    try{
        console.log(req.body);

        const {title, author, publishYear} = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).json({message: "Please provide all the required fields"});
        }

        const newBook = await Book.create({
            title,
            author,
            publishYear
        });

        res.status(201).json(newBook);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }

})

connectDB(app);






