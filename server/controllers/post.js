import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import express from "express";
const router = express.Router();

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await PostMessage.countDocuments({}); // return the number of count of posts

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// QUERY --> /posts?page=1  --> page = 1   Usually we use query if we want to search
// PARAMS --> /posts/123 --> id = 123      Usually we use params if we some particular resource like post

// export const getPostsBySearch = async (req, res) => {
//   const { searchQuery, tags } = req.query;
//   //console.log(searchQuery);
//   //console.log(tags);
//   try {
//     const title =
//       searchQuery !== "none" ? new RegExp(searchQuery, "i") : "none"; //i is written becoz it will ignore upper case and convert it into lower case
//     //above line converting the searchQuery into regular expression

//     // const posts = await PostMessage.find({
//     //   $or: [{ title }, { tags: { $in: tags.split(",") } }],
//     // });
//     //console.log(posts);
//     const post = {
//       name: "check",
//     };
//     //res.json({ data: posts });
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
export const getPostsBySearch = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const tags = req.query.tags;

  try {
    //const title = new RegExp("^" + searchQuery);

    const posts = await PostMessage.aggregate({
      $match: {
        $or: [{ title: searchQuery }, { tags: { $in: tags.split(",") } }],
      },
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  //const post = req.body;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    //Checking if ID is valid or not
    return res.status(404).send("No post with that ID");

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  // const updatedPost = await PostMessage.findByIdAndUpdate(
  //   //Finding the ID of post and updating it
  //   _id,
  //   { ...post, _id },
  //   {
  //     new: true,
  //   }
  // );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    //Checking if ID is valid or not
    return res.status(404).send("No post with that ID");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    //Checking if ID is valid or not
    return res.status(404).send("No post with that ID");

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //likes the post
    post.likes.push(req.userId);
  } else {
    //dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);
  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default router;
