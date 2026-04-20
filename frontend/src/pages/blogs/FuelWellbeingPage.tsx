
import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import YouMayLike from '../../components/blogs/YouMayLike'

function FuelWellbeingPage() {
  return (
    <div className="min-h-screen bg-[#f7f2f4]">
      {/* 1. Wavy Blue Hero Section */}
      <div className="relative bg-[#4ba9d8] h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "linear-gradient(110deg, #1e3a8a 30%, transparent 30.1%)",
            }}
          />
          <div className="absolute bottom-0 w-full leading-none">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-[150px]"
            >
              <path
                d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
                className="fill-white opacity-20"
              />
              <path
                d="M0,50 C400,120 800,20 1200,80 L1200,120 L0,120 Z"
                className="fill-white opacity-30"
              />
              <path
                d="M0,80 C300,150 700,50 1200,110 L1200,120 L0,120 Z"
                fill="#f7f2f4"
              />
            </svg>
          </div>
        </div>

        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center px-4 max-w-4xl -mt-10 leading-tight">
          Fuel Your Well-being with Happy Bars : A Natural Protein Energy Solution
        </h1>

        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl  relative z-20 pb-20">
        
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-your-wellbeing.webp"
              alt="Fuel Your Well-being"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2 rounded-lg text-[#7a7a7a]"><Calendar size={20}/></span>
            <span>May 4, 2024</span>
          </div>
        </div>

        {/* White Article Card */}
        <div className="bg-white  p-8 md:p-16  border-slate-50">
          <article className="text-[#555555] leading-[1.8] text-[16px] font-normal">
            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-6">Fuel Your Well-being with Happy Bars : A Natural Protein Energy Solution</h3>
            <p className="mb-6">
              In today’s health-conscious world, finding the right balance between nutrition and taste is key to sustaining energy levels and promoting overall well-being. That’s where Happy Bars step in, offering a delicious array of 100% natural protein energy bars designed to support your fitness goals, boost your health, and enhance your mood—all while keeping sugar levels in check.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-6">Unveiling the Power of Happy Bars: Natural Protein Energy at Its Finest</h3>
            
            <div className="space-y-8">
              <section>
                <h4 className="font-bold text-[#333333] mb-2">Almond Energy Bars:</h4>
                <p>
                  Our almond energy bars are a delightful blend of crunchy almonds and wholesome{' '}
                  <Link to="/ingredients" className="text-[#e91e63] font-bold hover:underline">
                    ingredients
                  </Link>, providing a natural source of protein and sustained energy for your active lifestyle. Perfect for fitness enthusiasts and health-conscious individuals alike, these bars offer a satisfying snack option without compromising on taste or nutrition. The search for protein bars for fitness is over!
                </p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Cashew Energy Bars:</h4>
                <p>
                  Indulge in the creamy richness of cashews with our cashew energy bars. Packed with protein and essential nutrients, these bars are a guilt-free way to fuel your body and mind, whether you’re hitting the gym or powering through a busy day.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Raisin Energy Bars:</h4>
                <p>
                  Satisfy your sweet cravings with our raisin energy bars, bursting with natural sweetness and energy-boosting goodness. Made with plump raisins and wholesome ingredients, these bars provide a convenient source of nutrition for those on the go, with low sugar content to support your dietary goals. The search for energy bars for diet is over.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Cranberry Energy Bars:</h4>
                <p>
                  Tart and tangy, our cranberry energy bars offer a refreshing twist on traditional protein bars. Loaded with antioxidants and flavor, these bars provide a natural boost of energy while supporting your overall health and well-being. The search for energy bars for health and well-being is over.
                </p>
              </section>
            </div>

            <h3 className="text-lg font-bold text-[#333333] mt-12 mb-6">The Natural Advantage: 100% Natural Protein Energy Bars for Your Lifestyle</h3>
            <p className="mb-6">
              At{' '}
              <Link to="/" className="text-[#e91e63] font-bold hover:underline">
                The Happy Food Company
              </Link>, we believe in the power of nature to nourish and energize. That’s why our Happy Bars are crafted using only the finest natural ingredients, free from artificial additives and preservatives, creating the ultimate natural protein energy bars. Each bar is a testament to our commitment to providing you with wholesome, nutritious snacks that fuel your body and mind.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mb-6">Supporting Your Fitness Journey: Protein Bars for Health and Performance</h3>
            <p className="mb-10">
              Whether you’re an athlete pushing your limits or simply looking to stay active and healthy, our protein bars for fitness are the perfect companion for your fitness journey. With a balanced combination of protein, carbohydrates, and essential nutrients, they provide the sustained energy you need to perform at your best, without the crash associated with high-sugar snacks, as we have designed them to be energy bars of low sugar.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mb-4">Conclusion: Elevate Your Snacking Experience with Happy Bars</h3>
            <p className="mb-12">
              Elevate your snacking experience with Happy Bars—delicious, natural protein energy bars designed to fuel your body, support your health, and uplift your mood. With a wide range of flavors to choose from and a commitment to quality and nutrition, they’re the perfect choice for anyone seeking a healthier, happier lifestyle. Try them today and discover the joy of snacking well with Happy Bars.
            </p>

            {/* Bottom Navigation Links */}
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold gap-4 uppercase tracking-wider">
              <Link to="/blog/busy-parents" className="text-[#e91e63] hover:underline text-center">
                ← Prev: Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go
              </Link>
              <Link to="/blog/fueling-your-day" className="text-[#e91e63] hover:underline text-center">
                Next: Fueling Your Day with Happy Bars: A Nutrient Powerhouse →
              </Link>
            </div>
          </article>
        </div>

        {/* 3. You May Also Like Section */}
        <div className="mt-20">
          <YouMayLike />
        </div>
      </div>
    </div>
  )
}

export default FuelWellbeingPage
