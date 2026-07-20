import bcrypt from "bcryptjs";
import { query } from "../config/database";
import connectDB from "../config/database";
import { RowDataPacket } from "mysql2";

export const seedAdmin = async () => {
  try {
    await connectDB();

    // ─── Seed Admin ──────────────────────────────────────────────
    const adminEmail = "admin@gmail.com";
    const existingAdmin = await query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [adminEmail, 'admin']  // ← lowercase
    );
    
    if (existingAdmin.length === 0) {
      const hashedPassword = await bcrypt.hash("admin@gmail.com", 10);
      
      await query(
        `INSERT INTO users (
          full_name, email, password, role, is_blocked, order_ids, cart_ids
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'Admin User',
          adminEmail,
          hashedPassword,
          'admin',  // ← lowercase
          false,
          JSON.stringify([]),
          JSON.stringify([])
        ]
      );
      
      console.log("✅ Admin user seeded successfully.");
    } else {
      console.log("ℹ️  Admin user already exists.");
    }

    // ─── Seed Vendor ─────────────────────────────────────────────
    const vendorEmail = "vendor@gmail.com";
    const existingVendor = await query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [vendorEmail, 'vendor']  // ← lowercase
    );
    
    if (existingVendor.length === 0) {
      const hashedPassword = await bcrypt.hash("vendor123", 10);
      
      await query(
        `INSERT INTO users (
          full_name, email, password, role, is_blocked, order_ids, cart_ids
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'Vendor User',
          vendorEmail,
          hashedPassword,
          'vendor',  // ← lowercase
          false,
          JSON.stringify([]),
          JSON.stringify([])
        ]
      );
      
      console.log("✅ Vendor user seeded successfully.");
    } else {
      console.log("ℹ️  Vendor user already exists.");
    }

    // ─── Seed Customer ────────────────────────────────────────────
    const customerEmail = "customer@gmail.com";
    const existingCustomer = await query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [customerEmail, 'user']  // ← lowercase
    );
    
    if (existingCustomer.length === 0) {
      const hashedPassword = await bcrypt.hash("customer123", 10);
      
      await query(
        `INSERT INTO users (
          full_name, email, password, role, is_blocked, order_ids, cart_ids
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'Customer User',
          customerEmail,
          hashedPassword,
          'user',  // ← lowercase
          false,
          JSON.stringify([]),
          JSON.stringify([])
        ]
      );
      
      console.log("✅ Customer user seeded successfully.");
    } else {
      console.log("ℹ️  Customer user already exists.");
    }

    console.log("🎉 All users seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
};

// ─── Run directly if called as standalone ──────────────────────
if (require.main === module) {
  seedAdmin().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
}