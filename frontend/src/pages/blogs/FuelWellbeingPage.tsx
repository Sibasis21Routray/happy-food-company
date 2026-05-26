import React from "react";
import { motion, easeInOut } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import YouMayLike from "../../components/blogs/YouMayLike";
import { BlogHero } from "./BlogHero";
import { Banner } from "../../components/Banner";

const FuelWellbeingPage: React.FC = () => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeInOut },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const varietyVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-white pt-14 font-sans">
      <BlogHero
        title="Fuel Your Well-being with Happy Bars: A Natural Protein Energy Solution"
        author="Boing the Blogger"
        description="Support your active lifestyle with clean, natural protein bars crafted to energize your body and nourish your well-being."
        date="May 4, 2024"
        backgroundImage="/fuelwellbeing/fuel-your-wellbeing.webp"
      />
      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-3xl pb-20">
        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-gray max-w-none"
        >
          {/* Intro Quote */}
          <motion.div className="border-l-2 border-gray-300 pl-6 mb-8">
            <p className="text-body text-gray-500 text-lg italic leading-relaxed">
              "In today's health-conscious world, finding the right balance
              between nutrition and taste is key to sustaining energy levels and
              promoting overall well-being."
            </p>
          </motion.div>

          <motion.p
            variants={paragraphVariants}
            className="text-body text-gray-600 text-base leading-relaxed mb-8"
          >
            That's where Happy Bars step in, offering a delicious array of 100%
            natural protein energy bars designed to support your fitness goals,
            boost your health, and enhance your mood—all while keeping sugar
            levels in check.
          </motion.p>

          <motion.h2
            variants={paragraphVariants}
            className="heading-1 text-2xl font-light text-gray-800 mt-6 mb-4"
          >
            Unveiling the Power of Happy Bars: Natural Protein Energy at Its
            Finest
          </motion.h2>

          {/* Product Varieties with left border styling */}
          <div className="space-y-6 mb-8">
            {[
              {
                name: "Almond Energy Bars",
                desc: "Our almond energy bars are a delightful blend of crunchy almonds and wholesome ingredients, providing a natural source of protein and sustained energy for your active lifestyle. Perfect for fitness enthusiasts and health-conscious individuals alike, these bars offer a satisfying snack option without compromising on taste or nutrition.",
              },
              {
                name: "Cashew Energy Bars",
                desc: "Indulge in the creamy richness of cashews with our cashew energy bars. Packed with protein and essential nutrients, these bars are a guilt-free way to fuel your body and mind, whether you're hitting the gym or powering through a busy day.",
              },
              {
                name: "Raisin Energy Bars",
                desc: "Satisfy your sweet cravings with our raisin energy bars, bursting with natural sweetness and energy-boosting goodness. Made with plump raisins and wholesome ingredients, these bars provide a convenient source of nutrition for those on the go, with low sugar content to support your dietary goals.",
              },
              {
                name: "Cranberry Energy Bars",
                desc: "Tart and tangy, our cranberry energy bars offer a refreshing twist on traditional protein bars. Loaded with antioxidants and flavor, these bars provide a natural boost of energy while supporting your overall health and well-being.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                variants={varietyVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: idx * 0.05 }}
                className="border-l-2 border-gray-100 pl-5 py-2"
              >
                <h3 className="heading-1 text-lg text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-body text-gray-500 text-md leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.h2
            variants={paragraphVariants}
            className="heading-1 text-2xl font-light text-gray-800 mt-8 mb-4"
          >
            The Natural Advantage: 100% Natural Protein Energy Bars for Your
            Lifestyle
          </motion.h2>
          <motion.p
            variants={paragraphVariants}
            className="text-body text-gray-600 text-base leading-relaxed mb-6"
          >
            At{" "}
            <Link
              to="/"
              className="text-gray-800 hover:text-gray-600 transition-colors font-medium"
            >
              The Happy Food Company
            </Link>
            , we believe in the power of nature to nourish and energize. That's
            why our Happy Bars are crafted using only the finest natural
            ingredients, free from artificial additives and preservatives,
            creating the ultimate natural protein energy bars. Each bar is a
            testament to our commitment to providing you with wholesome,
            nutritious snacks that fuel your body and mind.
          </motion.p>

          {/* Highlight Box */}
          <motion.div
            variants={paragraphVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="bg-gray-50 p-6 my-8 border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-body text-gray-600 text-md leading-relaxed">
              <span className="font-medium text-gray-800">Did You Know?</span>{" "}
              Our protein bars for fitness are the perfect companion for your
              fitness journey, providing sustained energy without the crash
              associated with high-sugar snacks.
            </p>
          </motion.div>

          <motion.h2
            variants={paragraphVariants}
            className="heading-1 text-2xl font-light text-gray-800 mt-8 mb-4"
          >
            Supporting Your Fitness Journey: Protein Bars for Health and
            Performance
          </motion.h2>
          <motion.p
            variants={paragraphVariants}
            className="text-body text-gray-600 text-base leading-relaxed mb-8"
          >
            Whether you're an athlete pushing your limits or simply looking to
            stay active and healthy, our protein bars for fitness are the
            perfect companion for your fitness journey. With a balanced
            combination of protein, carbohydrates, and essential nutrients, they
            provide the sustained energy you need to perform at your best,
            without the crash associated with high-sugar snacks.
          </motion.p>

          <motion.h2
            variants={paragraphVariants}
            className="heading-1 text-2xl font-light text-gray-800 mt-8 mb-4"
          >
            Conclusion: Elevate Your Snacking Experience with Happy Bars
          </motion.h2>
          <motion.p
            variants={paragraphVariants}
            className="text-body text-gray-600 text-base leading-relaxed mb-8"
          >
            Elevate your snacking experience with Happy Bars—delicious, natural
            protein energy bars designed to fuel your body, support your health,
            and uplift your mood. With a wide range of flavors to choose from
            and a commitment to quality and nutrition, they're the perfect
            choice for anyone seeking a healthier, happier lifestyle. Try them
            today and discover the joy of snacking well with Happy Bars.
          </motion.p>

          {/* Callout Box */}
          <motion.div
            variants={paragraphVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 p-6 my-8 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-body text-gray-600 text-base italic">
              "Fuel your body, support your health, and uplift your mood with
              Happy Bars!"
            </p>
          </motion.div>

          {/* Key Takeaways */}
          <motion.div
            variants={paragraphVariants}
            className="border-t border-gray-100 mt-10 pt-8"
          >
            <h3 className="heading-1 text-lg text-gray-800 mb-4">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {[
                "Happy Bars are 100% natural protein energy bars with no artificial additives",
                "Available in 4 delicious flavors: Almond, Cashew, Raisin, and Cranberry",
                "Perfect for fitness enthusiasts, active lifestyles, and health-conscious individuals",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-2 text-body text-gray-500 text-md"
                >
                  <span className="text-gray-400 mt-0.5">•</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.article>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-gray-100 my-10"
        />

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col md:flex-row justify-between gap-4"
        >
          <Link
            to="/blog/happy-bars-parents-kids"
            className="group flex items-center gap-2 text-body text-gray-500 text-md hover:text-gray-700 transition-colors"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Previous Article
          </Link>
          <Link
            to="/blog/fueling-your-day-with-happy-bars"
            className="group flex items-center gap-2 text-body text-gray-500 text-md hover:text-gray-700 transition-colors"
          >
            Next Article
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* You May Also Like */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16"
        >
          <YouMayLike />
        </motion.div>
      </div>

      <Banner
        badgeText="Real Food"
        headline="We make our protein bars with 12 or less simple natural ingredients."
        productImage="/images/cashew-raisin.png"
        accentColor="rgba(242, 215, 219, 0.75)"
        leftFloatingImage="/ingredients/Date.png"
        rightFloatingImage="/ingredients/cashew.png"
      />
    </div>
  );
};

export default FuelWellbeingPage;