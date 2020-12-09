import express from "express";
const router = express.Router();
import { addVotes, getAllVoteByFeatureId, deleteVoteById } from "../controlers/featureVotes";
import { isAuthenticated } from "../controlers/members";

// add Votes
router.post("/add/:authId/:requestId", isAuthenticated, addVotes);
// get all Votes

// router.get("/all",getAllVotes)

// get vote vote featureId
router.get("/getall/:requestId", isAuthenticated, getAllVoteByFeatureId);

// delete vote by id
router.delete("/delete/:voteId/:authId", isAuthenticated, deleteVoteById);

export default router;
