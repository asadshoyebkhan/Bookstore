import 'dotenv/config'
import express from 'express';
import connectDB from './config/db.js';
import {Book} from './models/BookModel.js';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));

app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send("<H1> Hello World </H1>");
});

app.get('/books', async(req, res)=>{
    try{
        const books = await Book.find();
        res.status(200).json({
            RecordCount: books.length,
            data:books
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
});

app.get('/books/:id', async(req, res)=>{
    try {
        const bookWithId = await Book.findById(req.params.id);
        if(!bookWithId){
            res.status(404).json({
                message: "Book with id "+req.params.id+" not found"
            })
        }else{
            res.status(200).json(bookWithId);
        }
    } catch (error) {
        res.status(500).json({message: "Error finding book with id "+req.params.id});
    }
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

});

app.put('/books/:id', async(req, res)=>{
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        )

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error updating book with id "+req.params.id
        })
    }
});


app.delete('/books/:id', async(req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(
            req.params.id
        );
        
        if(!deletedBook){
            res.status(404).json({
                message: "Book with id "+req.params.id+" not found"
            })
        }else{
            res.status(200).json({
                message: "Book with id "+req.params.id+" deleted successfully",
                body: deletedBook
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error deleting book with id "+req.params.id
        })
    }
})

connectDB(app);






