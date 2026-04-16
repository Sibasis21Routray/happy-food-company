import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { api } from '../services/api';

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
    ingredientsBg: 'bg-[#f4f4fa]',
    ingredientsBgHex: '#f4f4fa',
    ingredientsHeaderColor: 'text-[#65599c]',
    ingredientsCardBg: 'bg-[#e9e8f4]',
    ingredientsCardTitleColor: 'text-[#3c3c72]',
    ingredientsCardDescColor: 'text-[#65599c]',
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
    ingredientsBg: 'bg-[#fff5f2]',
    ingredientsBgHex: '#fff5f2',
    ingredientsHeaderColor: 'text-[#e6755a]',
    ingredientsCardBg: 'bg-[#fceae6]',
    ingredientsCardTitleColor: 'text-[#d65f4c]',
    ingredientsCardDescColor: 'text-[#e6755a]',
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
    ingredientsBg: 'bg-[#fbe9e9]',
    ingredientsBgHex: '#fbe9e9',
    ingredientsHeaderColor: 'text-[#d43f44]',
    ingredientsCardBg: 'bg-[#f8d7da]',
    ingredientsCardTitleColor: 'text-[#9b1d20]',
    ingredientsCardDescColor: 'text-[#7a181b]',
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
    ingredientsBg: 'bg-[#fcf7ff]',
    ingredientsBgHex: '#fcf7ff',
    ingredientsHeaderColor: 'text-[#8e44ad]',
    ingredientsCardBg: 'bg-[#f3eaff]',
    ingredientsCardTitleColor: 'text-[#6a3093]',
    ingredientsCardDescColor: 'text-[#8e44ad]',
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
    ingredientsBg: 'bg-[#fff0f3]',
    ingredientsBgHex: '#fff0f3',
    ingredientsHeaderColor: 'text-[#ff3c83]',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-[#ff3c83]',
    ingredientsCardDescColor: 'text-gray-600',
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
    ingredientsBg: 'bg-[#fff0f3]',
    ingredientsBgHex: '#fff0f3',
    ingredientsHeaderColor: 'text-[#ff3c83]',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-[#ff3c83]',
    ingredientsCardDescColor: 'text-gray-600',
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
    ingredientsBg: 'bg-[#fff0f3]',
    ingredientsBgHex: '#fff0f3',
    ingredientsHeaderColor: 'text-[#ff3c83]',
    ingredientsCardBg: 'bg-white',
    ingredientsCardTitleColor: 'text-[#ff3c83]',
    ingredientsCardDescColor: 'text-gray-600',
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
          // Fallback to real DB ID if not found in list (e.g. API blank)
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
        // Even on error, establish the fallback ID so wishlist/cart can function
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

  // Default to cashew-raisin if ID doesn't match dictionary 
  // (or we could show a 404, but a fallback is smoother here)
  const productKey = id && productLibrary[id] ? id : 'cashew-raisin';
  const data = productLibrary[productKey];

  const features = [
    { title: "Protein Packed Punch", desc: "5.x grams of protein per serving (30g) – the secret sauce for muscle magic and all-day energy!", img: "/images/icon-protein.png" },
    { title: "All-Natural Awesomeness", desc: "Crafted with love with the best ingredients. No funny business – just natural goodness!", img: "/images/icon-natural.png" },
    { title: "Price Tag Happiness", desc: "All this awesomeness for just ₹ 40! That's right – a pocket-friendly protein party for everyone!", img: "/images/icon-price.png" },
    { title: "No Artificial Shenanigans", desc: "Wave goodbye to artificial preservatives, flavors, or colorings. Our bar keeps it real – just like your snacking standards!", img: "/images/icon-no-artificial.png" },
    { title: "Veggie Vibes Only", desc: "Vegetarian? We got you covered! No eggs, just pure plant power for your snacking pleasure.", img: "/images/icon-veg.png" },
    { title: "Say No to Sneaky Sugars", desc: "Zero glucose, emulsifiers, fructooligosaccharides (FOS) & other funny sounding chemicals. Nothing Sneaky & Zero Nonsense!", img: "/images/icon-no-sugar.png" }
  ];

  const combos = [
    { title: "Almond Cranberry\nCashew Raisin", subtitle: "Combo Box of 6", desc: "Embark on a flavor-packed journey with our Combo Box featuring the dynamic duo of Almond Cranberry and Cashew Raisin", img: "/images/combo-6-1.png", glow: "hover:shadow-[0_30px_70px_rgba(255,80,120,0.5)] scale-105 z-10" },
    { title: "Almond Cranberry\nCashew Raisin\nCoconut Almond\nDate Almond Cranberry", subtitle: "Combo Box of 12", desc: "Enjoy a snack symphony with our Combo Box featuring Almond Cranberry, Cashew Raisin, Coconut Almond, and Date Almond Cranberry. Each flavor is a unique and delicious experience, ensuring a diverse snacking delight for every taste bud.", img: "/images/combo-12.png", glow: "hover:shadow-[0_30px_70px_rgba(255,80,120,0.5)] scale-105 z-10" },
    { title: "Coconut Almond\nDate Almond Cranberry", subtitle: "Combo Box of 6", desc: "Savor the delightful medley of flavors in our Combo Box, featuring the irresistible pairing of Coconut Almond and Date Almond Cranberry", img: "/images/combo-6-2.png", glow: "hover:shadow-[0_30px_70px_rgba(255,80,120,0.5)] scale-105 z-10" }
  ];

  return (
    <div className="w-full font-sans bg-white overflow-hidden pt-24">
      {/* 1. Hero Product Summary Section */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`hero-` + productKey}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          className="relative z-10 pt-24 bg-cover bg-top" 
          style={{ backgroundImage: "url('/images/cloud-bg.png')", backgroundColor: '#dff6fc' }}
        >
          <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
             <div className="flex flex-col items-center">
               
               {/* Wrapper Image and Title Side-by-Side */}
               <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-14 lg:gap-20 mb-16 w-full">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 70, damping: 15 }}
                    className="w-full md:w-1/2 flex justify-end"
                  >
                    <img src={data.img} alt={data.titleLines.join(' ')} className="max-w-[110%] w-[380px] md:w-[450px] drop-shadow-[0_25px_30px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500" />
                  </motion.div>
                  
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.1 }}
                     className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left"
                  >
                     <h1 className={`text-[4rem] md:text-[5.5rem] leading-[0.9] font-black uppercase drop-shadow-md tracking-tighter mix-blend-multiply ${data.titleColor}`}>
                       Happy Bar<br/>
                       {data.titleLines.map((line, idx) => (
                         <div key={idx}>
                           {line}<br/>
                         </div>
                       ))}
                     </h1>
                  </motion.div>
               </div>

               {( (dbProduct && dbProduct.category === 'Combos') || (id && id.startsWith('combo')) ) && (
                 <div className="flex items-center gap-6 mt-4">
                   <motion.button 
                     whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                     onClick={handleAddToCart}
                     className="bg-[#f83f7a] text-white font-black py-4 px-10 rounded-full shadow-[0_10px_25px_rgba(248,63,122,0.4)] tracking-widest text-[14px] hover:bg-[#ff206a] flex items-center gap-3 uppercase"
                   >
                     <ShoppingCart size={20} />
                     BUY NOW
                   </motion.button>

                   <button
                     onClick={handleAddToWishlist}
                     className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-400 hover:scale-110 transition-all"
                   >
                     <Heart 
                       size={28} 
                       className={(dbProduct && wishlist.includes(dbProduct._id)) ? 'fill-[#ff3c83] text-[#ff3c83]' : ''} 
                     />
                   </button>
                 </div>
               )}
               
               {/* Descriptive Pitch */}
               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mt-16 max-w-4xl px-4 z-20 relative">
                 <h2 className={`text-5xl md:text-[4rem] font-black mb-8 tracking-tight ${data.pitchTitleColor}`}>{data.pitchTitle}</h2>
                 <p className={`text-lg md:text-[21px] font-bold leading-relaxed ${data.pitchDescColor}`}>
                   {data.pitchDesc}
                 </p>
               </motion.div>
             </div>
          </div>

          {/* Transition Dark Wave (Dynamic SVG Colors) */}
          <div className="w-full mt-[-80px] pointer-events-none relative z-10">
             <svg viewBox="0 0 1440 250" className="w-full h-auto" preserveAspectRatio="none">
               <path fill={data.waveColor1} fillOpacity="0.4" d="M0,150 C360,250 1080,50 1440,150 L1440,250 L0,250 Z"></path>
               <path fill={data.waveColor2} d="M0,200 C480,300 960,100 1440,200 L1440,250 L0,250 Z"></path>
             </svg>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 2. Features Section (Dynamic Background) */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`features-` + productKey}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          className={`${data.featuresBg} py-24 relative z-0 transition-colors duration-500`}
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="h-24 flex items-center justify-center mb-6">
                    <img src={f.img} alt={f.title} className="max-h-full drop-shadow-lg transition-transform hover:scale-110" />
                  </div>
                  <h3 className={`${data.featuresTitleColor} font-black text-xl md:text-2xl mb-4 tracking-wide`}>{f.title}</h3>
                  <p className="text-white font-semibold text-[15px] leading-relaxed max-w-xs">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 3. Mascots Section (Dynamic Ingredients) */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`ingredients-` + productKey}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          className={`py-24 ${data.ingredientsBg} relative z-10 transition-colors duration-500`}
        >
          <div className="container mx-auto px-6 max-w-[1200px]">
            <h2 className={`text-center font-black text-[3rem] md:text-[4rem] tracking-tight mb-16 ${data.ingredientsHeaderColor}`}>
              The goodness of awesome ingredients.
            </h2>
            
            <div className="flex flex-wrap justify-center gap-8">
              {data.mascots.map((mascot, i) => (
                <motion.div key={mascot.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
                  className={`${data.ingredientsCardBg} rounded-[2rem] p-6 flex flex-col items-center text-center shadow-md relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[250px] transition-colors`}
                >
                  <div className="h-28 w-28 mb-4 mt-2 flex justify-center items-center hover:rotate-6 transition-transform">
                    <img src={mascot.img} alt={mascot.name} className="max-h-full max-w-full drop-shadow-xl" />
                  </div>
                  <h3 className={`${data.ingredientsCardTitleColor} font-black text-[17px] mb-4`}>{mascot.name}</h3>
                  <p className={`${data.ingredientsCardDescColor} font-bold text-[13px] leading-relaxed mb-2 px-1`}>{mascot.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 4. Combos Wave & Shop Section */}
      <div className="w-full rotate-180 -mb-1 relative z-20">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path fill={data.ingredientsBgHex} fillOpacity="1" d="M0,32L80,32C160,32,320,32,480,48C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
      
      <section className="bg-gradient-to-b from-white to-[#d8f0fb] pt-8 pb-32">
        <div className="container mx-auto px-6 max-w-[1200px]">
          {/* Shop Callout Heading */}
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
             <div className="flex items-center gap-6 justify-center">
               <h1 className="text-4xl md:text-[4.5rem] leading-none font-black text-[#ff3c83] tracking-tighter drop-shadow-md">SHOP</h1>
             </div>
             <h2 className="text-4xl md:text-[3.5rem] font-black text-[#1d3557] tracking-tighter leading-none">Come visit the shop</h2>
          </div>

          <div className="flex flex-col md:flex-row md:flex-nowrap justify-center items-center md:items-stretch gap-6 lg:gap-8 max-w-full overflow-x-auto pb-6">
            {combos.map((combo, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className={`bg-white rounded-[2.5rem] p-8 shadow-xl flex flex-col items-center text-center max-w-sm w-full transition-shadow duration-300 h-full ${combo.glow}`}
              >
                <div className="w-full h-52 flex justify-center mb-8 overflow-hidden rounded-2xl bg-white p-4 shrink-0">
                  <img src={combo.img} alt={combo.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[#a12368] font-black text-xl mb-3 whitespace-pre-line leading-tight">{combo.title}</h3>
                <h4 className="text-[#3273c5] font-black text-lg mb-4">{combo.subtitle}</h4>
                <p className="text-gray-500 font-bold text-sm flex-1 mb-10 leading-relaxed px-4">{combo.desc}</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="bg-[#f83f7a] text-white font-black py-4 px-8 rounded-2xl shadow-[0_8px_25px_rgba(248,63,122,0.3)] tracking-widest text-sm hover:bg-[#ff206a] mt-auto w-full uppercase"
                >
                  SHOP NOW &gt;
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
