import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import YouMayLike from "../../components/blogs/YouMayLike";

const HappyBarsParentsKidsPage: React.FC = () => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
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
                FAMILY
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight"
              >
                Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go
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
                  April 27, 2024
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
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/whats-in-the-bag.webp"
              alt="Parents and Kids Snacking"
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
              "In the whirlwind of modern family life, finding nutritious snacks that are both convenient 
              and tasty can feel like an uphill battle."
            </p>
          </motion.div>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Parents juggle multiple responsibilities, often on-the-go, while ensuring their children stay 
            fueled and satisfied throughout the day. That's where energy bars come in – specifically,{' '}
            <Link to="/" className="text-gray-800 hover:text-gray-600 transition-colors font-medium">
              The Happy Food Company
            </Link>
            's delightful Happy Bars. These protein-packed, all-natural energy bars are a game-changer for 
            busy families seeking wholesome snack options that deliver on both nutrition and convenience.
          </motion.p>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            The Snack Dilemma
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            In today's fast-paced world, convenience often trumps nutrition when it comes to snack choices. 
            However, parents understand the importance of providing their children with foods that nourish 
            their growing bodies. That's why finding energy bars like Happy Bars, which are not only 
            convenient but also packed with wholesome ingredients, is a win-win solution for busy families 
            striving to maintain a healthy lifestyle.
          </motion.p>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Introducing Happy Bars
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Happy Bars are not your average energy bars – they're a cut above the rest. Made with a carefully 
            crafted blend of high-quality ingredients, including cashews, raisins, almonds, and cranberries, 
            these protein energy bars offer a burst of flavor with every bite. What's more, they're 100% natural, 
            free from artificial additives and preservatives, making them a guilt-free snack option for both 
            kids and adults alike.
          </motion.p>

          {/* Highlight Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="bg-gray-50 p-6 my-8 border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              <span className="font-medium text-gray-800">Did You Know?</span> Happy Bars provide essential 
              nutrients to fuel your children's busy days while being low in sugar and free from artificial 
              additives.
            </p>
          </motion.div>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Nutritional Benefits for Parents and Kids
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Parents can feel confident knowing that Happy Bars provide essential nutrients to fuel their 
            children's busy days. Packed with protein, fiber, and natural sugars from fruits, these energy 
            bars offer sustained energy without the crash associated with sugary snacks. Plus, they're low 
            in sugar, making them a smart choice for parents looking to support their children's health and 
            well-being.
          </motion.p>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Convenience On-The-Go
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Whether rushing to school in the morning or shuttling between extracurricular activities in the 
            afternoon, Happy Bars are the ultimate grab-and-go snack for busy families. Their compact size 
            and convenient packaging make them easy to stash in backpacks, purses, or gym bags, ensuring that 
            nutritious fuel is always within reach, no matter where the day takes you.
          </motion.p>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Kid-Approved Favorites
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Don't just take our word for it – kids love Happy Bars too! With mouthwatering flavors like 
            cashew, raisin, almond, and cranberry, these natural protein bars are sure to please even the 
            pickiest of eaters. Parents can feel good about offering their children a snack that not only 
            tastes great but also provides the essential nutrients they need to thrive.
          </motion.p>

          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-8 mb-4">
            Making Healthier Choices Together
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            By choosing Happy Bars as your family's go-to snack, you're not only nourishing your bodies but 
            also instilling healthy eating habits that will last a lifetime. With options like these natural 
            protein bars, you can feel good about fueling your family's adventures, one delicious bite at a time.
          </motion.p>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            In the quest for nutritious snacks for busy families, Happy Bars stand out as a shining example 
            of convenience, taste, and wholesome ingredients. From their all-natural formulation to their 
            kid-approved flavors, these protein energy bars are a must-have for parents looking to simplify 
            snack time without compromising on nutrition.
          </motion.p>

          {/* Callout Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 p-6 my-8 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-base font-light italic">
              "Join the happy snacking revolution and fuel your family's adventures with Happy Bars!"
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
                "Happy Bars are 100% natural with no artificial additives or preservatives",
                "Packed with protein and fiber for sustained energy throughout the day",
                "Kid-approved flavors that parents can feel good about"
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
            to="/blog/fueling-your-workouts-with-happy-bars"
            className="group flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Previous Article
          </Link>
          <Link
            to="/blog/fuel-wellbeing-happy-bars"
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

export default HappyBarsParentsKidsPage;