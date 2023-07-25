import express from "express";
import mongoose from "mongoose";
import { PostsModel } from "../models/Posts.js";

const router = express.Router();

//get all posts
router.get("/", async (req, res) => {
    try {
      const result = await PostsModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get posts based on the location -> 100 meter radius
router.post("/getPosts", async (req, res) => {
    const lat = parseFloat(req.body.lat);
    const long = parseFloat(req.body.long);
  
    try {
      // Buscar posts dentro do raio de 100 metros
      const posts = await PostsModel.find({
        lat: { $gt: lat - 0.001, $lt: lat + 0.001 },
        long: { $gt: long - 0.001, $lt: long + 0.001 }
      });
  
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

//get post by the post ID
router.get("/:postId", async (req, res) => {
    try {
      const result = await PostsModel.findById(req.params.postId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//create new post
router.post("/", async (req, res) => {
    const post = new PostsModel({
      _id: new mongoose.Types.ObjectId(),
      lat: req.body.lat,
      long: req.body.long,
      message: req.body.message,
      likes: 0,
      dislikes: 0
    });
    console.log(post);
  
    try {
      const result = await post.save();
      res.status(201).json({
        createdPost: {
          lat: result.lat,
          long: result.long,
          message: result.message,
          likes: result.likes,
          likes: result.dislikes,
          _id: result._id,
        },
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json(err);
    }
  });




router.put("/likes/:postId", async (req, res) => {
    try {
      const post = await PostsModel.findById(req.params.postId);
      const updatedLikes = post.likes + req.body.likes;
      
      const updatedPost = await PostsModel.findByIdAndUpdate(
        req.params.postId,
        { $set: { likes: updatedLikes } },
        { new: true }
      );
      
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put("/dislikes/:postId", async (req, res) => {
    try {
      const post = await PostsModel.findById(req.params.postId);
      const updatedDislikes = post.dislikes + req.body.dislikes;
      
      const updatedPost = await PostsModel.findByIdAndUpdate(
        req.params.postId,
        { $set: { dislikes: updatedDislikes } },
        { new: true }
      );
      
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  export { router as postsRouter };