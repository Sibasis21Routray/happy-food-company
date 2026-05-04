import { motion } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="w-full bg-white pt-24 pb-16 overflow-hidden">
      
      {/* Header Section with Animation */}
       <motion.div
  className="py-16 mb-12"
  style={{
    backgroundImage: "url('https://img.freepik.com/premium-vector/blue-background-with-line-that-says-blue-vector-illustration-autumn-leaves_1007350-15391.jpg')",
    backgroundSize: "fill",
    backgroundPosition: "center",
    // backgroundRepeat: "no-repeat"
  }}
>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-3">About Us</h1>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
          <p className="text-gray-400 text-sm font-light mt-4 max-w-md mx-auto">
            Crafting happiness through healthy nutrition since 2019
          </p>
        </div>
      </motion.div>

      {/* Logos Row with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="border-y border-gray-100 py-8 mb-12"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <img 
                src='https://thehappyfoodcompany.com/wp-content/uploads/2024/01/LOGO-ANGSTROHM-FOODS.png' 
                alt="Angstrohm Foods Logo" 
                className="h-12 md:h-14 object-contain opacity-80"
              />
              <span className="text-[10px] text-gray-400 mt-2 tracking-wider">ANGSTROHM FOODS</span>
            </motion.div>
            <div className="w-px h-8 bg-gray-200 hidden sm:block" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <img 
                src="/images/logo.png" 
                alt="Happy Bar Logo" 
                className="h-12 md:h-14 object-contain" 
              />
              <span className="text-[10px] text-gray-400 mt-2 tracking-wider">HAPPY BAR</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Three Column Section with Images */}
      <div className="container mx-auto px-6 max-w-7xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
          
          {/* Column 1 - Kids Approved */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-gray-50 overflow-hidden"
          >
            <div className="h-64 overflow-hidden bg-[#8bdcf8] flex items-center justify-center">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/kids-approved.webp" 
                alt="Kids approved" 
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-light text-gray-700 mb-2">Kids Approved</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Loved by children and parents alike. Delicious taste that kids enjoy, with nutrition that parents trust.
              </p>
            </div>
          </motion.div>

          {/* Column 2 - Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-900 p-8 text-center flex flex-col justify-center"
          >
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl font-light text-white mb-4"
            >
              Growing People. Powering Minds.
            </motion.h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-gray-600 mx-auto my-4"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-gray-300 text-sm font-light leading-relaxed mb-4"
            >
              The Happy Food Company (Angstrohm Foods Private Limited) (est. 2019) is a specialty food manufacturer focusing on healthy, protein rich nutrition snacks for the family.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-gray-300 text-sm font-light leading-relaxed"
            >
              In collaboration & under license from Happy Bar Inc. (USA), Angstrohm Foods creates amazing products that are perfect for children and adults alike.
            </motion.p>
          </motion.div>

          {/* Column 3 - Fuel Your Day */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-gray-50 overflow-hidden"
          >
            <div className="h-64 overflow-hidden bg-[#f0dfab] flex items-center justify-center">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-your-day-happy-bar.webp" 
                alt="Fuel your day" 
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-light text-gray-700 mb-2">Fuel Your Day</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Natural ingredients combined to create tasty and healthy nutrition bars that taste like family recipes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOING Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 py-16 mb-16"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">About BOING</h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-px bg-gray-300 mx-auto md:mx-0 mb-6"
              />
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gray-500 text-sm font-light leading-relaxed"
              >
                BOING is the mascot of purpose and focus. BOING is the ostrich that kept its eyes on the egg, 
                guarded and nurtured it till it hatched without being distracted. BOING reminds us that good 
                things come from keeping your eyes on a higher power, a job at hand or staying focused.
              </motion.p>
            </motion.div>

            {/* Mascot Image with Floating Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 flex justify-center"
            >
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <img 
                  src="https://thehappyfoodcompany.com/wp-content/uploads/2024/01/HB_Boing_500.png" 
                  alt="BOING Mascot" 
                  className="w-48 md:w-56 h-auto object-contain"
                  onError={(e) => (e.currentTarget.src = '/images/logo.png')}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 max-w-7xl mb-16"
      >
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white border border-gray-100 p-8 text-center max-w-3xl mx-auto"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-gray-500 text-sm font-light leading-relaxed italic"
          >
            "The proprietary recipes developed by the scientists at Happy Bar and Angstrohm Foods combine 
            natural ingredients to create tasty and healthy nutrition bars that taste like family recipes."
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px bg-gray-200 mx-auto mt-6"
          />
        </motion.div>
      </motion.div>

      {/* Shop Section */}
      <ShopNowSection />
    </div>
  );
};