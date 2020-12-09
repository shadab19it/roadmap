import express from "express";
import {
  addFeatureComment,
  getAllFeatureComment,
  updataComment,
  deleteComment,
  getCommentById,
  getCommentByReqId,
} from "../controlers/featureCommet";
import { isAuthenticated } from "../controlers/members";
const router = express.Router();

router.get("/getall", isAuthenticated, getAllFeatureComment);
router.get("/get/:commentId", isAuthenticated, getCommentById);
router.get("/:requestId", isAuthenticated, getCommentByReqId);
router.post("/add/:authId/:requestId", isAuthenticated, addFeatureComment);
router.put("/update/:commentId", isAuthenticated, updataComment);
router.delete("/delete/:commentId", isAuthenticated, deleteComment);

export default router;
