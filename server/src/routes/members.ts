import express from "express";
import passport from "passport";
const router = express.Router();
import {
  getAllmembers,
  getMemberbyId,
  getUpdateById,
  logoutUser,
  SignUpUser,
  loginUser,
  isAuthenticated,
  LoginFail,
  Member,
} from "../controlers/members";

/**
 * SignUp Member
 */
router.post("/signup", SignUpUser);

/**
 * Login Member with Local Strategy
 */
router.post("/login", passport.authenticate("local", { failureRedirect: "/api/member/login/fail" }), loginUser);
router.get("/login/fail", LoginFail);

/**
 * get All member for admin User
 */
router.get("/getall", isAuthenticated, getAllmembers);

/**
 * get single Member with id
 */
router.get("/get/:id", isAuthenticated, getMemberbyId);

/**
 * Update Member with id
 */
router.put("/update/:id", isAuthenticated, getUpdateById);

/**
 * Logout Member from req variable and session
 */
router.get("/logout", logoutUser);

/**
 * Login Member with Google Strategy
 */
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/member/auth/google/fail" }),
  (req, res, next) => {
    console.log(req.user, req.isAuthenticated());
    res.json({ msg: "Login Successfull", User: req.user });
  }
);

router.get("/auth/google/fail", (req, res) => {
  res.send("auth faield");
});

export default router;
