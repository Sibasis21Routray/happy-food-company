import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import YouMayLike from '../../components/blogs/YouMayLike'

function NourishEnergizeThrivePage() {
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
          Nourish, Energize, Thrive: The Happy Bar Way
        </h1>

        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-20 pb-20">
        
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/nourish-energize-thrive.webp"
              alt="Nourish, Energize, Thrive"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2 rounded-lg text-[#7a7a7a]"><Calendar size={20}/></span>
            <span>May 18, 2024</span>
          </div>
        </div>

        {/* White Article Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-50">
          <article className="text-[#555555] leading-[1.8] text-[16px] font-normal">
            
            <p className="mb-6">
              In the tapestry of modern life, where every thread intertwines with the pursuit of wellness, we find ourselves on a journey that is as unique as it is universal. It's a journey that takes us through the bustling avenues of daily routines, past the crossroads of countless choices, and along the tranquil paths of self-care. At the heart of this journey lies the quest for balance—a harmony of body, mind, and spirit that we strive to achieve amidst the cacophony of the world around us.
            </p>

            <p className="mb-6">
              Enter Happy Bars, the quintessential natural protein energy bars for the discerning palate and the health-conscious soul. Crafted for those who navigate the vibrant mosaic of modern living with intention, Happy Bars are more than just a treat; they are a testament to the belief that what we eat should fuel us, delight us, and bring us closer to the equilibrium we seek.
            </p>

            <p className="mb-10">
              With every bite, Happy Bars offer a moment of respite, a taste of serenity, and a nourishing embrace for the body. They stand as a beacon for those who are mindful of their nutrition, who understand that every ingredient holds the power to contribute to their well-being. In a world where balance is the ultimate luxury, Happy Bars—whether you choose almond energy bars, cranberry energy bars, or cashew protein bars—are the accessible indulgence that brings us one step closer to the wellness we desire.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mb-4">Daylong Delight: A Happy Bar Journey</h3>
            <p className="mb-6">
              The dawn's light greets you, heralding a day full of potential. In the calm of your kitchen, you assemble a nourishing breakfast: Greek yogurt, fresh berries, and a crunchy almond Happy Bar. This combination of protein and fiber is the ideal start to your day.
            </p>
            <p className="mb-6">
              By mid-morning, hunger nudges you. You effortlessly choose a raisin Happy Bar, its natural sweetness and antioxidants keeping you sharp and energized.
            </p>
            <p className="mb-6">
              Lunch is a feast for the senses—a medley of greens and grilled chicken, complemented by a cranberry Happy Bar. Its vibrant flavor and energy-boosting qualities keep you feeling full and agile.
            </p>
            <p className="mb-6">
              As the afternoon wanes, a cashew Happy Bar is your chosen snack, its creamy texture and rich flavor providing the stamina to end your day strong.
            </p>
            <p className="mb-10">
              In the evening's tranquility, a natural Happy Bar serves as a guilt-free dessert, its dates and jaggery offering just the right touch of sweetness. Reflecting on your day, you appreciate how Happy Bars have seamlessly supported your health and well-being, making each choice a step towards balance.
            </p>

            <h3 className="text-lg font-bold text-[#333333] mb-4">Happy Bars and Fitness: A Nutritional Symphony for Active Lifestyles</h3>
            <p className="mb-6">
              Whether you're unrolling your yoga mat, lacing up your running shoes, or gearing up for a gym session, Happy Bars are the ideal natural protein energy bars to complement your fitness routine. These 100% natural energy bars are designed to meet the demands of your active lifestyle, providing sustained energy, muscle repair, and recovery support.
            </p>

            <div className="space-y-8">
              <section>
                <h4 className="font-bold text-[#333333] mb-2">Carbohydrates: The Foundation of Fitness Fuel</h4>
                <p>
                  As the primary source of energy during moderate to high-intensity exercise, carbohydrates are crucial. Happy Bars, with their natural{' '}
                  <Link to="/ingredients" className="text-[#e91e63] font-bold hover:underline">
                    ingredients
                  </Link>{' '}
                  like dates and jaggery, offer a healthy dose of carbohydrates. These natural energy bars are perfect for storing glycogen in muscles, ensuring that you have a readily available fuel source for physical activities like yoga, running, or weightlifting.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Proteins: The Building Blocks of Muscle</h4>
                <p>
                  Proteins are essential for muscle repair and growth, especially after a strenuous workout. Derived from nuts like almonds and cashews, the protein in Happy Bars helps heal the micro-tears that occur during exercise. Whether you're looking for protein bars for fitness or protein bars for health, Happy Bars provide a convenient source of protein to kickstart the recovery process.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Fats: The Endurance Energy Source</h4>
                <p>
                  The healthy fats found in ingredients like nuts and seeds in Happy Bars provide a sustained source of energy. This is particularly beneficial during longer, endurance-based activities. These fats also aid in the absorption of fat-soluble vitamins, which are vital for overall health and can aid in recovery, making Happy Bars an excellent choice for those seeking energy bars for diet and health.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-[#333333] mb-2">Micronutrients: The Recovery Assistants</h4>
                <p>
                  Vitamins and minerals are essential for recovery from training. They help reduce inflammation, promote healing, and may reduce the risk of injuries. Happy Bars, with their natural ingredients, provide a range of these micronutrients that support the body's recovery process, making them ideal energy bars for health.
                </p>
              </section>
            </div>

            <h3 className="text-lg font-bold text-[#333333] mt-12 mb-4">Yoga, Running, and Gym Workouts: The Happy Bar Advantage</h3>
            <p className="mb-6">
              For yoga practitioners, the balanced energy and nutritional support from Happy Bars can help maintain focus and flexibility throughout the practice. For runners, the quick-release energy from the natural sugars and the protein for muscle recovery make Happy Bars an excellent post-run snack. And for those in the gym, the protein supports muscle synthesis, and the carbs help replenish glycogen stores after a lifting session.
            </p>

            <p className="mb-10">
              In summary, Happy Bars are a valuable addition to any fitness enthusiast's diet, providing the necessary nutrients to support physical activity and aid in recovery. They offer a convenient, tasty, and healthful way to ensure your body gets what it needs to perform at its best and recover effectively.
            </p>

            <p className="italic font-bold text-[#444] mb-12">
              So consider making Happy Bars a part of your routine and experience the difference yourself!
            </p>

            {/* Bottom Navigation Links - FIXED ROUTES */}
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold gap-4">
              <Link to="/blog/fueling-your-day-with-happy-bars" className="text-[#e91e63] hover:underline uppercase tracking-wider text-center">
                ← Prev: Fueling Your Day with Happy Bars: A Nutrient Powerhouse
              </Link>
              <Link to="/blog/unwrapping-happiness-ingredients" className="text-[#e91e63] hover:underline uppercase tracking-wider text-center">
                Next: Unwrapping Happiness: A Closer Look at the Wholesome Ingredients of Happy Bars →
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

export default NourishEnergizeThrivePage