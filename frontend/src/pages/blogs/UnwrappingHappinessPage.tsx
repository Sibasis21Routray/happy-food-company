import React from "react";
import { motion, cubicBezier } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import YouMayLike from "../../components/blogs/YouMayLike";

const UnwrappingHappinessPage: React.FC = () => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: cubicBezier(0.16, 1, 0.3, 1) }
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

  const ingredientVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-fill bg-center h-88 "
          style={{
            backgroundImage: "url('https://img.freepik.com/premium-vector/blue-background-with-line-that-says-blue-vector-illustration-autumn-leaves_1007350-15391.jpg')",
          }}
        />
        
        {/* Animated Gradient Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 "
        />
        
        {/* Decorative Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, x: Math.random() * window.innerWidth }}
              animate={{ opacity: 0.3, y: -100 }}
              transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 py-20 mb-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div 
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Category Badge */}
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-xs tracking-[0.2em] text-gray-300 mb-4"
              >
                INGREDIENTS
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight"
              >
                Unwrapping Happiness: A Closer Look at the Wholesome Ingredients
              </motion.h1>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-px bg-white/30 mx-auto mb-6"
              />
              
              {/* Author & Date */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center gap-6 text-sm text-gray-300"
              >
                <span className="flex items-center gap-2">
                  <User size={14} strokeWidth={1.5} />
                  Boing the Blogger
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={14} strokeWidth={1.5} />
                  May 25, 2024
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} strokeWidth={1.5} />
                  8 min read
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-3xl pb-20">
        
        {/* Feature Image */}
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 -mt-8"
        >
          <div className="bg-gray-50 overflow-hidden shadow-sm ">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/health-flavour-natural-happy-bar.webp"
              alt="Wholesome Ingredients"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-gray max-w-none"
        >
          {/* Intro Quote */}
          <motion.div variants={paragraphVariants} className="border-l-2 border-gray-300 pl-6 mb-8">
            <p className="text-gray-500 text-lg font-light italic leading-relaxed">
              "At the Happy Food Company, we're dedicated to enhancing your health and happiness. 
              Our 100% natural energy bars are crafted to deliver a healthy snack that's rich in flavor and nutrition."
            </p>
          </motion.div>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            As the number of health-conscious consumers grows, we're proud to offer Happy Bars—the perfect 
            natural protein energy bars for your well-being.
          </motion.p>

          {/* Section 1 */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            The Pure and Nutritious Ingredients of Happy Bar
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Our Happy Bars are a blend of all-natural{' '}
            <Link to="/ingredients" className="text-gray-800 hover:text-gray-600 transition-colors font-medium">
              ingredients
            </Link>: Almonds, peanuts, cashews, jaggery, dates, cranberries, raisins, and coconut. 
            We're committed to creating energy bars low in sugar with absolutely no added sugar, artificial 
            flavoring, sweeteners, or colors. The sweetness in every Happy Bar comes from natural sources 
            like jaggery, dates, cranberries, and raisins.
          </motion.p>

          {/* Ingredients List */}
          <div className="space-y-6 mt-8">
            {[
              { name: "Almonds", desc: "Our almond energy bars are not just a treat for your taste buds but a heart-healthy choice. Each Happy Bar is packed with almonds that provide a satisfying crunch, essential heart-healthy fats, and vitamin E for antioxidant protection. Almonds are also a great source of magnesium and protein, supporting heart health and muscle growth." },
              { name: "Peanuts", desc: "Peanut energy bars from Happy Food Company are nutritional powerhouses, rich in protein and healthy fats. Peanuts contribute monounsaturated fats for heart health and resveratrol for anti-inflammatory benefits. They also offer niacin for brain function and improved blood circulation." },
              { name: "Cashews", desc: "Our cashew energy bars are filled with protein and healthy fats, along with essential minerals like magnesium for bone health and zinc for immune support. Cashews in Happy Bars also provide antioxidants for eye health and unsaturated fatty acids for cardiovascular wellness." },
              { name: "Jaggery", desc: "Our Happy Bars are sweetened with jaggery, a 100% natural sweetener that not only enhances the taste but also brings a treasure trove of health benefits. Jaggery is a powerhouse of antioxidants and essential minerals like potassium and magnesium, which are vital for overall health." },
              { name: "Dates", desc: "Dates in Happy Bars offer more than just natural sweetness and chewiness; they're a source of fiber and iron, promoting digestive health and energy. Rich in potassium for heart function and magnesium for essential bodily reactions, dates are packed with antioxidants." },
              { name: "Cranberries", desc: "Cranberry energy bars from Happy Food Company stand out for their zesty sweetness and multitude of health benefits. These antioxidant-rich fruits in Happy Bars support the immune system and promote heart health with their anti-inflammatory properties." },
              { name: "Raisins", desc: "Raisins in Happy Bars are a sweet powerhouse, offering antioxidants and a quick energy boost. These sun-dried grapes are rich in iron, crucial for healthy blood, and potassium, for muscle and heart health." },
              { name: "Coconut", desc: "The coconut energy bars from Happy Food Company add a creamy, tropical twist to your snacking routine. Coconut is low in carbs and rich in fiber and healthy fats, including MCTs that provide quick energy." }
            ].map((ingredient, idx) => (
              <motion.div 
                key={ingredient.name}
                variants={ingredientVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: idx * 0.05 }}
                className="border-l-2 border-gray-100 pl-5 py-2"
              >
                <h3 className="text-lg font-light text-gray-800 mb-2">{ingredient.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ingredient.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Highlight Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="bg-gray-50 p-6 my-8 border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              <span className="font-medium text-gray-800">Did You Know?</span> One Happy Bar provides 
              you with an egg's worth of protein (6 grams), making it a perfect post-workout snack!
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            Unpacking the Nutritional Power of Happy Bars
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            The importance of protein in protein energy bars is not to be neglected, as it plays a crucial 
            role in constructing and maintaining the structures that make up our bodies. However, we must 
            not overlook the carbohydrates in Happy Bars, as they are a vital part of a healthy diet.
          </motion.p>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Carbohydrates provide the body with glucose, which is converted into energy used to support 
            bodily functions and physical activity. Not only does Happy Bar provide the carbohydrates for 
            a quick and convenient source of energy but also contributes to the overall nutritional balance 
            that supports a healthy lifestyle.
          </motion.p>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Happy Bar is a perfectly balanced nutritional bar, providing a perfect balance of macronutrients 
            and is a good source of plenty of vitamins, thanks to the 100% natural ingredients used. Yet 
            despite being perfectly healthy, it doesn't put a strain on your pockets!
          </motion.p>

          {/* Callout Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 p-6 my-8 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-base font-light italic">
              "Have a delicious, nutritious snack with a Happy Bar!"
            </p>
          </motion.div>

          {/* Key Takeaways */}
          <motion.div 
            variants={paragraphVariants}
            className="border-t border-gray-100 mt-10 pt-8"
          >
            <h3 className="text-lg font-light text-gray-800 mb-4">Key Takeaways</h3>
            <ul className="space-y-2">
              {[
                "Happy Bars use 100% natural ingredients with no added sugar or artificial sweeteners",
                "Each bar provides 6g of protein along with essential vitamins and minerals",
                "Natural sweeteners like jaggery and dates provide healthier alternatives to refined sugar"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-2 text-gray-500 text-sm"
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
            to="/blog/nourish-energize-thrive"
            className="group flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Previous Article
          </Link>
          <Link
            to="/blog/satisfy-your-sugar-cravings-naturally"
            className="group flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
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
    </div>
  );
};

export default UnwrappingHappinessPage;