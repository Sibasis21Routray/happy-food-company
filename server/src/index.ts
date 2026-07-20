import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import { seedAdmin } from "./seeds/adminSeed";
import { seedProducts } from "./seeds/productSeed";


// ─── Import Routes ────────────────────────────────────────────
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import couponRoutes from "./routes/couponRoutes";
import orderRoutes from "./routes/orderRoutes";
import addressRoutes from "./routes/addressRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
import adminRoutes from "./routes/adminRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import contactRoutes from "./routes/contactRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api", contactRoutes);

// ─── Health Check ─────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "Server is running"
  });
});

// ─── Error Handling Middleware ──────────────────────────────
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ─── Start Server ────────────────────────────────────────────
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Seed admin user (optional, will skip if exists)
    await seedAdmin();
    await seedProducts();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      console.log(`✅ Database connected successfully`);
    });
    
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;