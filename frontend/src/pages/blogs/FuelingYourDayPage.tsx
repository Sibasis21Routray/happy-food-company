import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import YouMayLike from "../../components/blogs/YouMayLike";
import { easeInOut } from "framer-motion";

const FuelingYourDayPage: React.FC = () => {
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

  const varietyVariants = {
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
                NUTRITION
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight"
              >
                Fueling Your Day with Happy Bars: A Nutrient Powerhouse
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
                  May 11, 2024
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
        
        {/* Feature Image */}
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 -mt-8"
        >
          <div className="bg-gray-50 overflow-hidden shadow-sm">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/my-daily-fix.webp"
              alt="Fueling Your Day"
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
          <motion.div className="border-l-2 border-gray-300 pl-6 mb-8">
            <p className="text-gray-500 text-lg font-light italic leading-relaxed">
              "When it comes to nourishing our bodies, the right balance of nutrients is essential. 
              Enter Happy Bars, the delightful energy bars that pack a punch in terms of protein, 
              carbohydrates, and fiber."
            </p>
          </motion.div>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-6 mb-4">
            Protein: The Building Blocks
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Protein is like the construction crew for your body. It repairs tissues, builds muscles, 
            and supports immune function. Happy Bars are more than just a snack; they're protein energy bars! 
            With a blend of wholesome{' '}
            <Link to="/ingredients" className="text-gray-800 hover:text-gray-600 transition-colors font-medium">
              ingredients
            </Link>, 
            including cashews, raisins, almonds, and cranberries, these bars provide a steady supply of 
            amino acids. Whether you're hitting the gym or simply need an energy boost during a hectic day, 
            the protein in Happy Bars has your back.
          </motion.p>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Carbohydrates: Your Energy Reservoir
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Carbs are the fuel that keeps your engine running. They're not the enemy! Happy Bars contain 
            wholesome carbohydrates that release energy gradually. Say goodbye to sugar crashes and hello 
            to sustained vitality. Whether you're conquering a workday or chasing after little ones, 
            Happy Bars provide the right kind of carbs. Plus, they're low in sugar, making them an excellent 
            choice for health-conscious individuals.
          </motion.p>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Fiber: The Digestive Hero
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Fiber might not be the life of the party, but it's essential for gut health. Happy Bars sneak 
            in a good dose of dietary fiber, promoting regular digestion and keeping your tummy happy. 
            Plus, it helps control blood sugar levels and keeps you feeling full longer. Win-win!
          </motion.p>

          {/* Highlight Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="bg-gray-50 p-6 my-8 border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              <span className="font-medium text-gray-800">Did You Know?</span> Happy Bars strike the perfect 
              balance between protein, carbs, and fiber, making them an ideal snack for any time of day.
            </p>
          </motion.div>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Why Choose Happy Bars?
          </motion.h2>
          <ul className="space-y-2 mb-8">
            {[
              "Balanced Goodness: Happy Bars strike the perfect balance between protein, carbs, and fiber.",
              "Deliciously Nutritious: Who says healthy can't be tasty? Happy Bars prove otherwise.",
              "100% Natural: These bars are made from all-natural ingredients, free from artificial additives.",
              "Fitness Fuel: Whether you're an athlete or a fitness enthusiast, Happy Bars are your go-to energy source.",
              "Supporting Health Goals: With low sugar content, they're ideal for those watching their diet."
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-2 text-gray-500 text-sm"
              >
                <span className="text-gray-400 mt-0.5">•</span>
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Happy Bars Varieties: A Flavorful Journey
          </motion.h2>
          
          {/* Varieties with left border styling */}
          <div className="space-y-4 mb-8">
            {[
              { name: "Cashew Energy Bars", desc: "Packed with creamy cashews, these bars provide sustained energy for your busy day. The natural sweetness of cashews complements the overall flavor profile." },
              { name: "Raisin Protein Bars", desc: "Juicy raisins meet protein power! These bars combine the goodness of dried grapes with the muscle-building benefits of protein." },
              { name: "Almond Energy Bars", desc: "Almonds, the unsung heroes of snacking, take center stage in these bars. They're rich in healthy fats and provide a satisfying crunch." },
              { name: "Cranberry Protein Bars", desc: "Tart cranberries meet protein perfection. These bars balance tanginess with the essential amino acids your body craves." }
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
                <h3 className="text-lg font-light text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Happy Bars for Every Lifestyle
          </motion.h2>
          <ul className="space-y-2 mb-8">
            {[
              "For Fitness Enthusiasts: Whether you're hitting the gym, going for a run, or practicing yoga, Happy Bars fuel your workouts without compromising on taste.",
              "For Health-Conscious Individuals: Watching your sugar intake? Happy Bars are your guilt-free companions.",
              "For Busy Professionals: Need a quick pick-me-up during a hectic workday? Grab a Happy Bar and keep productivity soaring."
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-2 text-gray-500 text-sm"
              >
                <span className="text-gray-400 mt-0.5">•</span>
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            The Happy Food Company's Mission
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Every Happy Bar you enjoy is 100% natural energy protein bars for diet. Share the love, spread 
            the word, and let's make nutrition accessible to all!
          </motion.p>

          {/* Callout Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 p-6 my-8 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-base font-light italic">
              "Stay happy, stay healthy! Remember, it's not just a snack; it's a step toward a healthier world."
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
                "Happy Bars provide balanced nutrition with protein, carbs, and fiber",
                "Made with 100% natural ingredients, no artificial additives",
                "Perfect for fitness enthusiasts, health-conscious individuals, and busy professionals"
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
            to="/blog/fuel-wellbeing-happy-bars"
            className="group flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Previous Article
          </Link>
          <Link
            to="/blog/nourish-energize-thrive"
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

export default FuelingYourDayPage;