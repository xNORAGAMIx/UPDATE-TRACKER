import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected",
            connect.connection.host,
            connect.connection.name
        );
    } catch (err){
        console.log(err);
        process.exit(1);
    }
}