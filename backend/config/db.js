import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 6000;


console.log("MONGO_URI:", MONGO_URI);
console.log("PORT:", PORT);


async function connectDB(app){
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");


    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    })
}


export default connectDB;
