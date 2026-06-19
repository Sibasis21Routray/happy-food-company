import { Router } from "express";
import { saveAddress, getMyAddresses, updateAddress, deleteAddress } from "../controller/addressController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/",  protect, saveAddress);
router.get("/",   protect, getMyAddresses);
router.put("/:addressId", protect, updateAddress); 
router.delete("/:addressId", protect, deleteAddress);

export default router;
