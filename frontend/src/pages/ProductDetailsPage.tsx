import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Heart, Leaf, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { api } from "../services/api";
import { ShopNowSection } from "../components/ShopNowSection";

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

const happyBarsMenu = [
  { title: 'Cashew Raisin', subtitle: 'Energize your Enjoyment', color: '#4A3E8E', img: '/images/cashew-raisin.png', link: '/product/cashew-raisin', slug: 'cashew-raisin' },
  { title: 'Coconut Almond', subtitle: 'Spark your snacking', color: '#E86E24', img: '/images/coconut-almond.png', link: '/product/coconut-almond', slug: 'coconut-almond' },
  { title: 'Date Almond Cranberry', subtitle: 'Fuel your Fun', color: '#C92C3A', img: '/images/date-almond-cranberry.png', link: '/product/date-almond-cranberry', slug: 'date-almond-cranberry' },
  { title: 'Almond Cranberry', subtitle: 'Unleash the Awesome', color: '#902A78', img: '/images/almond-cranberry.png', link: '/product/almond-cranberry', slug: 'almond-cranberry' }
];

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
  "cashew-raisin": {
    titleLines: ["Cashew", "Raisin"],
    titleColor: "text-[#36316b]",
    img: "/images/cashew-raisin.png",
    pitchTitle: "Energize your Enjoyment",
    pitchTitleColor: "text-[#76649d]",
    pitchDesc:
      "Looking for a snack that's both a taste sensation and a powerhouse of goodness? Dive into our Protein Power Fusion – an extraordinary energy bar that brings together the dynamic duo of cashews and raisins!",
    pitchDescColor: "text-[#413c70]",
    waveColor1: "#928abf",
    waveColor2: "#3c3c72",
    featuresBg: "bg-[#3c3c72]",
    featuresTitleColor: "text-[#fb8a3b]",
    mascots: [
      { id: "cashew", name: "Cashew Carnival", desc: "Join the cashew carnival for a nutty joyride, as cashews bring a crunch of happiness, healthy fats, and protein, supporting a cheerful mood and a satisfied tummy.", img: ingredients.cashew.img },
      { id: "raisin", name: "Raisin Radiance", desc: "Embark on a sweet rendezvous with raisins, delivering a chewy burst of natural sweetness and antioxidants, adding a bounce of energy to your day.", img: ingredients.raisin.img },
      { id: "peanut", name: "Peanut Party", desc: "Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.", img: ingredients.peanut.img },
      { id: "jaggery", name: "Jaggery Jive", desc: "Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.", img: ingredients.jaggery.img },
    ],
    ingredientsList: [ingredients.cashew, ingredients.raisin, ingredients.peanut, ingredients.jaggery],
  },
  "coconut-almond": {
    titleLines: ["Coconut", "Almond"],
    titleColor: "text-[#d65f4c]",
    img: "/images/coconut-almond.png",
    pitchTitle: "Spark your snacking",
    pitchTitleColor: "text-[#e6755a]",
    pitchDesc:
      "In the quest for a snack that's a burst of flavors and a nutritional powerhouse, meet our Protein Snack Fiesta! This remarkable energy bar seamlessly blends the dynamic duo of coconuts and almonds for a snacking experience like no other!",
    pitchDescColor: "text-[#ad301b]",
    waveColor1: "#e2ac97",
    waveColor2: "#cc4b34",
    featuresBg: "bg-[#cc4b34]",
    featuresTitleColor: "text-[#fb8a3b]",
    mascots: [
      { id: "coconut", name: "Coconut Craze", desc: "Ride the wave of coconut craze, as coconuts add an exotic twist with their creamy texture and tropical flavor, making your snacking escapade a delightful and refreshing experience.", img: ingredients.coconut.img },
      { id: "almond", name: "Almond Adventure", desc: "Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.", img: ingredients.almond.img },
      { id: "peanut", name: "Peanut Party", desc: "Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.", img: ingredients.peanut.img },
      { id: "jaggery", name: "Jaggery Jive", desc: "Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.", img: ingredients.jaggery.img },
    ],
    ingredientsList: [ingredients.coconut, ingredients.almond, ingredients.peanut, ingredients.jaggery],
  },
  "date-almond-cranberry": {
    titleLines: ["Date", "Almond", "Cranberry"],
    titleColor: "text-[#9b1d20]",
    img: "/images/date-almond-cranberry.png",
    pitchTitle: "Fuel your Fun",
    pitchTitleColor: "text-[#e63946]",
    pitchDesc:
      "Looking for a snack that's as exciting as it is energizing? Dive into our Protein Power Play – an irresistible energy bar loaded with the goodness of dates, almonds, and cranberries!",
    pitchDescColor: "text-[#7a181b]",
    waveColor1: "#d66853",
    waveColor2: "#7a181b",
    featuresBg: "bg-[#7a181b]",
    featuresTitleColor: "text-[#fb8a3b]",
    mascots: [
      { id: "date", name: "Date Delight", desc: "Indulge in a date delight, as the sweet and chewy dates bring fiber, iron, and essential minerals to the table, ensuring a delightful snacking experience that's as nutritious as it is tasty.", img: ingredients.date.img },
      { id: "almond", name: "Almond Adventure", desc: "Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.", img: ingredients.almond.img },
      { id: "cranberry", name: "Cranberry Carnival", desc: "Join the cranberry carnival, savoring the zesty sweetness and antioxidants that cranberries bring, providing a burst of flavor and immune-boosting benefits to your snacking fiesta.", img: ingredients.cranberry.img },
      { id: "peanut", name: "Peanut Party", desc: "Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.", img: ingredients.peanut.img },
    ],
    ingredientsList: [ingredients.date, ingredients.almond, ingredients.cranberry, ingredients.peanut],
  },
  "almond-cranberry": {
    titleLines: ["Almond", "Cranberry"],
    titleColor: "text-[#7a448e]",
    img: "/images/almond-cranberry.png",
    pitchTitle: "Unleash the Awesome!",
    pitchTitleColor: "text-[#7a448e]",
    pitchDesc:
      "Are you ready for a taste explosion that’s as good for your taste buds as it is for your body? Dive into our Protein Power Play – a delightful energy bar loaded with almonds, cranberries and jaggery that will make your snacking game strong!",
    pitchDescColor: "text-[#7a181b]",
    waveColor1: "#d66853",
    waveColor2: "#7a181b",
    featuresBg: "bg-[#7a448e]",
    featuresTitleColor: "text-[#fb8a3b]",
    mascots: [
      { id: "date", name: "Date Delight", desc: "Indulge in a date delight, as the sweet and chewy dates bring fiber, iron, and essential minerals to the table, ensuring a delightful snacking experience that's as nutritious as it is tasty.", img: ingredients.date.img },
      { id: "almond", name: "Almond Adventure", desc: "Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.", img: ingredients.almond.img },
      { id: "cranberry", name: "Cranberry Carnival", desc: "Join the cranberry carnival, savoring the zesty sweetness and antioxidants that cranberries bring, providing a burst of flavor and immune-boosting benefits to your snacking fiesta.", img: ingredients.cranberry.img },
      { id: "peanut", name: "Peanut Party", desc: "Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.", img: ingredients.peanut.img },
    ],
    ingredientsList: [ingredients.date, ingredients.almond, ingredients.cranberry, ingredients.peanut],
  },
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
        "cashew-raisin": "69e0bed3ddd3678cb38d4a9f",
        "coconut-almond": "69e0bed3ddd3678cb38d4aa0",
        "date-almond-cranberry": "69e0bed3ddd3678cb38d4aa1",
        "almond-cranberry": "69e0bed3ddd3678cb38d4aa2",
        "combo-6-1": "69e0bed3ddd3678cb38d4aa3",
        "combo-6-2": "69e0bed3ddd3678cb38d4aa4",
        "combo-12": "69e0bed3ddd3678cb38d4aa5",
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
            category: id.startsWith("combo") ? "Combos" : "Happy Bars",
            price: id === "combo-12" ? 600 : 300,
          });
        }

        const user = localStorage.getItem("user");
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
            category: id.startsWith("combo") ? "Combos" : "Happy Bars",
            price: id === "combo-12" ? 600 : 300,
          });
        }
      }
    };
    fetchData();
  }, [id]);

  const handleAddToWishlist = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    if (!dbProduct) return;
    try {
      if (wishlist.includes(dbProduct._id)) {
        await api.wishlist.remove(dbProduct._id);
        setWishlist((prev) => prev.filter((wid) => wid !== dbProduct._id));
      } else {
        await api.wishlist.add(dbProduct._id);
        setWishlist((prev) => [...prev, dbProduct._id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    if (!dbProduct) return;
    try {
      await api.cart.add(dbProduct._id, 1);
      navigate("/cart");
    } catch (err) {
      console.error(err);
    }
  };

   // YOUR ORIGINAL FEATURES WITH SAME ICONS - COMPLETELY UNCHANGED
  const features = [
    {
      title: "Real Ingredients",
      desc: "Made with almonds, cashews, peanuts, dates, raisins, cranberries, coconut, jaggery, pure ghee, and quality protein.",
      img: "/productdetails/lotus_2610118.png",
    },
    {
      title: "Protein-Powered",
      desc: "Delivers approximately 5g of protein per serving to keep you going throughout the day.",
      img: "/productdetails/energy-bar_7634814.png",
    },
    {
      title: "Clean & Honest",
      desc: "No artificial preservatives, flavours, or colourings. No unnecessary additives.",
      img: "/productdetails/no-preservatives_4411195.png",
    },
    {
      title: "Vegetarian Friendly",
      desc: "100% vegetarian recipes crafted to suit modern lifestyles.",
      img: "/productdetails/leaf.png",
    },
    {
      title: "Made with Pure Ghee",
      desc: "A traditional ingredient that enhances both flavour and quality.",
      img: "/productdetails/sugar-free.png",
    },
    {
      title: "Affordable Everyday Nutrition",
      desc: "Premium-quality nutrition at a price that makes healthy snacking accessible to everyone.",
      img: "/productdetails/rupee-symbol.png",
    },
  ];


  const productKey = id && productLibrary[id] ? id : "cashew-raisin";
  const data = productLibrary[productKey];
  const isCombo = id && id.startsWith("combo");

  // Mathematical configuration for standard placement distribution
  const totalItems = data.mascots.length;
  // Radius determines the width/spread of our component wheel wrapper layout
  const radius = 340;

  return (
    <div className="w-full font-sans bg-white overflow-hidden pt-12 sm:pt-16">
      {/* Split Screen Hero Layout */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`hero-${productKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 py-8 md:py-16 max-w-7xl mx-auto px-4 sm:px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* LEFT COLUMN: Product Display Box & Wrap Packaging */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              <div className="absolute w-[85%] h-[85%] bg-gray-50/70 rounded-full blur-2xl -z-10" />
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                src={data.img}
                alt={data.titleLines.join(" ")}
                className="max-h-[380px] sm:max-h-[460px] md:max-h-[520px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.08)]"
              />
            </div>

            {/* RIGHT COLUMN: Interactive Ordering Matrix & Specifications */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {/* Product Header Text Grouping - Using heading-1 class */}
              <div>
                <h1 className="heading-1 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-2">
                  {data.titleLines.join(" ")}
                </h1>
                <p className="sub-heading text-xl font-medium text-gray-500 tracking-wide">
                  {isCombo ? "Premium Variety Combo Pack" : "Protein Bar 34g"}
                </p>
              </div>

              {/* Verified Product Ratings Row */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-current" />
                  ))}
                </div>
                <span className="text-body text-xs font-medium tracking-wide">
                  Highly rated by satisfied customers
                </span>
              </div>

              {/* Dynamic Variant Switcher Grid matching screenshot circles */}
              <div className="pt-2">
                <h3 className="heading-4 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Select Flavor Flavor Pack
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {happyBarsMenu.map((item) => {
                    const isSelected = item.slug === productKey;
                    return (
                      <button
                        key={item.slug}
                        onClick={() => navigate(item.link)}
                        className="flex flex-col items-center group focus:outline-none"
                      >
                        <div
                          className="w-14 h-14 rounded-full bg-gray-50 border flex items-center justify-center overflow-hidden p-1 transition-all duration-300"
                          style={{
                            borderColor: isSelected ? item.color : "#e5e7eb",
                            boxShadow: isSelected
                              ? `0 0 0 2px ${item.color}20`
                              : "none",
                            transform: isSelected ? "scale(1.05)" : "none",
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-body text-[10px] mt-1.5 font-medium text-gray-600 text-center line-clamp-1 w-full tracking-tight">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Product Pitch Descriptive Context */}
              <div className="space-y-2">
                <h4
                  className={`heading-4 text-md font-semibold tracking-wide ${data.pitchTitleColor}`}
                >
                  {data.pitchTitle}
                </h4>
                <p
                  className={`text-body text-sm text-gray-600 leading-relaxed max-w-xl font-light ${data.pitchDescColor}`}
                >
                  {data.pitchDesc}
                </p>
              </div>

              {/* Dynamic Badges Block */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "All Natural",
                  "No Preservatives",
                  "Vegetarian",
                  "Zero Nonsense",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-body text-[11px] bg-gray-50 text-gray-500 px-2.5 py-1 font-medium tracking-wide rounded-sm border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Checkout Cart/Wishlist Control Row */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  navigate("/happy-shop");
                }}
                className="flex-1 bg-gray-950 text-white font-medium py-3 px-6 tracking-wider text-sm hover:bg-gray-800 flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
              >
                <ShoppingCart size={16} />
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ingredient Section*/}
      <section className="py-20 bg-[#fafafa] border-t border-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <h2 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              The real ingredients in our {data.titleLines.join(" ")} bar
            </h2>
          </div>

          {/* Quick-Info Ingredient Metric Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-20">
            <div className="bg-[#e4d5b7] p-4 rounded-xl flex items-start space-x-3 shadow-2xs hover:scale-105 transition-all">
              <ShieldCheck className="text-neutral-800 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="heading-4 font-bold text-neutral-950 text-sm">Gluten-free</h4>
                <p className="text-body text-neutral-800 text-xs mt-0.5 font-light">Made cleanly without gluten additions.</p>
              </div>
            </div>

            <div className="bg-[#cbdca3] p-4 rounded-xl flex items-start space-x-3 shadow-2xs hover:scale-105 transition-all">
              <Leaf className="text-neutral-800 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="heading-4 font-bold text-neutral-950 text-sm">Vegetarian</h4>
                <p className="text-body text-neutral-800 text-xs mt-0.5 font-light">Perfectly suitable for modern vegetarians.</p>
              </div>
            </div>

            <div className="bg-[#e26d65] p-4 rounded-xl flex items-start space-x-3 shadow-2xs hover:scale-105 transition-all">
              <AlertTriangle className="text-white shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="heading-4 font-bold text-white text-sm">Allergen info</h4>
                <p className="text-body text-red-50 text-xs mt-0.5 font-light">
                  Contains premium premium nuts. Made in a trace-free natural space.
                </p>
              </div>
            </div>
          </div>

          {/* RADIAL SATELLITE SYSTEM FRAMEWORK */}
          <div className="relative w-full h-[750px] hidden md:flex items-center justify-center">
            
            {/* Center Focal Point (Horizontal Candy Bar Foil Package) */}
            <div className="absolute z-20 w-[490px] p-2 ">
              <img
                src={data.img}
                alt="Center Bar Pack"
                className="w-full h-auto object-contain rotate-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
              />
            </div>

            {/* Mathematically Structured Circle Nodes Loop */}
            {data.mascots.map((item: any, idx: number) => {
              const angle = (idx * 2 * Math.PI) / data.mascots.length - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={item.id}
                  className="absolute z-30 flex flex-col items-center"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-30 h-30 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-neutral-100 flex items-center justify-center p-3.5 relative group"
                  >
                    <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain" />
                    
                    {/* Hover Tooltip Overlay Descriptor box matching style specs */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center w-40 bg-neutral-900 text-white p-2 rounded-lg shadow-xl text-center z-50">
                      <span className="text-[11px] font-bold">{item.name}</span>
                      <span className="text-body text-[9px] text-neutral-300 font-light mt-0.5 leading-tight">{item.desc}</span>
                      <div className="w-2 h-2 bg-neutral-900 rotate-45 absolute -bottom-1" />
                    </div>
                  </motion.div>
                  
                  <span className="text-body text-[10px] font-extrabold tracking-wider text-neutral-700 mt-2 uppercase bg-white px-2.5 py-0.5 rounded-full border border-neutral-100 shadow-3xs">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Simple Grid Adaptive Mobile Viewport View */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {data.mascots.map((item: any) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-neutral-100 text-center flex flex-col items-center">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-contain mb-2" />
                <h5 className="heading-4 text-xs font-bold text-neutral-900">{item.name}</h5>
                <p className="text-body text-[10px] text-neutral-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Features Section */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`features-${productKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`${data.featuresBg} py-16 sm:py-20 md:py-24 relative z-0`}
        >
          <div className="container mx-auto px-4 sm:px-6  max-w-7xl">
            <div className="text-center mb-12">
              <h2
                className={`${data.featuresTitleColor} heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl `}
              >
                Why Choose Us
              </h2>
              
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-10 h-10 object-contain brightness-0 invert opacity-80"
                    />
                  </div>
                  <h3
                    className={`heading-3 ${data.featuresTitleColor} font-light text-lg mb-2`}
                  >
                    {f.title}
                  </h3>
                  <p className="text-body text-white text-md font-light leading-relaxed">
                    {f.desc}
                  </p>
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