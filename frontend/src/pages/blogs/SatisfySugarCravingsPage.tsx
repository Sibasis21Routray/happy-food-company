import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import YouMayLike from "../../components/blogs/YouMayLike";

export const SatisfySugarCravingsPage: React.FC = () => {
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
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-extrabold text-center px-4 max-w-5xl tracking-tight">
          Satisfy your Sugar Cravings <br /> Naturally
        </h1>

        {/* Thin Orange/Gold accent line at the very bottom edge */}
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent opacity-50" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-24 relative z-20 pb-20">
        {/* Feature Image Card */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-3/5 bg-white p-2 rounded-2xl shadow-xl">
            <img
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/craving-control-400x250.webp"
              alt="Cravings Control"
              className="rounded-xl w-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-[#b04b6e] font-semibold text-sm">
            <span className="p-2 rounded-lg text-[#7a7a7a]"><Calendar size={20}/></span>
            <span>June 1, 2024</span>
          </div>
        </div>

        {/* Blog Article Body */}
        <article className="max-w-none text-[#7a7a7a] font-normal leading-relaxed text-[15px]">
          <h2 className="text-lg font-bold text-[#444444] mb-4">
            Satisfying your Sugar Cravings Naturally
          </h2>
          <p className="mb-6">
            In the vibrant landscape of modern nutrition, the quest for energy
            bars low in sugar and natural protein bars becomes paramount.{" "}
            <Link to="/" className="text-[#e91e63] hover:underline font-medium">
              The Happy Food Company
            </Link>{" "}
            has risen to the challenge, crafting Happy Bars—the epitome of 100%
            natural energy bars that cater to our innate cravings without the
            health drawbacks associated with excessive sugar intake.
          </p>

          <h3 className="text-md font-bold text-[#444444] mt-8 mb-4">
            The Cravings of Sugar and the Problems That Come With It
          </h3>
          <p className="mb-6">
            Our brains are wired to seek out sugar, triggering a release of
            dopamine that can lead to a cycle of cravings and overeating. This
            pursuit of sweetness, if left unchecked, can spiral into sugar
            addiction, with dire health consequences like diabetes and heart
            disease. The Happy Food Company recognizes these pitfalls and has
            mindfully created Happy Bars as a solution—a natural protein energy
            bar that satisfies without the risks.
          </p>

          <h3 className="text-md font-bold text-[#444444] mt-8 mb-4">
            Understanding the Sugar Trap
          </h3>
          <p className="mb-6">
            The allure of sugar is undeniable. It activates our brain's reward
            system, releasing feel-good chemicals such as dopamine. This
            response makes our desire for sugar grow stronger, potentially
            leading to sugar addiction and an overeating habit. Happy Bars break
            this cycle by offering a naturally sweetened alternative that
            satisfies cravings without the addictive properties of refined
            sugar.
          </p>

          <h3 className="text-md font-bold text-[#444444] mt-8 mb-4">
            Happy Bar: The Perfect Wholesome Snacking Partner
          </h3>
          <p className="mb-6">
            Happy Bars are made with a focus on natural sweetness, avoiding
            artificial sweeteners and added sugars. Our key ingredients include
            jaggery, a traditional, unrefined sugar that is made from sugar cane
            juice, rich in minerals, bringing a warm, caramel-like sweetness to
            the bars. Combined with nuts like cashews, almonds, and dried fruits
            like raisins and cranberries, each bar provides a balanced mix of
            protein, healthy fats, and complex carbohydrates.
          </p>

          <h3 className="text-md font-bold text-[#444444] mt-8 mb-4">
            The Health Benefits of Choosing Happy Bars
          </h3>
          <p className="mb-6">
            By choosing Happy Bars over conventional sugary snacks, you're not
            just avoiding empty calories—you're actively nourishing your body.
            The natural ingredients support sustained energy release, help
            maintain stable blood sugar levels, and provide essential nutrients
            that refined sugar snacks lack. Whether you're managing weight,
            supporting an active lifestyle, or simply seeking healthier
            snacking options, Happy Bars deliver on both taste and nutrition.
          </p>

          <h3 className="text-md font-bold text-[#444444] mt-8 mb-4">
            Making the Switch to Natural Sweetness
          </h3>
          <p className="mb-6">
            Transitioning away from refined sugar doesn't mean sacrificing
            flavor. Happy Bars prove that natural ingredients can create
            delicious, satisfying snacks that your body will thank you for.
            Start by replacing one sugary snack per day with a Happy Bar, and
            you'll notice improved energy levels, fewer cravings, and better
            overall health.
          </p>

          {/* Navigation Links */}
          <div className="mt-12 mb-20 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200 pt-8">
            <Link
              to="/blog/unwrapping-happiness-ingredients"
              className="text-[#e91e63] text-xs font-bold hover:underline text-center"
            >
              ← Prev: Unwrapping Happiness: A Closer Look at the Wholesome Ingredients of Happy Bars
            </Link>
            <Link
              to="/blog/fueling-your-day-with-happy-bars"
              className="text-[#e91e63] text-xs font-bold hover:underline text-center"
            >
              Next: Fueling Your Day with Happy Bars: A Nutrient Powerhouse →
            </Link>
          </div>
        </article>

        {/* You May Also Like Section */}
        <YouMayLike />
      </div>
    </div>
  );
};