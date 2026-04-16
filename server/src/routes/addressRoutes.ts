import { Router } from "express";
import { saveAddress, getMyAddresses } from "../controller/addressController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/",  protect, saveAddress);
router.get("/",   protect, getMyAddresses);

export default router;
