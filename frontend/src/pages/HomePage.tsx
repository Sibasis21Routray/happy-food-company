import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const SectionHeader = ({ title, color = "text-[#f36b21]" }: { title: string, color?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className={`text-center font-black text-4xl md:text-[3.5rem] mb-16 px-4 ${color} tracking-tight leading-tight`}
    >
      {title}
    </motion.h2>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const heroProducts = [
    { slug: "cashew-raisin", name: "Cashew Raisin", desc: "The dynamic duo of cashews and raisins creates a snacking sensation that's a slam dunk for anyone seeking a convenient & mouthwatering way to power up their vibrant lifestyle.", bg: "bg-[#dadddf]", btn: "bg-[#4a3e8e]", text: "text-[#d65f54]", title: "text-[#3b3584]", img: "/images/cashew-raisin.png" },
    { slug: "coconut-almond", name: "Coconut Almond", desc: "A mouthwatering medley of coconut & almonds, a dynamic duo celebrated for their nourishing prowess & mouth-watering taste, ensuring you stay fuelled & fabulous from sunrise to sunset.", bg: "bg-[#f0d8b4]", btn: "bg-[#e36a29]", text: "text-[#d65f54]", title: "text-[#3b3584]", img: "/images/coconut-almond.png" },
    { slug: "date-almond-cranberry", name: "Date Almond Cranberry", desc: "A harmonious blend of dates, cranberries, and almonds, a trio celebrated for their distinct flavours & wellness advantages. A satisfying pick-me-up that supports your well-being in a delicious way.", bg: "bg-[#ebd0d4]", btn: "bg-[#c52c38]", text: "text-[#d65f54]", title: "text-[#3b3584]", img: "/images/date-almond-cranberry.png" },
    { slug: "almond-cranberry", name: "Almond Cranberry", desc: "A fusion of jaggery, cranberries, & almonds, ingredients renowned for their tastes & health benefits. A festive treat that tantalizes your taste buds while promoting your well-being.", bg: "bg-[#dfd7e4]", btn: "bg-[#8f2878]", text: "text-[#d65f54]", title: "text-[#3b3584]", img: "/images/almond-cranberry.png" }
  ];

  const features = [
    { title: "Protein Packed Punch", desc: "5.x grams of protein per serving (30g) – the secret sauce for muscle magic and all-day energy!", img: "/images/icon-protein.png" },
    { title: "All-Natural Awesomeness", desc: "Crafted with love with the best ingredients. No funny business – just natural goodness!", img: "/images/icon-natural.png" },
    { title: "Price Tag Happiness", desc: "All this awesomeness for just ₹ 40! That's right – a pocket-friendly protein party for everyone!", img: "/images/icon-price.png" },
    { title: "No Artificial Shenanigans", desc: "Wave goodbye to artificial preservatives, flavors, or colorings. Our bar keeps it real – just like your snacking standards!", img: "/images/icon-no-artificial.png" },
    { title: "Veggie Vibes Only", desc: "Vegetarian? We got you covered! No eggs, just pure plant power for your snacking pleasure.", img: "/images/icon-veg.png" },
    { title: "Say No to Sneaky Sugars", desc: "Zero glucose, emulsifiers, fructooligosaccharides (FOS) & other funny sounding chemicals. Nothing Sneaky & Zero Nonsense!", img: "/images/icon-no-sugar.png" },
  ];

  const ingredients = [
    { title: "Almond Adventure", desc: "Embark on an almond adventure, as almonds offer a nutty crunch filled with healthy fats and vitamin E, promoting heart health and adding a dose of excitement to your snacking journey.", img: "/images/mascot-almond.png" },
    { title: "Cranberry Carnival", desc: "Join the cranberry carnival, savoring the zesty sweetness and antioxidants that cranberries bring, providing a burst of flavor and immune-boosting benefits to your snacking fiesta.", img: "/images/mascot-cranberry.png" },
    { title: "Cashew Carnival", desc: "Join the cashew carnival for a nutty joyride, as cashews bring a crunch of happiness, healthy fats, and protein, supporting a cheerful mood and a satisfied tummy.", img: "/images/mascot-cashew.png" },
    { title: "Raisin Radiance", desc: "Embark on a sweet rendezvous with raisins, delivering a chewy burst of natural sweetness and antioxidants, adding a bounce of energy to your day.", img: "/images/mascot-raisin.png" },
    { title: "Coconut Craze", desc: "Ride the wave of coconut craze, as coconuts add an exotic twist with their creamy texture and tropical flavor, making your snacking escapade a delightful and refreshing experience.", img: "/images/mascot-coconut.png" },
    { title: "Peanut Party", desc: "Be part of the peanut party, where peanuts pack a protein punch, coupled with healthy fats and a satisfying crunch, ensuring a snacking adventure that fuels your energy levels.", img: "/images/mascot-peanut.png" },
    { title: "Jaggery Jive", desc: "Sweeten the scene with the jaggery jive, as this natural sweetener not only satisfies your sweet tooth but also brings antioxidants and iron to the dance floor, boosting your energy levels with a touch of sweetness.", img: "/images/mascot-jaggery.png" },
    { title: "Date Delight", desc: "Indulge in a date delight, as the sweet and chewy dates bring fiber, iron, and essential minerals to the table, ensuring a delightful snacking experience that's as nutritious as it is tasty.", img: "/images/mascot-date.png" },
  ];

  const combos = [
    {
      title: "Almond Cranberry\nCashew Raisin",
      subtitle: "Combo Box of 6",
      desc: "Embark on a flavor-packed journey with our Combo Box featuring the dynamic duo of Almond Cranberry and Cashew Raisin",
      img: "/images/combo-6-1.png",
      glow: "hover:shadow-[0_30px_70px_rgba(255,80,120,0.5)] scale-105 z-10"
    },
    {
      title: "Almond Cranberry\nCashew Raisin\nCoconut Almond\nDate Almond Cranberry",
      subtitle: "Combo Box of 12",
      desc: "Enjoy a snack symphony with our Combo Box featuring Almond Cranberry, Cashew Raisin, Coconut Almond, and Date Almond Cranberry. Each flavor is a unique and delicious experience, ensuring a diverse snacking delight for every taste bud.",
      img: "/images/combo-12.png",
      glow: "hover:shadow-[0_30px_70px_rgba(255,80,120,0.5)] scale-105 z-10"
    },
    {
      title: "Coconut Almond\nDate Almond Cranberry",
      subtitle: "Combo Box of 6",
      desc: "Savor the delightful medley of flavors in our Combo Box, featuring the irresistible pairing of Coconut Almond and Date Almond Cranberry",
      img: "/images/combo-6-2.png",
      glow: "hover:shadow-[0_30px_70px_rgba(255,80,120,0.5)] scale-105 z-10"
    }
  ];

  return (
    <div className="w-full font-sans bg-white pt-32 overflow-x-hidden">

      {/* 1. Hero Products Section */}
      <section className="relative z-10 pb-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/cloud-bg.png')" }}>
        <div className="absolute inset-0 bg-blue-50/70" />
        <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 80 }}
            className="text-center font-black text-5xl md:text-[4rem] lg:text-[4.5rem] mb-12 tracking-tighter"
          >
            <span className="text-[#3b3584] inline-block hover:-translate-y-2 transition-transform">A Lil </span>
            <span className="text-[#ff6b00] inline-block hover:-translate-y-2 transition-transform ml-3">Something </span>
            <span className="text-[#8c3a1e] inline-block hover:-translate-y-2 transition-transform ml-3">For </span>
            <span className="text-[#7d1a7b] inline-block hover:-translate-y-2 transition-transform ml-3">Everyone</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroProducts.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }}
                className={`${p.bg} rounded-3xl p-6 shadow-xl flex flex-col items-center text-center`}
              >
                <div className="w-full relative group/card">
                  <Link to={`/product/${p.slug}`} className="w-full flex flex-col items-center">
                    <div className="w-full h-32 flex justify-center items-center mb-4 transition-transform hover:scale-110">
                      <img src={p.img} alt={p.name} className="max-w-full max-h-[140%] drop-shadow-xl" />
                    </div>
                    <h3 className={`text-xl font-black mb-3 ${p.title}`}>{p.name}</h3>
                    <p className={`flex-1 text-sm font-bold opacity-90 ${p.text} mb-6 leading-relaxed px-1`}>{p.desc}</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`${p.btn} text-white font-bold py-3 px-6 rounded-full w-4/5 text-xs tracking-widest`}>
                      FIND OUT MORE &gt;
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Blue Features Section */}
      <section className="bg-[#3aa3d4] py-24 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="h-24 flex items-center justify-center mb-6">
                  <img src={f.img} alt={f.title} className="max-h-full drop-shadow-lg hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-[#fb8a3b] font-black text-xl md:text-2xl mb-4 tracking-wide">{f.title}</h3>
                <p className="text-white font-semibold text-[15px] leading-relaxed max-w-xs">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Ingredients Section */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <SectionHeader title="The goodness of awesome ingredients." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ingredients.map((ing, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
                className="bg-[#e4f3f8] rounded-3xl p-6 pt-0 flex flex-col items-center text-center shadow-lg border border-blue-50 relative mt-16"
              >
                <div className="-mt-16 h-32 w-32 mb-4 flex justify-center items-center hover:rotate-6 transition-transform">
                  <img src={ing.img} alt={ing.title} className="max-h-full max-w-full drop-shadow-xl" />
                </div>
                <h3 className="text-[#2b88b7] font-black text-xl mb-4 tracking-wide">{ing.title}</h3>
                <p className="text-[#e25f46] font-bold text-sm leading-relaxed mb-4 px-2">{ing.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Combos Wave & Shop Section */}
      <div className="w-full rotate-180 -mb-1 relative z-20">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path fill="#def5fc" fillOpacity="1" d="M0,32L80,32C160,32,320,32,480,48C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      <section className="bg-[#def5fc] pt-4 pb-32">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-[5rem] font-black text-[#ff3c83] mb-2 tracking-tight drop-shadow-md">SHOP</h1>
            <h2 className="text-4xl md:text-[3.5rem] font-black text-[#1d3557] tracking-tight">Come visit the shop</h2>
          </div>

          <div className="flex flex-col md:flex-row md:flex-nowrap justify-center items-center md:items-stretch gap-6 lg:gap-8 mt-16 max-w-full overflow-hidden">
            {combos.map((combo, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className={`bg-white rounded-[2.5rem] p-8 shadow-xl flex flex-col items-center text-center max-w-sm w-full transition-shadow duration-300 h-full ${combo.glow}`}
              >
                <div className="w-full h-52 flex justify-center mb-8 overflow-hidden rounded-2xl bg-white p-4 shrink-0">
                  <img src={combo.img} alt={combo.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[#a12368] font-black text-xl mb-3 whitespace-pre-line leading-tight">{combo.title}</h3>
                <h4 className="text-[#3273c5] font-black text-lg mb-4">{combo.subtitle}</h4>
                <p className="text-gray-500 font-bold text-sm flex-1 mb-10 leading-relaxed px-2">{combo.desc}</p>
                <Link to="/happy-shop" className="w-full mt-auto">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="bg-[#f83f7a] text-white font-black py-4 px-8 rounded-2xl shadow-[0_8px_25px_rgba(248,63,122,0.3)] tracking-widest text-sm hover:bg-[#ff206a] w-full uppercase"
                  >
                    SHOP NOW &gt;
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
