
import { connect } from 'mongoose';

const uri = "mongodb://127.0.0.1:27017/followchat";

const connectDB = async () => {
    try {
        await connect(uri);
        console.log("Connected to MongoDB with Mongoose!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;