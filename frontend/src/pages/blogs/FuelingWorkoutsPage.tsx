import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { easeInOut } from "framer-motion";
import YouMayLike from "../../components/blogs/YouMayLike";
import { BlogHero } from "./BlogHero";
import { Banner } from "../../components/Banner";

const FuelingWorkoutsPage: React.FC = () => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeInOut }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3 }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white pt-14 font-sans">
      
      {/* Hero Section with Background Image */}
      <BlogHero
        title="Fueling Your Workouts with Happy Bars"
        author="Boing the Blogger"
        description="Power every workout with clean protein, sustained energy, and wholesome ingredients designed for active lifestyles."
        date="April 20, 2024"
        backgroundImage="/fuelingworkout/fuel-workout-protein-pro.webp"
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
              "As fitness enthusiasts, we understand the importance of nourishing our bodies before and after exercise."
            </p>
          </motion.div>

          <motion.p variants={paragraphVariants} className="text-body text-gray-600 text-base leading-relaxed mb-8">
            Whether you're hitting the gym, going for a run, or practicing yoga, the right nutrients play a 
            crucial role in maximizing performance and recovery. In this blog post, we'll delve into why 
            Happy Bars are the perfect pre- and post-workout protein bars for fitness, packed with energy 
            and essential nutrients.
          </motion.p>

          <motion.h2 
            variants={paragraphVariants} 
            className="heading-1 text-2xl font-light text-gray-800 mt-8 mb-4"
          >
            Why Fuel Matters
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-body text-gray-600 text-base leading-relaxed mb-4">
            Before we dive into the specifics of Happy Bars, let's emphasize why proper fueling matters:
          </motion.p>
          <ul className="space-y-2 mb-8 ml-4">
            {[
              "Boosting Performance: When you fuel your body adequately, you enhance endurance, strength, and overall performance during workouts.",
              "Supporting Recovery: After a strenuous session, your muscles need replenishment. Proper nutrition aids in muscle repair and reduces soreness.",
              "Sustaining Energy Levels: Whether you're lifting weights or doing cardio, maintaining steady energy levels is essential. Happy Bars provide that sustained energy punch."
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
                <strong className="text-gray-600">{item.split(":")[0]}:</strong> {item.split(":")[1]}
              </motion.li>
            ))}
          </ul>

          <motion.h2 
            variants={paragraphVariants} 
            className="heading-1 text-2xl font-light text-gray-800 mt-8 mb-4"
          >
            Happy Bars: Your Workout Allies
          </motion.h2>
          
          <motion.h3 
            variants={paragraphVariants} 
            className="heading-1 text-lg text-gray-800 mt-6 mb-3"
          >
            1. Energy Bars for Fitness
          </motion.h3>
          <motion.p variants={paragraphVariants} className="text-body text-gray-600 text-base leading-relaxed mb-4">
            Happy Bars are purposefully designed to fuel your fitness journey. They're not just any energy 
            bars; they're your workout allies. Let's explore why:
          </motion.p>
          <ul className="space-y-2 mb-6 ml-4">
            {[
              "Natural Ingredients: Happy Bars are 100% natural protein bars, crafted from wholesome ingredients. No artificial additives, just pure goodness.",
              "Balanced Macronutrients: Each bar combines protein, healthy fats, and complex carbohydrates for sustained energy during workouts and muscle recovery.",
              "Varieties: Choose from Cashew, Coconut, Raisin, Almond, and Cranberry flavors!"
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
                <strong className="text-gray-600">{item.split(":")[0]}:</strong> {item.split(":")[1]}
              </motion.li>
            ))}
          </ul>

          <motion.h3 
            variants={paragraphVariants} 
            className="heading-1 text-lg text-gray-800 mt-6 mb-3"
          >
            2. Protein Energy Bars
          </motion.h3>
          <motion.p variants={paragraphVariants} className="text-body text-gray-600 text-base leading-relaxed mb-4">
            Protein is the building block of muscle repair. Happy Bars deliver a protein punch without 
            compromising on taste:
          </motion.p>
          <ul className="space-y-2 mb-6 ml-4">
            {[
              "Natural Protein: Our bars contain all-natural protein. No artificial isolates—just pure goodness.",
              "Cashew Protein Bars: Creamy cashews meet protein power.",
              "Raisin Protein Bars: Sweet and satisfying, providing essential amino acids for muscle recovery.",
              "Almond Protein Bars: Almonds bring crunch and protein prowess.",
              "Cranberry Protein Bars: A burst of antioxidants and protein."
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
                <strong className="text-gray-600">{item.split(":")[0]}:</strong> {item.split(":")[1]}
              </motion.li>
            ))}
          </ul>

          {/* Highlight Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="bg-gray-50 p-6 my-8 border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-body text-gray-600 text-md leading-relaxed">
              <span className="font-medium text-gray-800">Did You Know?</span> Happy Bars are mindful of your 
              sugar intake. They won't send your blood sugar on a rollercoaster ride, making them perfect 
              for overall well-being.
            </p>
          </motion.div>

          <motion.h3 
            variants={paragraphVariants} 
            className="heading-1 text-lg text-gray-800 mt-6 mb-3"
          >
            3. Pre- and Post-Workout Rituals
          </motion.h3>
          <ul className="space-y-2 mb-8 ml-4">
            {[
              "Pre-Workout: Grab a Happy Bar about 30 minutes before your session. The balanced nutrients will power you through.",
              "Post-Workout: Your muscles are craving replenishment. Enjoy a Happy Bar within an hour after exercise to kickstart recovery."
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
                <strong className="text-gray-600">{item.split(":")[0]}:</strong> {item.split(":")[1]}
              </motion.li>
            ))}
          </ul>

          <motion.h2 
            variants={paragraphVariants} 
            className="heading-1 text-2xl font-light text-gray-800 mt-8 mb-4"
          >
            Conclusion
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-body text-gray-600 text-base leading-relaxed mb-6">
            Happy Bars aren't just snacks; they're your fitness companions. Whether you're hitting the trails, 
            lifting weights, or practicing downward dog, these bars provide the energy and nutrients you need. 
            Fuel your workouts with{' '}
            <Link to="/" className="text-gray-800 hover:text-gray-600 transition-colors font-medium">
              Happy Bars
            </Link>{' '}
            and embrace a healthier, happier you!
          </motion.p>

          {/* Callout Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 p-6 my-8 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-body text-gray-600 text-base italic">
              "Remember: Nutrition fuels greatness. Happy Bars fuel you."
            </p>
          </motion.div>

          {/* Key Takeaways */}
          <motion.div 
            variants={paragraphVariants}
            className="border-t border-gray-100 mt-10 pt-8"
          >
            <h3 className="heading-1 text-lg text-gray-800 mb-4">Key Takeaways</h3>
            <ul className="space-y-2">
              {[
                "Happy Bars are 100% natural protein bars for pre and post-workout nutrition",
                "Available in 5 delicious flavors to suit every taste preference",
                "Provides balanced macronutrients for optimal performance and recovery"
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
            to="/blog/craving-control-weight-loss"
            className="group flex items-center gap-2 text-body text-gray-500 text-md hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Previous Article
          </Link>
          <Link
            to="/blog/happy-bars-parents-kids"
            className="group flex items-center gap-2 text-body text-gray-500 text-md hover:text-gray-700 transition-colors"
          >
            Next Article
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

export default FuelingWorkoutsPage;