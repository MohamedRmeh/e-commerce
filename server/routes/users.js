import express from "express";
const router = express.Router();
import { getUser, deleteProduct } from "../controllers/users.js";
import { verifyToken, anotherMiddleware } from "./verifyToken.js";

router.get("/api/cart", anotherMiddleware, verifyToken, getUser);
router.delete("/api/cart/:id", anotherMiddleware, verifyToken, deleteProduct);

export default router;
