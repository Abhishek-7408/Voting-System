const express = require("express");
const router = express.Router();

const {sendOtp} =require("../controller/otpController");
const {signup,login}=require("../controller/authcontroller");
const authMiddlerware =require("../Middleware/authMiddlerware");
const {registerCandidate, getAllCandidate, voted}=require("../controller/candidate")

router.post("/signup",signup);
router.post("/sendOtp",sendOtp);
router.post("/user/login",login);
router.post("/registerCandidate",  registerCandidate );
router.post("/voted",authMiddlerware,voted);
router.get("/getAllCandidates",  getAllCandidate);

module.exports=router;