import dotenv from "dotenv";
import { query } from "../config/database";
import connectDB from "../config/database";

dotenv.config();

const products = [
  // {
  //   heading: "Happy Bar",
  //   slug: "cashew-raisin",
  //   title: "Cashew Raisin",
  //   subtitle: "Combo Box of 6",
  //   productHeading: "Energize your Enjoyment!",
  //   productDescription: "Looking for a snack that's both a taste sensation and a powerhouse of goodness? Dive into our Protein Power Fusion – an extraordinary energy bar that brings together the dynamic duo of cashews and raisins!",
  //   stockDetails: "In Stock",
  //   category: "Happy Bars",
  //   price: 300,
  //   images: ["/images/cashew-raisin.png"],
  //   isActive: true
  // },
  // {
  //   heading: "Happy Bar",
  //   slug: "coconut-almond",
  //   title: "Coconut Almond",
  //   subtitle: "Combo Box of 6",
  //   productHeading: "Spark your snacking!",
  //   productDescription: "In the quest for a snack that's a burst of flavors and a nutritional powerhouse, meet our Protein Snack Fiesta! This remarkable energy bar seamlessly blends the dynamic duo of coconuts and almonds for a snacking experience like no other!",
  //   stockDetails: "In Stock",
  //   category: "Happy Bars",
  //   price: 300,
  //   images: ["/images/coconut-almond.png"],
  //   isActive: true
  // },
  // {
  //   heading: "Happy Bar",
  //   slug: "date-almond-cranberry",
  //   title: "Date Almond Cranberry",
  //   subtitle: "Combo Box of 6",
  //   productHeading: "Fuel your Fun!",
  //   productDescription: "Looking for a snack that's as exciting as it is energizing? Dive into our Protein Power Play – an irresistible energy bar loaded with the goodness of dates, almonds, and cranberries!",
  //   stockDetails: "In Stock",
  //   category: "Happy Bars",
  //   price: 300,
  //   images: ["/images/date-almond-cranberry.png"],
  //   isActive: true
  // },
  // {
  //   heading: "Happy Bar",
  //   slug: "almond-cranberry",
  //   title: "Almond Cranberry",
  //   subtitle: "Combo Box of 6",
  //   productHeading: "Unleash the Awesome!",
  //   productDescription: "Are you ready for a taste explosion that's as good for your taste buds as it is for your body? Dive into our Protein Power Play – a delightful energy bar loaded with almonds, cranberries and jaggery that will make your snacking game strong!",
  //   stockDetails: "In Stock",
  //   category: "Happy Bars",
  //   price: 300,
  //   images: ["/images/almond-cranberry.png"],
  //   isActive: true
  // },
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

const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log("🔄 Seeding products...");

    // Clear existing products
    await query('DELETE FROM products');
    console.log("🗑️  Cleared existing products");

    // Insert products
    for (const product of products) {
      await query(
        `INSERT INTO products (
          heading, slug, title, subtitle, product_heading, product_description,
          stock_details, category, price, images, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.heading,
          product.slug,
          product.title,
          product.subtitle || '',
          product.productHeading || '',
          product.productDescription || '',
          product.stockDetails,
          product.category,
          product.price,
          JSON.stringify(product.images || []),
          product.isActive ? 1 : 0
        ]
      );
    }

    console.log(`✅ Seeded ${products.length} products successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

// Run seed
seedProducts();