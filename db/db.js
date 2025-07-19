import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectToDB = async () =>{
    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to MongoDB");

    }catch (error) {
        console.log('error while connecting to MongoDB',error.message)
    }
};

export default connectToDB