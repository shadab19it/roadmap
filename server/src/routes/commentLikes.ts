import express from "express";
const router = express.Router();
import { addLikes, getAllLikeByCommentId, deleteLikeById } from "../controlers/commentLikes";
import { isAuthenticated } from "../controlers/members";

// add Likes
router.post("/add/:authId/:commentId", isAuthenticated, addLikes);

// get Likes by commentId
router.get("/getall/:commentId", isAuthenticated, getAllLikeByCommentId);

// delete Likes by id
router.delete("/delete/:likeId/:authId", isAuthenticated, deleteLikeById);

export default router;
