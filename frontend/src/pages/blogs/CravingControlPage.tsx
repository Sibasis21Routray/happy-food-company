import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import YouMayLike from '../../components/blogs/YouMayLike'

function CravingControlPage() {
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
         Craving Control: How Protein Bars Can Support Your Weight Loss Journey
        </h1>

        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-20 pb-20 ">
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/craving-for-chocolate.webp"
              alt="Craving Control"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2 rounded-lg text-[#7a7a7a]"><Calendar size={20}/></span>
            <span>April 13, 2024</span>
          </div>
        </div>

        {/* White Article Card */}
        <div className="bg-white  p-8 md:p-16 border border-slate-50">
          <article className="text-[#555555] leading-[1.8] text-[16px] font-normal">
            <h3 className="text-lg font-bold text-[#333333] mb-4">Introduction</h3>
            <p className="mb-6">
              In our fast-paced lives, finding nutritious and convenient snacks is essential. Enter protein bars—those compact, energy-packed wonders that fit seamlessly into our busy routines. But are they just another trendy snack, or do they play a crucial role in our weight loss journey? Are there any good protein bars for fitness? Let's explore!
            </p>

            <h3 className="text-xl font-bold text-[#333333] mt-10 mb-6">The Protein Bar Revolution</h3>
            
            <h4 className="text-lg font-bold text-[#444444] mb-2">Energy Bars: A Quick Boost</h4>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Energy bars have become a staple for fitness enthusiasts, busy professionals, and anyone seeking a quick pick-me-up. They will resort to an energy bar of low sugar for the perfect protein bar for their diet.</li>
              <li>Packed with essential nutrients, they provide sustained energy during workouts or hectic days.</li>
              <li>But what about weight loss? Can these bars help curb cravings and keep us on track?</li>
            </ul>

            <h4 className="text-lg font-bold text-[#444444] mb-2">The Power of Protein</h4>
            <p className="mb-6">
              Protein energy bars take the game up a notch. They're not just about energy; they're about nourishment.
              Protein is the superhero of macronutrients—it supports muscle repair, boosts metabolism, and keeps us feeling full.
              But how do protein bars fit into our weight loss puzzle?
            </p>

            <h3 className="text-xl font-bold text-[#333333] mt-10 mb-6">Curbing Cravings: The Protein Bar Advantage</h3>
            
            <h4 className="text-lg font-bold text-[#444444] mb-2">Satiety and Portion Control</h4>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Ever experienced those mid-afternoon hunger pangs? Protein bars can be your secret weapon.</li>
              <li>Their high protein content promotes satiety, helping you resist unhealthy snacks.</li>
              <li>Plus, they come in pre-portioned servings, preventing mindless overeating.</li>
              <li>Not to mention, they tend not to take a toll on your daily calorie budget.</li>
            </ul>

            <h4 className="text-lg font-bold text-[#444444] mb-2">The Reduced-Calorie Edge</h4>
            <p className="mb-6">
              When you're watching your calorie intake, every bite matters.
              Low-sugar protein bars from <Link to="/" className="text-[#e91e63] font-bold hover:underline">The Happy Food Company</Link> strike the perfect balance.
              They satisfy your sweet tooth without derailing your diet.
              Say goodbye to guilt-inducing sugary treats!
            </p>

            <h3 className="text-xl font-bold text-[#333333] mt-10 mb-6">The Happy Food Company's Low-Sugar Protein Bars</h3>
            
            <h4 className="text-lg font-bold text-[#444444] mb-2">A Smart Snack Choice</h4>
            <p className="mb-6">
              Our mission at The Happy Food Company is simple: to create wholesome, delicious options.
              Our 100% natural protein bars are crafted with care, using real ingredients like cashews, raisins, almonds, and cranberries.
              No artificial additives—just pure goodness.
              And yes, they're low in sugar!
              We also do our best not to put a strain on your wallet!
            </p>

            <h3 className="text-xl font-bold text-[#333333] mt-10 mb-6">Fueling Your Weight Loss Journey</h3>
            <p className="mb-10">
              Whether you're hitting the gym or tackling a busy day, our all-natural protein bars have your back.
              They provide sustained energy, prevent energy crashes, and keep you focused.
              Plus, they're a guilt-free indulgence—perfect for those moments when cravings strike.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mb-4 text-center">Conclusion</h3>
            <p className="mb-12 text-center">
              Next time you reach for a snack, consider the power of protein bars. They're not just tasty treats; they're allies in your weight loss journey. And when it comes to making smart choices, The Happy Food Company's low-sugar protein bars are a winning bet. We've got the cranberry energy bars, the almond energy bars, the raisin energy bars, or even the cashew energy bars for you. So if you're looking for a protein energy bar for fitness, our Happy Bars are the obvious answer.
            </p>
            
            <p className="mb-12 text-center italic text-[#777777]">
              So, grab a bar, satisfy those cravings, and stay on track. Your waistline—and your taste buds—will thank you!
            </p>

            {/* Bottom Navigation Links */}
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold gap-4 uppercase tracking-wider">
              <span className="text-gray-400">← First Post</span>
              <Link to="/blog/fueling-your-workouts-with-happy-bars" className="text-[#e91e63] hover:underline text-center">
                Next: Fueling Your Workouts with Happy Bars →
              </Link>
            </div>
          </article>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-20">
            <YouMayLike />
        </div>
      </div>
    </div>
  )
}

export default CravingControlPage