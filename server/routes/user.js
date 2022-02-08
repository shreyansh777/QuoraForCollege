import express from "express";

import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin); //it will be post because we are sending data to backend
router.post("/signup", signup);

export default router;
