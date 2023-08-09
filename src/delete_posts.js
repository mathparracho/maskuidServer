import mongoose from "mongoose";
import { PostsModel } from "../models/Posts.js";

mongoose.connect("mongodb+srv://mathparracho:PhBWnUMoIhtuN24k@cluster0.pxqgpyq.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Deletar os posts com mais de 24 horas
const deleteOldPosts = async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    try {
      const result = await PostsModel.deleteMany({ timestamp: { $lt: twentyFourHoursAgo } });
      console.log(`${result.deletedCount} posts foram deletados.`);
    } catch (error) {
      console.error('Ocorreu um erro ao deletar os posts:', error);
    } finally {
      mongoose.disconnect();
    }
  };
  
  // Chamar a função para deletar os posts antigos
  deleteOldPosts();