import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

const Port = process.env.PORT || 5000;

const connectDB = async (req, res) => {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("mongodb connection started");
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
};

app.use("/api", userRouter);

connectDB().then(() => {
    app.listen(Port, () => {
        console.log("server is running on port 5000");
    });
});
