import express from "express";
import { addFeature, getAllFeatureRequest, updateFeature, deleteFeature, getFeatureById } from "../controlers/featureReques";
import { isAuthenticated } from "../controlers/members";
const router = express.Router();

router.get("/getall", getAllFeatureRequest);
router.get("/get/:requestId", isAuthenticated, getFeatureById);
router.post("/add/:authId", isAuthenticated, addFeature);
router.put("/update/:authId/:requestId", isAuthenticated, updateFeature);
router.delete("/delete/:requestId", isAuthenticated, deleteFeature);

export default router;
