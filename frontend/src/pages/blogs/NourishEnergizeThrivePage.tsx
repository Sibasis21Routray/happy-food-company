import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { easeInOut } from "framer-motion";
import YouMayLike from "../../components/blogs/YouMayLike";

const NourishEnergizeThrivePage: React.FC = () => {
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

  const sectionVariants = {
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
                WELLNESS
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight"
              >
                Nourish, Energize, Thrive: The Happy Bar Way
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
                  May 18, 2024
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} strokeWidth={1.5} />
                  6 min read
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
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/nourish-energize-thrive.webp"
              alt="Nourish, Energize, Thrive"
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
              "In the tapestry of modern life, where every thread intertwines with the pursuit of wellness, 
              we find ourselves on a journey that is as unique as it is universal."
            </p>
          </motion.div>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            It's a journey that takes us through the bustling avenues of daily routines, past the crossroads 
            of countless choices, and along the tranquil paths of self-care. At the heart of this journey lies 
            the quest for balance—a harmony of body, mind, and spirit that we strive to achieve amidst the 
            cacophony of the world around us.
          </motion.p>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Enter Happy Bars, the quintessential natural protein energy bars for the discerning palate and the 
            health-conscious soul. Crafted for those who navigate the vibrant mosaic of modern living with intention, 
            Happy Bars are more than just a treat; they are a testament to the belief that what we eat should fuel us, 
            delight us, and bring us closer to the equilibrium we seek.
          </motion.p>

          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-8">
            With every bite, Happy Bars offer a moment of respite, a taste of serenity, and a nourishing embrace 
            for the body. They stand as a beacon for those who are mindful of their nutrition, who understand that 
            every ingredient holds the power to contribute to their well-being.
          </motion.p>

          {/* Highlight Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="bg-gray-50 p-6 my-8 border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              <span className="font-medium text-gray-800">Did You Know?</span> Whether you choose almond energy bars, 
              cranberry energy bars, or cashew protein bars, Happy Bars are the accessible indulgence that brings 
              us one step closer to the wellness we desire.
            </p>
          </motion.div>

          {/* Section: Daylong Delight */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            Daylong Delight: A Happy Bar Journey
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-4">
            The dawn's light greets you, heralding a day full of potential. In the calm of your kitchen, you assemble 
            a nourishing breakfast: Greek yogurt, fresh berries, and a crunchy almond Happy Bar. This combination of 
            protein and fiber is the ideal start to your day.
          </motion.p>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-4">
            By mid-morning, hunger nudges you. You effortlessly choose a raisin Happy Bar, its natural sweetness and 
            antioxidants keeping you sharp and energized.
          </motion.p>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-4">
            Lunch is a feast for the senses—a medley of greens and grilled chicken, complemented by a cranberry 
            Happy Bar. Its vibrant flavor and energy-boosting qualities keep you feeling full and agile.
          </motion.p>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-4">
            As the afternoon wanes, a cashew Happy Bar is your chosen snack, its creamy texture and rich flavor 
            providing the stamina to end your day strong.
          </motion.p>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-8">
            In the evening's tranquility, a natural Happy Bar serves as a guilt-free dessert, its dates and jaggery 
            offering just the right touch of sweetness. Reflecting on your day, you appreciate how Happy Bars have 
            seamlessly supported your health and well-being.
          </motion.p>

          {/* Section: Happy Bars and Fitness */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            Happy Bars and Fitness: A Nutritional Symphony for Active Lifestyles
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-6">
            Whether you're unrolling your yoga mat, lacing up your running shoes, or gearing up for a gym session, 
            Happy Bars are the ideal natural protein energy bars to complement your fitness routine. These 100% natural 
            energy bars are designed to meet the demands of your active lifestyle, providing sustained energy, muscle 
            repair, and recovery support.
          </motion.p>

          {/* Sub-sections with left border */}
          <div className="space-y-6 mt-6">
            {[
              { title: "Carbohydrates: The Foundation of Fitness Fuel", desc: "As the primary source of energy during moderate to high-intensity exercise, carbohydrates are crucial. Happy Bars, with their natural ingredients like dates and jaggery, offer a healthy dose of carbohydrates. These natural energy bars are perfect for storing glycogen in muscles, ensuring that you have a readily available fuel source for physical activities like yoga, running, or weightlifting." },
              { title: "Proteins: The Building Blocks of Muscle", desc: "Proteins are essential for muscle repair and growth, especially after a strenuous workout. Derived from nuts like almonds and cashews, the protein in Happy Bars helps heal the micro-tears that occur during exercise. Whether you're looking for protein bars for fitness or protein bars for health, Happy Bars provide a convenient source of protein to kickstart the recovery process." },
              { title: "Fats: The Endurance Energy Source", desc: "The healthy fats found in ingredients like nuts and seeds in Happy Bars provide a sustained source of energy. This is particularly beneficial during longer, endurance-based activities. These fats also aid in the absorption of fat-soluble vitamins, which are vital for overall health and can aid in recovery." },
              { title: "Micronutrients: The Recovery Assistants", desc: "Vitamins and minerals are essential for recovery from training. They help reduce inflammation, promote healing, and may reduce the risk of injuries. Happy Bars, with their natural ingredients, provide a range of these micronutrients that support the body's recovery process." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                transition={{ delay: idx * 0.05 }}
                className="border-l-2 border-gray-100 pl-5 py-2"
              >
                <h3 className="text-lg font-light text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Section: Yoga, Running, and Gym Workouts */}
          <motion.h2 variants={paragraphVariants} className="text-2xl font-light text-gray-800 mt-10 mb-4">
            Yoga, Running, and Gym Workouts: The Happy Bar Advantage
          </motion.h2>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-4">
            For yoga practitioners, the balanced energy and nutritional support from Happy Bars can help maintain 
            focus and flexibility throughout the practice. For runners, the quick-release energy from the natural 
            sugars and the protein for muscle recovery make Happy Bars an excellent post-run snack.
          </motion.p>
          <motion.p variants={paragraphVariants} className="text-gray-600 text-base leading-relaxed mb-8">
            And for those in the gym, the protein supports muscle synthesis, and the carbs help replenish glycogen 
            stores after a lifting session. In summary, Happy Bars are a valuable addition to any fitness enthusiast's 
            diet, providing the necessary nutrients to support physical activity and aid in recovery.
          </motion.p>

          {/* Callout Box */}
          <motion.div 
            variants={paragraphVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 p-6 my-8 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300"
          >
            <p className="text-gray-600 text-base font-light italic">
              "So consider making Happy Bars a part of your routine and experience the difference yourself!"
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
                "Happy Bars provide balanced nutrition for all-day energy and wellness",
                "Perfect for pre and post-workout nutrition with natural carbohydrates and protein",
                "Supports active lifestyles from yoga to high-intensity training"
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
            to="/blog/fueling-your-day-with-happy-bars"
            className="group flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Previous Article
          </Link>
          <Link
            to="/blog/unwrapping-happiness-ingredients"
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

export default NourishEnergizeThrivePage;