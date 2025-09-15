import mongoose  from "mongoose";

 const connectDB=async()=>{
    try {
        const URL=process.env.MONGO_DB;
        if(!URL){
            throw new Error("not catch mongo url form .env file")
        }
    await mongoose.connect(URL);
    console.log("mongoose connect");
    } catch (error) {
        console.log("not connect");
        process.exit(1)
    }
}

export default connectDB