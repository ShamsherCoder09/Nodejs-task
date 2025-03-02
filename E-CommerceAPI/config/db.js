import mongoose, { connect } from "mongoose";

export const connectDB = async ()=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URI)
        if(response){
            console.log("our database is successfully connected");
        }
    } catch (error) {
        console.log("error while connecting with database ", error);
    }
}