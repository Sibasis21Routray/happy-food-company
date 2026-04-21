import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.config";

import authRoutes    from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes    from "./routes/cartRoutes";
import couponRoutes  from "./routes/couponRoutes";
import orderRoutes   from "./routes/orderRoutes";
import addressRoutes from "./routes/addressRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
// import adminRoutes from "./routes/adminRoutes";
// import vendorRoutes from "./routes/vendorRoutes";
import { seedAdmin } from "./seeds/adminSeed";
import adminRoutes from "./routes/adminRoutes";
import vendorRoutes from "./routes/vendorRoutes";

dotenv.config();
connectDB().then(() => {
  seedAdmin();
});

const app = express();

app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart",     cartRoutes);
app.use("/api/coupon",   couponRoutes);
app.use("/api/order",    orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin",    adminRoutes);
app.use("/api/vendor",   vendorRoutes);

// ─── Health check ─────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
