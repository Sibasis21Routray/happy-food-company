import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ========== PREMIUM COMPONENTS ==========

// Premium Section Header
const SectionHeader = ({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-sm font-light tracking-wide"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 40 } : { width: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-px bg-gray-300 rounded-full mx-auto mt-6"
      />
    </div>
  );
};

// Product Slider Component (Integrated with Hero)
const ProductSlider = ({ products }: { products: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
      },
    }),
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Watermark */}
      <div className=" flex items-center justify-center pointer-events-none z-0">
        <div className="text-start">
          <span className="text-[50px] md:text-[80px] lg:text-[120px] font-light text-gray-200 select-none tracking-[-0.02em]">
            Happy Bar
          </span>
        </div>
      </div>

      <div 
        className="relative z-10"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Slider Content */}
        <div className="relative overflow-hidden bg-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={currentProduct.img}
                    alt={currentProduct.name}
                    className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Section */}
            <div className="p-2 md:p-20  flex flex-col justify-center bg-white">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-8"
                >
                  <div>
                    <p className="text-xs tracking-[0.2em] text-gray-400 mb-4">PREMIUM PROTEIN BAR</p>
                    <div className="w-12 h-px bg-gray-300" />
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900">
                    {currentProduct.name}
                  </h1>
                  
                  <p className="text-gray-500 leading-relaxed text-base font-light max-w-lg">
                    {currentProduct.desc}
                  </p>
                  
                  <div className="flex gap-8 pt-4">
                    <div>
                      <div className="text-2xl font-light text-gray-900">5g</div>
                      <div className="text-xs text-gray-400 tracking-wide">PROTEIN</div>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div>
                      <div className="text-2xl font-light text-gray-900">100%</div>
                      <div className="text-xs text-gray-400 tracking-wide">NATURAL</div>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div>
                      <div className="text-2xl font-light text-gray-900">₹{currentProduct.price}</div>
                      <div className="text-xs text-gray-400 tracking-wide">PER BAR</div>
                    </div>
                  </div>
                  
                  <Link to={`/product/${currentProduct.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 px-10 py-4 bg-gray-900 text-white text-sm font-light tracking-[0.2em] hover:bg-gray-800 transition-all duration-300"
                    >
                      DISCOVER
                    </motion.button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-1 md:left-6 md:top-1/2 top-[20vh] -translate-y-1/2 w-12 h-12 bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center rounded-full z-20"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-1 md:right-6 md:top-1/2 top-[20vh] -translate-y-1/2 w-12 h-12 bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center rounded-full z-20"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-8 relative z-10">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 h-px bg-gray-800"
                  : "w-4 h-px bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Feature Card
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          <img 
            src={feature.img} 
            alt={feature.title} 
            className="w-14 h-14 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
          />
        </div>
        <h3 className="font-light text-gray-800 text-base mb-2 tracking-wide">{feature.title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed font-light max-w-xs mx-auto">{feature.desc}</p>
      </div>
    </motion.div>
  );
};

// Ingredient Card
const IngredientCard = ({ ingredient, index }: { ingredient: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.02 }}
      className="text-center"
    >
      <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
        <img 
          src={ingredient.img} 
          alt={ingredient.title} 
          className="w-16 h-16 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" 
        />
      </div>
      <p className="font-light text-gray-600 text-sm tracking-wide">{ingredient.title}</p>
    </motion.div>
  );
};

// Combo Card
const ComboCard = ({ combo, index }: { combo: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white p-8 text-center border border-gray-100 hover:border-gray-200 transition-all duration-300">
        <div className="w-40 h-40 mx-auto mb-6">
          <img src={combo.img} alt={combo.title} className="w-full h-full object-contain" />
        </div>
        
        <h3 className="text-lg font-light text-gray-900 mb-1 tracking-wide">{combo.title}</h3>
        <p className="text-xs text-gray-400 mb-3 tracking-wide">{combo.flavors}</p>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 font-light">
          {combo.desc}
        </p>
        
        <div className="mb-4">
          <span className="text-2xl font-light text-gray-900">₹{combo.price}</span>
        </div>
        
        <Link to="/happy-shop">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 border border-gray-200 text-gray-700 text-xs font-light tracking-wider hover:border-gray-400 transition-all duration-300"
          >
            SHOP NOW
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

// Main Component
export const HomePage: React.FC = () => {
  const products = [
    {
      slug: "cashew-raisin",
      name: "Cashew Raisin",
      desc: "The dynamic duo of cashews and raisins creates a snacking sensation that's perfect for anyone seeking a convenient & mouthwatering way to power up their vibrant lifestyle.",
      img: "/images/cashew-raisin.png",
      price: "40",
    },
    {
      slug: "coconut-almond",
      name: "Coconut Almond",
      desc: "A mouthwatering medley of coconut & almonds, a dynamic duo celebrated for their nourishing prowess & mouth-watering taste, ensuring you stay fuelled & fabulous.",
      img: "/images/coconut-almond.png",
      price: "40",
    },
    {
      slug: "date-almond-cranberry",
      name: "Date Almond Cranberry",
      desc: "A harmonious blend of dates, cranberries, and almonds, a trio celebrated for their distinct flavours & wellness advantages. A satisfying pick-me-up that supports your well-being.",
      img: "/images/date-almond-cranberry.png",
      price: "40",
    },
    {
      slug: "almond-cranberry",
      name: "Almond Cranberry",
      desc: "A fusion of jaggery, cranberries, & almonds, ingredients renowned for their tastes & health benefits. A festive treat that tantalizes your taste buds while promoting your well-being.",
      img: "/images/almond-cranberry.png",
      price: "40",
    },
  ];

  const features = [
    {
      title: "PROTEIN RICH",
      desc: "5 grams of protein per serving for sustained energy",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/energy-bar_7634814.png",
    },
    {
      title: "ALL NATURAL",
      desc: "Crafted with premium ingredients, nothing artificial",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/lotus_2610118.png",
    },
    {
      title: "VEGETARIAN",
      desc: "100% plant-based goodness for everyone",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/leaf.png",
    },
    {
      title: "NO PRESERVATIVES",
      desc: "Pure and clean ingredients you can trust",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/no-preservatives_4411195.png",
    },
    {
      title: "NO ADDED SUGAR",
      desc: "Naturally sweetened with fruits and nuts",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/sugar-free.png",
    },
    {
      title: "AFFORDABLE",
      desc: "Premium quality at just ₹40 per bar",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/rupee-symbol.png",
    },
  ];

  const ingredients = [
    { title: "ALMONDS", img: "/ingredients/almond.png" },
    { title: "CRANBERRIES", img: "/ingredients/Cranberry.png" },
    { title: "CASHEWS", img: "/ingredients/cashew.png" },
    { title: "RAISINS", img: "/ingredients/raisin.png" },
    { title: "COCONUT", img: "/ingredients/Coconut Craze.png" },
    { title: "PEANUTS", img: "/ingredients/Peanut.png" },
    { title: "JAGGERY", img: "/ingredients/Jaggery.png" },
    { title: "DATES", img: "/ingredients/Date.png" },
  ];

  const combos = [
    {
      title: "STARTER",
      flavors: "2 Flavors • 6 Bars",
      desc: "Perfect introduction to our protein bars",
      img: "/images/combo-6-1.png",
      price: "240",
    },
    {
      title: "FAMILY",
      flavors: "4 Flavors • 12 Bars",
      desc: "Complete variety pack for the whole family",
      img: "/images/combo-12.png",
      price: "480",
    },
    {
      title: "TROPICAL",
      flavors: "2 Flavors • 6 Bars",
      desc: "Exotic tropical fusion of flavors",
      img: "/images/combo-6-2.png",
      price: "240",
    },
  ];

  return (
    <div className="w-full bg-white overflow-x-hidden">
      
      {/* Hero + Product Slider Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <ProductSlider products={products} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Why Choose Us"
            subtitle="Crafted with precision and care"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Pure Ingredients"
            subtitle="Simple. Natural. Honest."
          />

          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 max-w-5xl mx-auto">
            {ingredients.map((ingredient, i) => (
              <IngredientCard key={i} ingredient={ingredient} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Combo Offers Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Combo Packs"
            subtitle="Better together"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {combos.map((combo, i) => (
              <ComboCard key={i} combo={combo} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};