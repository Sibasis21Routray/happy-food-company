import dotenv from "dotenv";
import { query } from "../config/database";
import connectDB from "../config/database";

dotenv.config();

const products = [
  {
    heading: "Combo Pack",
    slug: "combo-6-1",
    title: "Happy Bar - Almond Cranberry | Cashew Raisin - Variety Box of 6",
    subtitle: "",
    productHeading: "",
    productDescription: "",
    stockDetails: "In Stock",
    category: "Combo Packs",
    price: 274,
    images: ["/combo-products/Variety-6-AC-CR.JPG"],
    isActive: true
  },
  {
    heading: "Combo Pack",
    slug: "combo-6-2",
    title: "Happy Bar - Coconut Almond | Date Almond Cranberry - Variety Box of 6",
    subtitle: "",
    productHeading: "",
    productDescription: "",
    stockDetails: "In Stock",
    category: "Combo Packs",
    price: 276,
    images: ["/combo-products/Variety-6-CA-DAC.JPG"],
    isActive: true
  },
  {
    heading: "Mega Combo",
    slug: "combo-12",
    title: "Almond Cranberry | Cashew Raisin | Coconut Almond | Date Almond Cranberry - Variety Box of 12",
    subtitle: "",
    productHeading: "",
    productDescription: "",
    stockDetails: "In Stock",
    category: "Combo Packs",
    price: 552,
    images: ["/combo-products/Variety-12.JPG"],
    isActive: true
  }
];

export const seedProducts = async () => {
  try {
    console.log("🔄 Seeding products...");

    const existing = await query<any[]>(
      "SELECT COUNT(*) AS count FROM products"
    );

    if (existing[0].count > 0) {
      console.log("ℹ️ Products already exist. Skipping product seed.");
      return;
    }

    // Insert products
    for (const product of products) {
      await query(
        `INSERT INTO products (
          heading, slug, title, subtitle,
          product_heading, product_description,
          stock_details, category, price,
          images, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.heading,
          product.slug,
          product.title,
          product.subtitle || "",
          product.productHeading || "",
          product.productDescription || "",
          product.stockDetails,
          product.category,
          product.price,
          JSON.stringify(product.images || []),
          product.isActive ? 1 : 0,
        ]
      );
    }

    console.log(`✅ Seeded ${products.length} products successfully!`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    throw error;
  }
};
