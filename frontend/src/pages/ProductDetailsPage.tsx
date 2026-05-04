import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { api } from '../services/api';
import { ShopNowSection } from '../components/ShopNowSection';

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
  mascots: { id: string; name: string; desc: string; img: string }[];
  ingredientsList: { title: string; img: string }[];
};

const ingredients = {
  almond: { title: "ALMONDS", img: "/ingredients/almond.png" },
  cranberry: { title: "CRANBERRIES", img: "/ingredients/Cranberry.png" },
  cashew: { title: "CASHEWS", img: "/ingredients/cashew.png" },
  raisin: { title: "RAISINS", img: "/ingredients/raisin.png" },
  coconut: { title: "COCONUT", img: "/ingredients/Coconut Craze.png" },
  peanut: { title: "PEANUTS", img: "/ingredients/Peanut.png" },
  jaggery: { title: "JAGGERY", img: "/ingredients/Jaggery.png" },
  date: { title: "DATES", img: "/ingredients/Date.png" },
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
    mascots: [
      {
        id: 'cashew',
        name: 'Cashew Carnival',
        desc: 'Join the cashew carnival for a nutty joyride, as cashews bring a crunch of happiness, healthy fats, and protein, supporting a cheerful mood and a satisfied tummy.',
        img: ingredients.cashew.img
      },
      {
        id: 'raisin',
        name: 'Raisin Radiance',
        desc: 'Embark on a sweet rendezvous with raisins, delivering a chewy burst of natural sweetness and antioxidants, adding a bounce of energy to your day.',
        img: ingredients.raisin.img
      },
      {
        id: 'peanut',
        name: 'Peanut Party',
        desc: 'Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.',
        img: ingredients.peanut.img
      },
      {
        id: 'jaggery',
        name: 'Jaggery Jive',
        desc: 'Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.',
        img: ingredients.jaggery.img
      }
    ],
    ingredientsList: [
      ingredients.cashew,
      ingredients.raisin,
      ingredients.peanut,
      ingredients.jaggery
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
    mascots: [
      {
        id: 'coconut',
        name: 'Coconut Craze',
        desc: 'Ride the wave of coconut craze, as coconuts add an exotic twist with their creamy texture and tropical flavor, making your snacking escapade a delightful and refreshing experience.',
        img: ingredients.coconut.img
      },
      {
        id: 'almond',
        name: 'Almond Adventure',
        desc: 'Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.',
        img: ingredients.almond.img
      },
      {
        id: 'peanut',
        name: 'Peanut Party',
        desc: 'Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.',
        img: ingredients.peanut.img
      },
      {
        id: 'jaggery',
        name: 'Jaggery Jive',
        desc: 'Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.',
        img: ingredients.jaggery.img
      }
    ],
    ingredientsList: [
      ingredients.coconut,
      ingredients.almond,
      ingredients.peanut,
      ingredients.jaggery
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
    mascots: [
      {
        id: 'date',
        name: 'Date Delight',
        desc: 'Indulge in a date delight, as the sweet and chewy dates bring fiber, iron, and essential minerals to the table, ensuring a delightful snacking experience that\'s as nutritious as it is tasty.',
        img: ingredients.date.img
      },
      {
        id: 'almond',
        name: 'Almond Adventure',
        desc: 'Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.',
        img: ingredients.almond.img
      },
      {
        id: 'cranberry',
        name: 'Cranberry Carnival',
        desc: 'Join the cranberry carnival, savoring the zesty sweetness and antioxidants that cranberries bring, providing a burst of flavor and immune-boosting benefits to your snacking fiesta.',
        img: ingredients.cranberry.img
      },
      {
        id: 'peanut',
        name: 'Peanut Party',
        desc: 'Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.',
        img: ingredients.peanut.img
      }
    ],
    ingredientsList: [
      ingredients.date,
      ingredients.almond,
      ingredients.cranberry,
      ingredients.peanut
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

  // YOUR ORIGINAL FEATURES WITH SAME ICONS - COMPLETELY UNCHANGED
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
     {/* Hero Section */}
<AnimatePresence mode="wait">
  <motion.section 
    key={`hero-${productKey}`}
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    transition={{ duration: 0.4 }}
    className="relative z-10 pt-8 sm:pt-12 md:pt-16 lg:pt-20 overflow-hidden mb-12" 
  >
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-gray-100 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-gray-100 to-transparent rounded-full blur-3xl" />
    </div>

    <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-[1200px]">
      <div className="flex flex-col items-center">
        
        {/* Image and Title */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 w-full">
          
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.1 }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <div className="mb-2">
              <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">
                {isCombo ? 'COMBO PACK' : 'PREMIUM PROTEIN BAR'}
              </span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-3 ${data.titleColor}`}>
              Happy Bar
            </h1>
            
            {data.titleLines.map((line, idx) => (
              <h2 key={idx} className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light ${data.titleColor}`}>
                {line}
              </h2>
            ))}
            
            <div className="w-12 h-px bg-gray-200 my-8 mx-auto lg:mx-0" />
            
            {/* Quick Info Tags */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-light tracking-wide">
                All Natural
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-light tracking-wide">
                No Preservatives
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-light tracking-wide">
                Vegetarian
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-light tracking-wide">
                No Added Sugar
              </span>
            </div>

            <button onClick={()=>{navigate("/happy-shop")} }
            className='mt-7 w-fit bg-gray-900 text-white font-light py-3 px-8 tracking-wider text-sm hover:bg-gray-800 flex items-center gap-2 transition-all duration-300 '>Shop now</button>
          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative Circle behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-2xl scale-110" />
              <img 
                src={data.img} 
                alt={data.titleLines.join(' ')} 
                className="relative w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
          </motion.div>
        </div>

        {/* Buy Now Button - Only for Combos */}
        {isCombo && dbProduct && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="bg-gray-900 text-white font-light py-3 px-8 tracking-wider text-sm hover:bg-gray-800 flex items-center gap-2 transition-all duration-300"
            >
              <ShoppingCart size={16} />
              BUY NOW — ₹{dbProduct.price}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToWishlist}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-all duration-300"
            >
              <Heart 
                size={16} 
                className={`${(dbProduct && wishlist.includes(dbProduct._id)) ? 'fill-gray-900 text-gray-900' : 'text-gray-400'}`} 
              />
            </motion.button>
          </motion.div>
        )}
        
        {/* Descriptive Pitch */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.35 }} 
          className="text-center max-w-3xl mx-auto px-4"
        >
          <div className="relative">
            {/* Decorative quotes */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-200 text-4xl font-serif">"</div>
            <h3 className={`text-xl sm:text-2xl md:text-3xl font-light mb-4 pt-4 ${data.pitchTitleColor}`}>
              {data.pitchTitle}
            </h3>
            <div className="w-8 h-px bg-gray-200 mx-auto my-4" />
            <p className={`text-gray-500 text-base leading-relaxed font-light max-w-2xl mx-auto ${data.pitchDescColor}`}>
              {data.pitchDesc}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
</AnimatePresence>
      {/* Features Section - YOUR ORIGINAL ICONS PRESERVED */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`features-${productKey}`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.4 }}
          className={`${data.featuresBg} py-16 sm:py-20 md:py-24 relative z-0`}
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className={`${data.featuresTitleColor} text-2xl sm:text-3xl md:text-4xl font-light mb-4`}>
                Why Choose Us
              </h2>
              <div className="w-12 h-px mx-auto rounded-full" style={{ backgroundColor: data.featuresTitleColor === 'text-white' ? 'rgba(255,255,255,0.3)' : '#d1d5db' }}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img src={f.img} alt={f.title} className="w-10 h-10 object-contain brightness-0 invert opacity-80" />
                  </div>
                  <h3 className={`${data.featuresTitleColor} font-light text-lg mb-2`}>{f.title}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Mascots Section */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`ingredients-${productKey}`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.4 }}
          className="py-16 sm:py-20 md:py-24 bg-gray-50"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
            <div className="text-center mb-12">
              <h2 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-light mb-4">
                The Goodness of Awesome Ingredients
              </h2>
              <div className="w-12 h-px bg-gray-300 mx-auto"></div>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm font-light">
                Pure, natural, and carefully selected ingredients for your happiness
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.mascots.map((mascot, i) => (
                <motion.div 
                  key={mascot.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: i * 0.1 }} 
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <img src={mascot.img} alt={mascot.name} className="w-20 h-20 object-contain opacity-80" />
                  </div>
                  <h3 className="text-gray-800 font-light text-base mb-2">{mascot.name}</h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">{mascot.desc.substring(0, 100)}...</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Shop Now Section */}
      <ShopNowSection />
    </div>
  );
};