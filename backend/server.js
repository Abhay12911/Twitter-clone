import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse req.body
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`sever is runnig on ${PORT}`);
    connectMongoDB();
})