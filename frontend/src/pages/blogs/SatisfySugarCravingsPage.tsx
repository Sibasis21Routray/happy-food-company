import React from "react";
import { motion, cubicBezier } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import YouMayLike from "../../components/blogs/YouMayLike";

export const SatisfySugarCravingsPage: React.FC = () => {
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

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
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
              {/* Category Badge with Animation */}
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-xs tracking-[0.2em] text-gray-300 mb-4"
              >
                NUTRITION
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight"
              >
                Satisfy your Sugar Cravings Naturally
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
                  June 1, 2024
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} strokeWidth={1.5} />
                  5 min read
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-3xl pb-20">
        
        {/* Feature Image with Animation */}
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 -mt-8"
        >
          <div className="bg-gray-50 overflow-hidden shadow-sm mt-10">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/craving-control-400x250.webp"
              alt="Cravings Control"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.article 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="prose prose-gray max-w-none"
        >
          {/* Intro Quote */}
          <motion.div variants={paragraphVariants} className="border-l-2 border-gray-300 pl-6 mb-8">
            <p className="text-gray-500 text-lg font-light italic leading-relaxed">
              "In the vibrant landscape of modern nutrition, the quest for energy bars low in sugar 
              and natural protein bars becomes paramount."
            </p>
          </motion.div>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            <Link to="/" className="text-gray-800 hover:text-gray-600 transition-colors font-medium">
              The Happy Food Company
            </Link>{" "}
            has risen to the challenge, crafting Happy Bars—the epitome of 100% natural energy bars 
            that cater to our innate cravings without the health drawbacks associated with excessive sugar intake.
          </motion.p>

          {/* Section 1 */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            The Cravings of Sugar and the Problems That Come With It
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Our brains are wired to seek out sugar, triggering a release of dopamine that can lead 
            to a cycle of cravings and overeating. This pursuit of sweetness, if left unchecked, 
            can spiral into sugar addiction, with dire health consequences like diabetes and heart disease. 
            The Happy Food Company recognizes these pitfalls and has mindfully created Happy Bars as a 
            solution—a natural protein energy bar that satisfies without the risks.
          </motion.p>

          {/* Section 2 */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            Understanding the Sugar Trap
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            The allure of sugar is undeniable. It activates our brain's reward system, releasing 
            feel-good chemicals such as dopamine. This response makes our desire for sugar grow stronger, 
            potentially leading to sugar addiction and an overeating habit. Happy Bars break this cycle 
            by offering a naturally sweetened alternative that satisfies cravings without the addictive 
            properties of refined sugar.
          </motion.p>

          {/* Highlight Box with Animation */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="bg-gray-50 p-6 my-8 border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-sm font-light leading-relaxed"
            >
              <span className="font-medium text-gray-800">Did You Know?</span> Studies show that replacing 
              refined sugar with natural alternatives like jaggery can help maintain stable blood sugar 
              levels while still satisfying your sweet tooth.
            </motion.p>
          </motion.div>

          {/* Section 3 */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            Happy Bar: The Perfect Wholesome Snacking Partner
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Happy Bars are made with a focus on natural sweetness, avoiding artificial sweeteners 
            and added sugars. Our key ingredients include jaggery, a traditional, unrefined sugar that 
            is made from sugar cane juice, rich in minerals, bringing a warm, caramel-like sweetness 
            to the bars. Combined with nuts like cashews, almonds, and dried fruits like raisins and 
            cranberries, each bar provides a balanced mix of protein, healthy fats, and complex carbohydrates.
          </motion.p>

          {/* Section 4 */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            The Health Benefits of Choosing Happy Bars
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            By choosing Happy Bars over conventional sugary snacks, you're not just avoiding empty 
            calories—you're actively nourishing your body. The natural ingredients support sustained 
            energy release, help maintain stable blood sugar levels, and provide essential nutrients 
            that refined sugar snacks lack.
          </motion.p>

          {/* Section 5 */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            Making the Switch to Natural Sweetness
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Transitioning away from refined sugar doesn't mean sacrificing flavor. Happy Bars prove 
            that natural ingredients can create delicious, satisfying snacks that your body will thank 
            you for. Start by replacing one sugary snack per day with a Happy Bar, and you'll notice 
            improved energy levels, fewer cravings, and better overall health.
          </motion.p>

          {/* Key Takeaways with Animation */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ y: -2 }}
            className="border-t border-gray-100 mt-10 pt-8"
          >
            <h3 className="text-lg font-light text-gray-800 mb-4">Key Takeaways</h3>
            <ul className="space-y-2">
              {[
                "Natural sweeteners like jaggery provide healthier alternatives to refined sugar",
                "Happy Bars combine protein, healthy fats, and complex carbohydrates for sustained energy",
                "Choosing natural snacks helps maintain stable blood sugar levels"
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
            to="/blog/unwrapping-happiness-ingredients"
            className="group flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Previous Article
          </Link>
          <Link
            to="/blog/fueling-your-day-with-happy-bars"
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