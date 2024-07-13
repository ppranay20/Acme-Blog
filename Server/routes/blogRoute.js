const express = require('express');
const blogRouter = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware');
const {createPost,updatePost,getPost,getAllPost} = require('../controllers/blogController');

blogRouter.post("/create",authMiddleware,createPost);
blogRouter.put('/update',authMiddleware,updatePost);
blogRouter.get('/get/:id',authMiddleware,getPost);
blogRouter.get('/posts',authMiddleware,getAllPost)


module.exports = {
    blogRouter
}
