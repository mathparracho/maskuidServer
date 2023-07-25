import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { postsRouter } from "../routes/posts.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/post", postsRouter);

mongoose.connect("mongodb+srv://mathparracho:PhBWnUMoIhtuN24k@cluster0.pxqgpyq.mongodb.net/?retryWrites=true&w=majority");

app.listen(3001, () => console.log("server on"));