import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { ShopNowSection } from '../components/ShopNowSection';

const SectionHeader = ({
  title,
  color = "text-gray-800",
}: {
  title: string;
  color?: string;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className={`text-center font-bold text-3xl md:text-4xl mb-4 px-4 ${color} tracking-tight`}
    >
      {title}
    </motion.h2>
  );
};

type ProductData = {
  titleLines: string[];
  titleColor: string;
  img: string;
  pitchTitle: string;
  pitchTitleColor: string;
  pitchDesc: string;
  pitchDescColor: string;
  waveColor1: string;
  waveColor2: string;
  featuresBg: string;
  featuresTitleColor: string;
  ingredientsBg: string;
  ingredientsBgHex: string;
  ingredientsHeaderColor: string;
  ingredientsCardBg: string;
  ingredientsCardTitleColor: string;
  ingredientsCardDescColor: string;
  mascots: { id: string; name: string; desc: string; img: string }[];
};

const productLibrary: Record<string, ProductData> = {
  'cashew-raisin': {
    titleLines: ['Cashew', 'Raisin'],
    titleColor: 'text-[#36316b]',
    img: '/images/cashew-raisin.png',
    pitchTitle: 'Energize your Enjoyment!',
    pitchTitleColor: 'text-[#76649d]',
    pitchDesc: "Looking for a snack that's both a taste sensation and a powerhouse of goodness? Dive into our Protein Power Fusion – an extraordinary energy bar that brings together the dynamic duo of cashews and raisins!",
    pitchDescColor: 'text-[#413c70]',
    waveColor1: '#928abf',
    waveColor2: '#3c3c72',
    featuresBg: 'bg-[#3c3c72]',
    featuresTitleColor: 'text-[#fb8a3b]',
    ingredientsBg: 'bg-gray-50',
    ingredientsBgHex: '#f9fafb',
    ingredientsHeaderColor: 'text-gray-800',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-gray-800',
    ingredientsCardDescColor: 'text-gray-500',
    mascots: [
      { id: 'cashew', name: 'Cashew Carnival', desc: 'Join the cashew carnival for a nutty joyride, as cashews bring a crunch of happiness, healthy fats, and protein, supporting a cheerful mood and a satisfied tummy.', img: '/images/mascot-cashew.png' },
      { id: 'raisin', name: 'Raisin Radiance', desc: 'Embark on a sweet rendezvous with raisins, delivering a chewy burst of natural sweetness and antioxidants, adding a bounce of energy to your day.', img: '/images/mascot-raisin.png' },
      { id: 'peanut', name: 'Peanut Party', desc: 'Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.', img: '/images/mascot-peanut.png' },
      { id: 'jaggery', name: 'Jaggery Jive', desc: 'Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.', img: '/images/mascot-jaggery.png' }
    ]
  },
  'coconut-almond': {
    titleLines: ['Coconut', 'Almond'],
    titleColor: 'text-[#d65f4c]',
    img: '/images/coconut-almond.png',
    pitchTitle: 'Spark your snacking!',
    pitchTitleColor: 'text-[#e6755a]',
    pitchDesc: "In the quest for a snack that's a burst of flavors and a nutritional powerhouse, meet our Protein Snack Fiesta! This remarkable energy bar seamlessly blends the dynamic duo of coconuts and almonds for a snacking experience like no other!",
    pitchDescColor: 'text-[#ad301b]',
    waveColor1: '#e2ac97',
    waveColor2: '#cc4b34',
    featuresBg: 'bg-[#cc4b34]',
    featuresTitleColor: 'text-[#4c2415]',
    ingredientsBg: 'bg-gray-50',
    ingredientsBgHex: '#f9fafb',
    ingredientsHeaderColor: 'text-gray-800',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-gray-800',
    ingredientsCardDescColor: 'text-gray-500',
    mascots: [
      { id: 'coconut', name: 'Coconut Craze', desc: 'Ride the wave of coconut craze, as coconuts add an exotic twist with their creamy texture and tropical flavor, making your snacking escapade a delightful and refreshing experience.', img: '/images/mascot-coconut.png' },
      { id: 'almond', name: 'Almond Adventure', desc: 'Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.', img: '/images/mascot-almond.png' },
      { id: 'peanut', name: 'Peanut Party', desc: 'Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.', img: '/images/mascot-peanut.png' },
      { id: 'jaggery', name: 'Jaggery Jive', desc: 'Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.', img: '/images/mascot-jaggery.png' }
    ]
  },
  'date-almond-cranberry': {
    titleLines: ['Date', 'Almond', 'Cranberry'],
    titleColor: 'text-[#9b1d20]',
    img: '/images/date-almond-cranberry.png',
    pitchTitle: 'Fuel your Fun!',
    pitchTitleColor: 'text-[#e63946]',
    pitchDesc: "Looking for a snack that's as exciting as it is energizing? Dive into our Protein Power Play – an irresistible energy bar loaded with the goodness of dates, almonds, and cranberries!",
    pitchDescColor: 'text-[#7a181b]',
    waveColor1: '#d66853',
    waveColor2: '#7a181b',
    featuresBg: 'bg-[#7a181b]',
    featuresTitleColor: 'text-[#fb8a3b]',
    ingredientsBg: 'bg-gray-50',
    ingredientsBgHex: '#f9fafb',
    ingredientsHeaderColor: 'text-gray-800',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-gray-800',
    ingredientsCardDescColor: 'text-gray-500',
    mascots: [
      { id: 'date', name: 'Date Delight', desc: 'Indulge in a date delight, as the sweet and chewy dates bring fiber, iron, and essential minerals to the table, ensuring a delightful snacking experience that\'s as nutritious as it is tasty.', img: '/images/mascot-date.png' },
      { id: 'almond', name: 'Almond Adventure', desc: 'Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.', img: '/images/mascot-almond.png' },
      { id: 'cranberry', name: 'Cranberry Carnival', desc: 'Join the cranberry carnival, savoring the zesty sweetness and antioxidants that cranberries bring, providing a burst of flavor and immune-boosting benefits to your snacking fiesta.', img: '/images/mascot-cranberry.png' },
      { id: 'peanut', name: 'Peanut Party', desc: 'Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.', img: '/images/mascot-peanut.png' }
    ]
  },
  'almond-cranberry': {
    titleLines: ['Almond', 'Cranberry'],
    titleColor: 'text-[#6a3093]',
    img: '/images/almond-cranberry.png',
    pitchTitle: 'Unleash the Awesome!',
    pitchTitleColor: 'text-[#a044ff]',
    pitchDesc: "Are you ready for a taste explosion that's as good for your taste buds as it is for your body? Dive into our Protein Power Play – a delightful energy bar loaded with almonds, cranberries and jaggery that will make your snacking game strong!",
    pitchDescColor: 'text-[#4b0082]',
    waveColor1: '#d2b4de',
    waveColor2: '#6a3093',
    featuresBg: 'bg-[#6a3093]',
    featuresTitleColor: 'text-[#fb8a3b]',
    ingredientsBg: 'bg-gray-50',
    ingredientsBgHex: '#f9fafb',
    ingredientsHeaderColor: 'text-gray-800',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-gray-800',
    ingredientsCardDescColor: 'text-gray-500',
    mascots: [
      { id: 'almond', name: 'Almond Adventure', desc: 'Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.', img: '/images/mascot-almond.png' },
      { id: 'cranberry', name: 'Cranberry Carnival', desc: 'Join the cranberry carnival, savoring the zesty sweetness and antioxidants that cranberries bring, providing a burst of flavor and immune-boosting benefits to your snacking fiesta.', img: '/images/mascot-cranberry.png' },
      { id: 'peanut', name: 'Peanut Party', desc: 'Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.', img: '/images/mascot-peanut.png' },
      { id: 'jaggery', name: 'Jaggery Jive', desc: 'Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.', img: '/images/mascot-jaggery.png' }
    ]
  },
  'combo-6-1': {
    titleLines: ['Almond Cranberry', '+ Cashew Raisin'],
    titleColor: 'text-[#a12368]',
    img: '/images/combo-6-1.png',
    pitchTitle: 'Double the Delight!',
    pitchTitleColor: 'text-[#ff3c83]',
    pitchDesc: "Embark on a flavor-packed journey with our Combo Box featuring the dynamic duo of Almond Cranberry and Cashew Raisin. Twice the flavor, twice the fun!",
    pitchDescColor: 'text-[#1d3557]',
    waveColor1: '#ffb3c1',
    waveColor2: '#ff3c83',
    featuresBg: 'bg-[#ff3c83]',
    featuresTitleColor: 'text-white',
    ingredientsBg: 'bg-gray-50',
    ingredientsBgHex: '#f9fafb',
    ingredientsHeaderColor: 'text-gray-800',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-gray-800',
    ingredientsCardDescColor: 'text-gray-500',
    mascots: [
      { id: 'almond', name: 'Almond Adventure', desc: 'Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E.', img: '/images/mascot-almond.png' },
      { id: 'cranberry', name: 'Cranberry Carnival', desc: 'Join the cranberry carnival, savoring the zesty sweetness and antioxidants that cranberries bring.', img: '/images/mascot-cranberry.png' },
      { id: 'cashew', name: 'Cashew Carnival', desc: 'Join the cashew carnival for a nutty joyride, as cashews bring a crunch of happiness and protein.', img: '/images/mascot-cashew.png' },
      { id: 'raisin', name: 'Raisin Radiance', desc: 'Embark on a sweet rendezvous with raisins, delivering a chewy burst of natural sweetness.', img: '/images/mascot-raisin.png' }
    ]
  },
  'combo-6-2': {
    titleLines: ['Coconut Almond', '+ Date Almond Cranberry'],
    titleColor: 'text-[#a12368]',
    img: '/images/combo-6-2.png',
    pitchTitle: 'Tropical Escape!',
    pitchTitleColor: 'text-[#ff3c83]',
    pitchDesc: "Savor the delightful medley of flavors in our Combo Box, featuring the irresistible pairing of Coconut Almond and Date Almond Cranberry. A vacation in every bite!",
    pitchDescColor: 'text-[#1d3557]',
    waveColor1: '#ffb3c1',
    waveColor2: '#ff3c83',
    featuresBg: 'bg-[#ff3c83]',
    featuresTitleColor: 'text-white',
    ingredientsBg: 'bg-gray-50',
    ingredientsBgHex: '#f9fafb',
    ingredientsHeaderColor: 'text-gray-800',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-gray-800',
    ingredientsCardDescColor: 'text-gray-500',
    mascots: [
      { id: 'coconut', name: 'Coconut Craze', desc: 'Ride the wave of coconut craze, as coconuts add an exotic twist with their creamy texture.', img: '/images/mascot-coconut.png' },
      { id: 'almond', name: 'Almond Adventure', desc: 'Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats.', img: '/images/mascot-almond.png' },
      { id: 'date', name: 'Date Delight', desc: 'Indulge in a date delight, as the sweet and chewy dates bring fiber and essential minerals.', img: '/images/mascot-date.png' },
      { id: 'cranberry', name: 'Cranberry Carnival', desc: 'Join the cranberry carnival, savoring the zesty sweetness and antioxidants.', img: '/images/mascot-cranberry.png' }
    ]
  },
  'combo-12': {
    titleLines: ['Happy Bar', 'Combo Box of 12'],
    titleColor: 'text-[#a12368]',
    img: '/images/combo-12.png',
    pitchTitle: 'Ultimate Snacking!',
    pitchTitleColor: 'text-[#ff3c83]',
    pitchDesc: "Enjoy a snack symphony with our Combo Box featuring Almond Cranberry, Cashew Raisin, Coconut Almond, and Date Almond Cranberry. The ultimate variety pack for the ultimate snack fan!",
    pitchDescColor: 'text-[#1d3557]',
    waveColor1: '#ffb3c1',
    waveColor2: '#ff3c83',
    featuresBg: 'bg-[#ff3c83]',
    featuresTitleColor: 'text-white',
    ingredientsBg: 'bg-gray-50',
    ingredientsBgHex: '#f9fafb',
    ingredientsHeaderColor: 'text-gray-800',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-gray-800',
    ingredientsCardDescColor: 'text-gray-500',
    mascots: [
      { id: 'almond', name: 'Almond Adventure', desc: 'Embark on an almond adventure with healthy fats and crunch.', img: '/images/mascot-almond.png' },
      { id: 'cashew', name: 'Cashew Carnival', desc: 'Join the cashew carnival for happiness and protein.', img: '/images/mascot-cashew.png' },
      { id: 'coconut', name: 'Coconut Craze', desc: 'Ride the wave of coconut craze with creamy texture.', img: '/images/mascot-coconut.png' },
      { id: 'date', name: 'Date Delight', desc: 'Indulge in a date delight with fiber and minerals.', img: '/images/mascot-date.png' }
    ]
  }
};

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dbProduct, setDbProduct] = useState<any>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      if (!id) return;

      const FALLBACK_IDS: Record<string, string> = {
        'cashew-raisin': '69e0bed3ddd3678cb38d4a9f',
        'coconut-almond': '69e0bed3ddd3678cb38d4aa0',
        'date-almond-cranberry': '69e0bed3ddd3678cb38d4aa1',
        'almond-cranberry': '69e0bed3ddd3678cb38d4aa2',
        'combo-6-1': '69e0bed3ddd3678cb38d4aa3',
        'combo-6-2': '69e0bed3ddd3678cb38d4aa4',
        'combo-12': '69e0bed3ddd3678cb38d4aa5'
      };

      try {
        const prod = await api.products.getAll();
        const found = prod.find((p: any) => p.slug === id);
        
        if (found) {
          setDbProduct(found);
        } else if (FALLBACK_IDS[id]) {
          setDbProduct({
            _id: FALLBACK_IDS[id],
            slug: id,
            category: id.startsWith('combo') ? 'Combos' : 'Happy Bars',
            price: id === 'combo-12' ? 600 : 300
          });
        }
        
        const user = localStorage.getItem('user');
        if (user) {
          const wish = await api.wishlist.get();
          if (wish.wishlist) {
            setWishlist(wish.wishlist.productIds.map((p: any) => p._id || p));
          }
        }
      } catch (err) {
        console.error(err);
        if (FALLBACK_IDS[id]) {
          setDbProduct({
            _id: FALLBACK_IDS[id],
            slug: id,
            category: id.startsWith('combo') ? 'Combos' : 'Happy Bars',
            price: id === 'combo-12' ? 600 : 300
          });
        }
      }
    };
    fetchData();
  }, [id]);

  const handleAddToWishlist = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    if (!dbProduct) return;
    try {
      if (wishlist.includes(dbProduct._id)) {
        await api.wishlist.remove(dbProduct._id);
        setWishlist(prev => prev.filter(wid => wid !== dbProduct._id));
      } else {
        await api.wishlist.add(dbProduct._id);
        setWishlist(prev => [...prev, dbProduct._id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    if (!dbProduct) return;
    try {
      await api.cart.add(dbProduct._id, 1);
      navigate('/cart');
    } catch (err) {
      console.error(err);
    }
  };

  const productKey = id && productLibrary[id] ? id : 'cashew-raisin';
  const data = productLibrary[productKey];

  const features = [
    { title: "Protein Packed Punch", desc: "5.x grams of protein per serving (30g) – the secret sauce for muscle magic and all-day energy!", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/energy-bar_7634814.png" },
    { title: "All-Natural Awesomeness", desc: "Crafted with love with the best ingredients. No funny business – just natural goodness!", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/lotus_2610118.png" },
    { title: "Price Tag Happiness", desc: "All this awesomeness for just ₹ 40! That's right – a pocket-friendly protein party for everyone!", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/rupee-symbol.png" },
    { title: "No Artificial Shenanigans", desc: "Wave goodbye to artificial preservatives, flavors, or colorings. Our bar keeps it real – just like your snacking standards!", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/no-preservatives_4411195.png" },
    { title: "Veggie Vibes Only", desc: "Vegetarian? We got you covered! No eggs, just pure plant power for your snacking pleasure.", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/leaf.png" },
    { title: "Say No to Sneaky Sugars", desc: "Zero glucose, emulsifiers, fructooligosaccharides (FOS) & other funny sounding chemicals. Nothing Sneaky & Zero Nonsense!", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/sugar-free.png" }
  ];

  const isCombo = id && id.startsWith('combo');

  return (
    <div className="w-full font-sans bg-white overflow-hidden pt-20 sm:pt-24">
      {/* 1. Hero Product Summary Section */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`hero-${productKey}`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.4 }}
          className="relative z-10 pt-8 sm:pt-12 md:pt-24 bg-gradient-to-b from-blue-50 to-white" 
        >
          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-[1200px]">
            <div className="flex flex-col items-center">
              
              {/* Image and Title - Responsive Layout */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16 mb-10 md:mb-16 w-full">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ type: "spring", stiffness: 70, damping: 15 }}
                  className="w-full lg:w-1/2 flex justify-center"
                >
                  <img 
                    src={data.img} 
                    alt={data.titleLines.join(' ')} 
                    className="w-[250px] sm:w-[300px] md:w-[380px] lg:w-[420px] drop-shadow-xl hover:scale-105 transition-transform duration-500" 
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.1 }}
                  className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
                >
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${data.titleColor}`}>
                    Happy Bar
                  </h1>
                  {data.titleLines.map((line, idx) => (
                    <h2 key={idx} className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${data.titleColor}`}>
                      {line}
                    </h2>
                  ))}
                </motion.div>
              </div>

              {/* Buy Now Button - Only for Combos */}
              {isCombo && dbProduct && (
                <div className="flex items-center gap-4 sm:gap-6 mt-2 mb-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="bg-orange-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full shadow-lg tracking-wide text-sm sm:text-base hover:bg-orange-600 flex items-center gap-2 sm:gap-3 transition-all"
                  >
                    <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                    BUY NOW - ₹{dbProduct.price}
                  </motion.button>

                  <button
                    onClick={handleAddToWishlist}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400 hover:scale-110 transition-all border border-gray-200"
                  >
                    <Heart 
                      size={20} 
                      className={`sm:w-5 sm:h-5 ${(dbProduct && wishlist.includes(dbProduct._id)) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </button>
                </div>
              )}
              
              {/* Descriptive Pitch */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }} 
                className="text-center mt-8 md:mt-12 lg:mt-16 max-w-4xl px-4 z-20 relative"
              >
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 ${data.pitchTitleColor}`}>
                  {data.pitchTitle}
                </h3>
                <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${data.pitchDescColor}`}>
                  {data.pitchDesc}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Wave */}
          <div className="w-full mt-[-40px] sm:mt-[-60px] md:mt-[-80px] pointer-events-none relative z-10">
            <svg viewBox="0 0 1440 250" className="w-full h-auto" preserveAspectRatio="none">
              <path fill={data.waveColor1} fillOpacity="0.3" d="M0,150 C360,250 1080,50 1440,150 L1440,250 L0,250 Z"></path>
              <path fill={data.waveColor2} d="M0,200 C480,300 960,100 1440,200 L1440,250 L0,250 Z"></path>
            </svg>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 2. Features Section - Clean Professional */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`features-${productKey}`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.4 }}
          className={`${data.featuresBg} py-16 sm:py-20 md:py-24 relative z-0 transition-colors duration-500`}
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className={`${data.featuresTitleColor} text-2xl sm:text-3xl md:text-4xl font-bold mb-4`}>
                Why Choose Us
              </h2>
              <div className="w-20 h-1 bg-orange-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((f, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <img src={f.img} alt={f.title} className="w-8 h-8 object-contain brightness-0 invert" />
                  </div>
                  <h3 className={`${data.featuresTitleColor} font-bold text-lg mb-2`}>{f.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 3. Mascots Section - Clean Professional */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`ingredients-${productKey}`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.4 }}
          className="py-16 sm:py-20 md:py-24 bg-gray-50 relative z-10"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
            <div className="text-center mb-12">
              <h2 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                The Goodness of Awesome Ingredients
              </h2>
              <div className="w-20 h-1 bg-orange-400 mx-auto rounded-full"></div>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Pure, natural, and carefully selected ingredients for your happiness
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {data.mascots.map((mascot, i) => (
                <motion.div 
                  key={mascot.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: i * 0.1 }} 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center overflow-hidden">
                    <img src={mascot.img} alt={mascot.name} className="w-20 h-20 object-contain" />
                  </div>
                  <h3 className="text-gray-800 font-bold text-base mb-2">{mascot.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{mascot.desc.substring(0, 100)}...</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 4. Combos Wave & Shop Section */}
      <ShopNowSection />
    </div>
  );
};