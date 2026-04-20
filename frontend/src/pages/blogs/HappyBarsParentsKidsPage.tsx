
import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import YouMayLike from '../../components/blogs/YouMayLike'

function HappyBarsParentsKidsPage() {
  return (
    <div className="min-h-screen bg-[#f7f2f4]">
      {/* 1. Wavy Blue Hero Section */}
      <div className="relative bg-[#4ba9d8] h-[350px] flex items-center justify-center overflow-hidden">
        {/* Layered Background Elements */}
        <div className="absolute inset-0 z-0">
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

        {/* Main Title */}
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center px-4 max-w-4xl -mt-10 leading-tight">
          Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go
        </h1>

        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-20 pb-20">
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/whats-in-the-bag.webp"
              alt="Parents and Kids Snacking"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2 rounded-lg text-[#7a7a7a]"><Calendar size={20}/></span>
            <span>April 27, 2024</span>
          </div>
        </div>

        {/* White Article Card */}
        <div className="bg-white  p-8 md:p-10  border-slate-50">
          <article className="text-[#555555] leading-[1.8] text-[16px] font-normal">
             <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go

            </h3>
            <p className="mb-6">
              In the whirlwind of modern family life, finding nutritious snacks that are both convenient and tasty can feel like an uphill battle. Parents juggle multiple responsibilities, often on-the-go, while ensuring their children stay fueled and satisfied throughout the day. That’s where energy bars come in – specifically,{' '}
              <Link to="/" className="text-[#e91e63] font-bold hover:underline">
                The Happy Food Company
              </Link>
              ’s delightful Happy Bars. These protein-packed, all-natural energy bars are a game-changer for busy families seeking wholesome snack options that deliver on both nutrition and convenience.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">The Snack Dilemma:</h3>
            <p className="mb-6">
              In today’s fast-paced world, convenience often trumps nutrition when it comes to snack choices. However, parents understand the importance of providing their children with foods that nourish their growing bodies. That’s why finding energy bars like Happy Bars, which are not only convenient but also packed with wholesome{' '}
              <Link to="/ingredients" className="text-[#e91e63] font-bold hover:underline">
                ingredients
              </Link>
              , is a win-win solution for busy families striving to maintain a healthy lifestyle.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">Introducing Happy Bars:</h3>
            <p className="mb-6">
              Happy Bars are not your average energy bars – they’re a cut above the rest. Made with a carefully crafted blend of high-quality ingredients, including cashews, raisins, almonds, and cranberries, these protein energy bars offer a burst of flavor with every bite. What’s more, they’re 100% natural, free from artificial additives and preservatives, making them a guilt-free snack option for both kids and adults alike.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">Nutritional Benefits for Parents and Kids:</h3>
            <p className="mb-6">
              Parents can feel confident knowing that Happy Bars provide essential nutrients to fuel their children’s busy days. Packed with protein, fiber, and natural sugars from fruits, these energy bars offer sustained energy without the crash associated with sugary snacks. Plus, they’re low in sugar, making them a smart choice for parents looking to support their children’s health and well-being.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">Convenience On-The-Go:</h3>
            <p className="mb-6">
              Whether rushing to school in the morning or shuttling between extracurricular activities in the afternoon, Happy Bars are the ultimate grab-and-go snack for busy families. Their compact size and convenient packaging make them easy to stash in backpacks, purses, or gym bags, ensuring that nutritious fuel is always within reach, no matter where the day takes you.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">Kid-Approved Favorites:</h3>
            <p className="mb-6">
              Don’t just take our word for it – kids love Happy Bars too! With mouthwatering flavors like cashew, raisin, almond, and cranberry, these natural protein bars are sure to please even the pickiest of eaters. Parents can feel good about offering their children a snack that not only tastes great but also provides the essential nutrients they need to thrive.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">Making Healthier Choices Together:</h3>
            <p className="mb-6">
              By choosing Happy Bars as your family’s go-to snack, you’re not only nourishing your bodies but also instilling healthy eating habits that will last a lifetime. With options like these natural protein bars, you can feel good about fueling your family’s adventures, one delicious bite at a time.
            </p>

            <p className="mb-6">
              In the quest for nutritious snacks for busy families, Happy Bars stand out as a shining example of convenience, taste, and wholesome ingredients. From their all-natural formulation to their kid-approved flavors, these protein energy bars are a must-have for parents looking to simplify snack time without compromising on nutrition.
            </p>

            <p className="font-bold text-[#333333] mb-12">
              Join the happy snacking revolution and fuel your family’s adventures with Happy Bars!
            </p>

            {/* Bottom Navigation Links */}
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold gap-4 uppercase tracking-wider">
              <Link to="/blog/fueling-workouts" className="text-[#e91e63] hover:underline text-center">
                ← Prev: Fueling Your Workouts with Happy Bars
              </Link>
              <Link to="/blog/fuel-your-wellbeing" className="text-[#e91e63] hover:underline text-center">
                Next: Fuel Your Well-being with Happy Bars : A Natural Protein Energy Solution →
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

export default HappyBarsParentsKidsPage
