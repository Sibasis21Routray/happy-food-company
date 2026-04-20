import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import YouMayLike from '../../components/blogs/YouMayLike'

function FuelingYourDayPage() {
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
          Fueling Your Day with Happy Bars: A Nutrient Powerhouse
        </h1>

        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-20 pb-20">
        
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/my-daily-fix.webp"
              alt="Fueling Your Day"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2 rounded-lg text-[#7a7a7a]"><Calendar size={20}/></span>
            <span>May 11, 2024</span>
          </div>
        </div>

        {/* White Article Card */}
        <div className="bg-white  p-8 md:p-16  border-slate-50">
          <article className="text-[#555555] leading-[1.8] text-[16px] font-normal">
            <h3 className="text-lg font-bold text-[#333333] mb-3">Fueling Your Day with Happy Bars: A Nutrient Powerhouse</h3>
            <p className="mb-6">
              When it comes to nourishing our bodies, the right balance of nutrients is essential. Enter Happy Bars, the delightful energy bars that pack a punch in terms of protein, carbohydrates, and fiber. Let’s delve deeper into why these three components are crucial for your overall well-being:
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-bold text-[#333333] mb-3">Protein: The Building Blocks</h3>
                <p>
                  Protein is like the construction crew for your body. It repairs tissues, builds muscles, and supports immune function. Happy Bars are more than just a snack; they’re protein energy bars! With a blend of wholesome{' '}
                  <Link to="/ingredients" className="text-[#e91e63] font-bold hover:underline">
                    ingredients
                  </Link>, 
                  including cashews, raisins, almonds, and cranberries, these bars provide a steady supply of amino acids. Whether you’re hitting the gym or simply need an energy boost during a hectic day, the protein in Happy Bars has your back.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-[#333333] mb-3">Carbohydrates: Your Energy Reservoir</h3>
                <p>
                  Carbs are the fuel that keeps your engine running. They’re not the enemy! Happy Bars contain wholesome carbohydrates that release energy gradually. Say goodbye to sugar crashes and hello to sustained vitality. Whether you’re conquering a workday or chasing after little ones, Happy Bars provide the right kind of carbs. Plus, they’re low in sugar, making them an excellent choice for health-conscious individuals.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-[#333333] mb-3">Fiber: The Digestive Hero</h3>
                <p>
                  Fiber might not be the life of the party, but it’s essential for gut health. Happy Bars sneak in a good dose of dietary fiber, promoting regular digestion and keeping your tummy happy. Plus, it helps control blood sugar levels and keeps you feeling full longer. Win-win!
                </p>
              </section>
            </div>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-6">Why Choose Happy Bars?</h3>
            <ul className="list-disc pl-5 space-y-3 mb-10">
              <li><strong>Balanced Goodness:</strong> Happy Bars strike the perfect balance between protein, carbs, and fiber.</li>
              <li><strong>Deliciously Nutritious:</strong> Who says healthy can’t be tasty? Happy Bars prove otherwise.</li>
              <li><strong>100% Natural:</strong> These bars are made from all-natural ingredients, free from artificial additives.</li>
              <li><strong>Fitness Fuel:</strong> Whether you’re an athlete or a fitness enthusiast, Happy Bars are your go-to energy source.</li>
              <li><strong>Supporting Health Goals:</strong> With low sugar content, they’re ideal for those watching their diet.</li>
            </ul>

            <h3 className="text-lg font-bold text-[#333333] mb-6">Happy Bars Varieties: A Flavorful Journey</h3>
            <div className="space-y-4 mb-10">
              <p><strong>01. Cashew Energy Bars:</strong> Packed with creamy cashews, these bars provide sustained energy for your busy day. The natural sweetness of cashews complements the overall flavor profile.</p>
              <p><strong>02. Raisin Protein Bars:</strong> Juicy raisins meet protein power! These bars combine the goodness of dried grapes with the muscle-building benefits of protein.</p>
              <p><strong>03. Almond Energy Bars:</strong> Almonds, the unsung heroes of snacking, take center stage in these bars. They’re rich in healthy fats and provide a satisfying crunch.</p>
              <p><strong>04. Cranberry Protein Bars:</strong> Tart cranberries meet protein perfection. These bars balance tanginess with the essential amino acids your body craves.</p>
            </div>

            <h3 className="text-lg font-bold text-[#333333] mb-6">Happy Bars for Every Lifestyle</h3>
            <ul className="list-disc pl-5 space-y-3 mb-10">
              <li><strong>For Fitness Enthusiasts:</strong> Whether you’re hitting the gym, going for a run, or practicing yoga, Happy Bars fuel your workouts without compromising on taste.</li>
              <li><strong>For Health-Conscious Individuals:</strong> Watching your sugar intake? Happy Bars are your guilt-free companions.</li>
              <li><strong>For Busy Professionals:</strong> Need a quick pick-me-up during a hectic workday? Grab a Happy Bar and keep productivity soaring.</li>
            </ul>

            <h3 className="text-lg font-bold text-[#333333] mb-4">The Happy Food Company’s Mission</h3>
            <p className="mb-6">
              Every Happy Bar you enjoy is 100% natural energy protein bars for diet. so enjoy our wide range of energy bars for diet. Share the love, spread the word, and let’s make nutrition accessible to all!
            </p>

            <p className="font-bold text-[#333333] mb-2">Stay happy, stay healthy!</p>
            <p className="italic font-bold text-[#444] mb-12">
              Remember, it’s not just a snack; it’s a step toward a healthier world. Happy Bars—because good nutrition should make you smile!
            </p>

            {/* Bottom Navigation Links */}
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold gap-4">
              <Link to="/blog/fuel-your-well-being" className="text-[#e91e63] hover:underline uppercase tracking-wider text-center">
                ← Prev: Fuel Your Well-being with Happy Bars : A Natural Protein Energy Solution
              </Link>
              <Link to="/blog/nourish-energize-thrive" className="text-[#e91e63] hover:underline uppercase tracking-wider text-center">
                Next: Nourish, Energize, Thrive : The Happy Bar Way →
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

export default FuelingYourDayPage