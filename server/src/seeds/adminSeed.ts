import bcrypt from "bcryptjs";
import User from "../models/user.model";

export const seedAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin@gmail.com", 10);
      await User.create({
        fullName: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding admin", error);
  }
};
