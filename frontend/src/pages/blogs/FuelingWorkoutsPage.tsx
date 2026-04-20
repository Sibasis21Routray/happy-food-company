import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import YouMayLike from '../../components/blogs/YouMayLike'

export default function FuelingWorkoutsPage() {
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
          Fueling Your Workouts with Happy Bars
        </h1>

        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-20 pb-20">
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-workout-protein-pro.webp"
              alt="Fueling Your Workouts"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2 rounded-lg text-[#7a7a7a]"><Calendar size={20}/></span>
            <span>April 20, 2024</span>
          </div>
        </div>

        {/* White Article Card */}
        <div className="bg-white  p-8 md:p-16 border-slate-50">
          <article className="text-[#555555] leading-[1.8] text-[16px] font-normal">
            
            <h3 className="text-lg font-bold text-[#333333] mb-4">Introduction</h3>
            <p className="mb-6">
              As fitness enthusiasts, we understand the importance of nourishing our bodies before and after exercise. Whether you're hitting the gym, going for a run, or practicing yoga, the right nutrients play a crucial role in maximizing performance and recovery. In this blog post, we'll delve into why Happy Bars are the perfect pre- and post-workout protein bars for fitness, packed with energy and essential nutrients.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mt-10 mb-4">Why Fuel Matters</h3>
            <p className="mb-4">Before we dive into the specifics of Happy Bars, let's emphasize why proper fueling matters:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Boosting Performance:</strong> When you fuel your body adequately, you enhance endurance, strength, and overall performance during workouts.</li>
              <li><strong>Supporting Recovery:</strong> After a strenuous session, your muscles need replenishment. Proper nutrition aids in muscle repair and reduces soreness.</li>
              <li><strong>Sustaining Energy Levels:</strong> Whether you're lifting weights or doing cardio, maintaining steady energy levels is essential. Happy Bars provide that sustained energy punch.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#333333] mt-12 mb-6">Happy Bars: Your Workout Allies</h3>
            
            <h4 className="text-lg font-bold text-[#444444] mb-4">1. Energy Bars for Fitness</h4>
            <p className="mb-4">
              Happy Bars are purposefully designed to fuel your fitness journey. They're not just any energy bars; they're your workout allies. Let's explore why:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Natural Ingredients:</strong> Happy Bars are crafted to be 100% natural protein bars, crafted from 100% natural ingredients. No artificial additives, just wholesome goodness.</li>
              <li><strong>Balanced Macronutrients:</strong> Each bar combines the power of protein, healthy fats, and complex carbohydrates. The ideal blend for sustained energy during your workouts and after the workout to aid in your muscle recovery!</li>
              <li><strong>Cashew, Coconut, Raisin, Almond, and Cranberry Varieties:</strong> Choose your favorite flavours! Whether you crave the exotically enticing coconut or the sweet tanginess of cranberries, Happy Bars have you covered.</li>
            </ul>

            <h4 className="text-lg font-bold text-[#444444] mt-8 mb-4">2. Protein Energy Bars</h4>
            <p className="mb-4">
              Protein is the building block of muscle repair. Happy Bars deliver a protein punch without compromising on taste:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Natural Protein:</strong> Our bars contain all-natural protein energy bars. No artificial isolates—just pure goodness.</li>
              <li><strong>Cashew Protein Bars:</strong> Creamy cashews meet protein power. A match made in workout heaven.</li>
              <li><strong>Raisin Protein Bars:</strong> Sweet and satisfying, these bars provide the necessary amino acids for muscle recovery.</li>
              <li><strong>Almond Protein Bars:</strong> Almonds bring their crunch and protein prowess to the table.</li>
              <li><strong>Cranberry Protein Bars:</strong> A burst of antioxidants and protein to keep you going.</li>
            </ul>

            <h4 className="text-lg font-bold text-[#444444] mt-8 mb-4">3. Low Sugar, High Impact</h4>
            <p className="mb-6">
              Happy Bars are mindful of your sugar intake. We believe in natural sweetness. Happy Bars won't send your blood sugar on a rollercoaster ride. These bars are not just about fitness; they're about overall well-being.
            </p>

            <h4 className="text-lg font-bold text-[#444444] mt-8 mb-4">4. Pre- and Post-Workout Rituals</h4>
            <ul className="list-disc pl-6 mb-10 space-y-2">
              <li><strong>Pre-Workout:</strong> Grab a Happy Bar about 30 minutes before your session. The balanced nutrients will power you through.</li>
              <li><strong>Post-Workout:</strong> Your muscles are craving replenishment. Enjoy a Happy Bar within an hour after exercise to kickstart recovery.</li>
            </ul>

            <h3 className="text-lg font-bold text-[#333333] mb-4">Conclusion</h3>
            <p className="mb-4">
              Happy Bars aren't just snacks; they're your fitness companions. Whether you're hitting the trails, lifting weights, or practicing downward dog, these bars provide the energy and nutrients you need, and are the perfect energy bars for fitness. Fuel your workouts with{' '}
              <Link to="/" className="text-[#e91e63] font-bold hover:underline">
                Happy Bars
              </Link>{' '}
              and embrace a healthier, happier you!
            </p>
            
            <p className="mb-12">
              Remember: Nutrition fuels greatness. Happy Bars fuel you.
            </p>

            {/* Bottom Navigation Links */}
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold gap-4 uppercase tracking-wider">
              <Link to="/blog/craving-control-weight-loss" className="text-[#e91e63] hover:underline text-center">
                ← Prev: Craving Control: How Protein Bars Can Support Your Weight Loss Journey
              </Link>
              <Link to="/blog/happy-bars-parents-kids" className="text-[#e91e63] hover:underline text-center">
                Next: Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go →
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