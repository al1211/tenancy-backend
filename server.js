import dotenv from "dotenv"
dotenv.config();
import express from "express"
import mongoose from "mongoose"
import cors from  "cors"
import userrouter from "./routes/user.routes.js";
import tenantrouter from "./routes/tenants.routes.js";
import notesrouter from "./routes/notes.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import connectDB from "./config/db.js";



const app  = express();
connectDB();
app.use(express.json());
app.use(cors({
    origin:"*"
}))


app.get("/health",(req,res)=>res.json({status:"ok"}));

app.use("/api/auth",userrouter);
app.use("/api/tenants",tenantrouter);
app.use("/api/notes",notesrouter);
app.use(errorHandler);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server is listen")
})