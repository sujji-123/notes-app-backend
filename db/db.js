import mongoose from "mongoose"

const connectToDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://babunkundu60:0EEN18UaPa93Fk91@stminorg27.plp450e.mongodb.net/sujji_notes_app?retryWrites=true&w=majority&appName=stminorg27');
        console.log("connected to MongoDB");

    }catch (error) {
        console.log('error while connecting to MongoDB',error.message)
    }
};

export default connectToDB