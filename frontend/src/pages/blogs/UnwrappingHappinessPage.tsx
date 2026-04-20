import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import YouMayLike from '../../components/blogs/YouMayLike'

function UnwrappingHappinessPage() {
  return (
    <div className="min-h-screen bg-[#f7f2f4]">
      {/* 1. Wavy Blue Hero Section */}
      <div className="relative bg-[#4ba9d8] h-[350px] flex items-center justify-center overflow-hidden">
        {/* Layered Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Darker Blue Diagonal Slice */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "linear-gradient(110deg, #1e3a8a 30%, transparent 30.1%)",
            }}
          />

          {/* Bottom Wavy Layers */}
          <div className="absolute bottom-0 w-full leading-none">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-[150px]"
            >
              {/* Deepest Layer (Lightest Blue/White) */}
              <path
                d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
                className="fill-white opacity-20"
              />
              {/* Middle Layer (Medium Blue) */}
              <path
                d="M0,50 C400,120 800,20 1200,80 L1200,120 L0,120 Z"
                className="fill-white opacity-30"
              />
              {/* Top Layer (Matches the page background color) */}
              <path
                d="M0,80 C300,150 700,50 1200,110 L1200,120 L0,120 Z"
                fill="#f7f2f4"
              />
            </svg>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-extrabold text-center px-4 max-w-5xl tracking-tight pt-10">
            Unwrapping Happiness : A Closer Look at the Wholesome Ingredients of Happy Bars        </h1>

        {/* Thin Orange/Gold accent line at the very bottom edge */}
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-4 relative z-20 pb-20 ">
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/health-flavour-natural-happy-bar.webp"
              alt="Cravings Control"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2  rounded-lg text-[#7a7a7a]"><Calendar/></span>
            <span>	
            May 25, 2024
            </span>
          </div>
        </div>

        {/* White Article Card */}
        <div className="bg-white  p-8 md:p-16  border border-slate-50">
          <article className="text-[#555555] leading-[1.8] text-[16px]">
            
            <h2 className="text-xl font-bold text-[#333333] mb-6">
              Unwrapping Happiness : A Closer Look at the Wholesome Ingredients of Happy Bars
            </h2>

            <p className="mb-6">
              At the Happy Food Company, we’re dedicated to enhancing your health and happiness. Our 100% natural energy bars are <span className="text-[#e91e63] font-medium">crafted</span> to deliver a healthy snack that’s rich in flavor and nutrition. As the number of health-conscious consumers grows, we’re proud to offer Happy Bars—the perfect natural protein energy bars for your well-being.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">The Pure and Nutritious Ingredients of Happy Bar</h3>
            <p className="mb-6">
              Our Happy Bars are a blend of all-natural{' '}
              <Link to="/ingredients" className="text-[#e91e63] font-bold hover:underline">
                ingredients
              </Link>: Almonds, peanuts, cashews, jaggery, dates, cranberries, raisins, and coconut. We’re committed to creating energy bars low in sugar with absolutely no added sugar, artificial flavoring, sweeteners, or colors. The sweetness in every Happy Bar comes from natural sources like jaggery, dates, cranberries, and raisins.
            </p>

            {/* Ingredient Sections */}
            <div className="space-y-8">
              <section>
                <h4 className="font-bold text-[#333333] mb-2">Almonds</h4>
                <p>Our almond energy bars are not just a treat for your taste buds but a heart-healthy choice. Each Happy Bar is packed with almonds that provide a satisfying crunch, essential heart-healthy fats, and vitamin E for antioxidant protection. Almonds are also a great source of magnesium and protein, supporting heart health and muscle growth.</p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Peanuts</h4>
                <p>Peanut energy bars from Happy Food Company are nutritional powerhouses, rich in protein and healthy fats. Peanuts contribute monounsaturated fats for heart health and resveratrol for anti-inflammatory benefits. They also offer niacin for brain function and improved blood circulation, making Happy Bars a smart choice for your health and vitality.</p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Cashews</h4>
                <p>Our cashew energy bars are filled with protein and healthy fats, along with essential minerals like magnesium for bone health and zinc for immune support. Cashews in Happy Bars also provide antioxidants for eye health and unsaturated fatty acids for cardiovascular wellness. The iron and copper content aids in energy production, ensuring that each Happy Bar supports a range of bodily functions for overall wellness.</p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Jaggery</h4>
                <p>Our Happy Bars are sweetened with jaggery, a 100% natural sweetener that not only enhances the taste but also brings a treasure trove of health benefits. Jaggery is a powerhouse of antioxidants and essential minerals like potassium and magnesium, which are vital for overall health. It aids in digestion, boosts immunity with zinc and selenium, and helps detoxify the body. This nutrient-rich sweetener also aids in weight management and provides lasting energy, making Happy Bars a tasty, healthful snack choice for those on a diet or looking for low sugar energy bars.</p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Dates</h4>
                <p>Dates in Happy Bars offer more than just natural sweetness and chewiness; they’re a source of fiber and iron, promoting digestive health and energy. Rich in potassium for heart function and magnesium for essential bodily reactions, dates are packed with antioxidants for cellular protection. These qualities make Happy Bars with dates a nutritious snack experience, perfect as energy bars for fitness and health.</p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Cranberries</h4>
                <p>Cranberry energy bars from Happy Food Company stand out for their zesty sweetness and multitude of health benefits. These antioxidant-rich fruits in Happy Bars support the immune system and promote heart health with their anti-inflammatory properties. Packed with fiber and vitamin C, they aid digestion and maintain healthy skin and muscles. The unique compounds in cranberries may even prevent urinary tract infections, making them a valuable addition to any natural protein energy bar.</p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Raisins</h4>
                <p>Raisins in Happy Bars are a sweet powerhouse, offering antioxidants and a quick energy boost. These sun-dried grapes are rich in iron, crucial for healthy blood, and potassium, for muscle and heart health. They’re not just tasty; they’re a strategic choice for nourishing undernourished children with essential nutrients, making Happy Bars with raisins ideal as protein bars for diet and health.</p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Coconut</h4>
                <p>The coconut energy bars from Happy Food Company add a creamy, tropical twist to your snacking routine. But it’s not just about the flavor; coconut is low in carbs and rich in fiber and healthy fats, including MCTs that provide quick energy. These nutrients support digestion, bone health, and blood cell formation, making our natural protein bars a smart choice for nourishing undernourished children and a delicious option for those seeking energy bars for diet and health.</p>
              </section>
            </div>

            <h3 className="text-lg font-bold text-[#333333] mt-12 mb-4">Unpacking the Nutritional Power of Happy Bars</h3>
            <p className="mb-6">
              One Happy Bar will provide you with an egg’s worth of protein (6 grams). The importance of protein in protein energy bars is not to be neglected, as it plays a crucial role in constructing and maintaining the structures that make up our bodies. However, we must not overlook the carbohydrates in Happy Bars, as they are a vital part of a healthy diet. Carbohydrates provide the body with glucose, which is converted into energy used to support bodily functions and physical activity. So, not only does Happy Bar provide the carbohydrates for a quick and convenient source of energy but also contributes to the overall nutritional balance that supports a healthy lifestyle.
            </p>

            <p className="mb-6">
              Happy Bar is a perfectly balanced nutritional bar, providing a perfect balance of macronutrients and is a good source of plenty of vitamins, thanks to the 100% natural ingredients used. Yet despite being perfectly healthy, it doesn’t put a strain on your pockets!
            </p>

            <p className="italic font-bold text-[#444] mb-12">
              Have a delicious, nutritious snack with a Happy Bar!
            </p>

            {/* Bottom Nav Links */}
            <div className="border-t border-slate-100 pt-8 flex justify-between items-center text-[11px] font-bold">
              <Link to="/blog/nourish-energize-thrive" className="text-[#e91e63] hover:underline uppercase tracking-wider">
                ← Prev: Nourish, Energize, Thrive : The Happy Bar Way
              </Link>
              <Link to="/blog/satisfy-your-sugar-cravings-naturally" className="text-[#e91e63] hover:underline uppercase tracking-wider">
                Next: Satisfy your Sugar Cravings Naturally →
              </Link>
            </div>
          </article>
        </div>

        {/* You May Also Like Section */}
        <YouMayLike />

      </div>
    </div>
  )
}

export default UnwrappingHappinessPage