import { protect } from "../utils/jsonwebtoken.js";
import { createProduct,getProducts,getProduct,deleteProduct,updateProduct} from "../controllers/productControllers.js";
import { Router } from "express";
const router = Router();

router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;