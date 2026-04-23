import { Link } from 'react-router-dom';
import { ShopNowSection } from '../components/ShopNowSection';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="w-full flex-col items-center bg-white overflow-hidden mt-[10vh]">
      
      {/* Logos Header */}
      <div className="w-full bg-[#c9ebfa] py-8 flex justify-center items-center gap-12 md:gap-32 shadow-inner">
        <div className="flex flex-col items-center">
         <img src='https://thehappyfoodcompany.com/wp-content/uploads/2024/01/LOGO-ANGSTROHM-FOODS.png' alt="Angstrohm Foods Logo" className="h-16 md:h-24 object-contain drop-shadow-md" />
        </div>
        <img src="/images/logo.png" alt="Happy Bar Logo" className="h-16 md:h-24 object-contain drop-shadow-md" />
      </div>

      {/* 3 Column Hero Section */}
      <div className="w-full flex flex-col lg:flex-row min-h-[500px]">
        {/* Column 1: Kids Approved */}
        <div className="flex-1 bg-[#8bdcf8] relative flex flex-col justify-between items-center overflow-hidden group">
          
             <img src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/kids-approved.webp" onError={(e) => (e.currentTarget.src = '/images/logo.png')} alt="Kid cheering" className="object-contain  drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />
         
        </div>

        {/* Column 2: Text Block */}
        <div className="flex-1 bg-[#3f4a86] p-10 md:p-14 flex flex-col justify-center items-center text-center text-white relative">
           <h2 className="text-[26px] md:text-[30px] font-black mb-8 tracking-wide">Growing People. Powering Minds.</h2>
           
           <p className="text-[15px] font-bold leading-relaxed mb-6 font-sans">
             The Happy Food Company (Angstrohm Foods Private Limited) (est. 2019) is a specialty food manufacturer focusing on healthy, protein rich nutrition snacks for the family. In collaboration & under license from Happy Bar Inc. (USA), Angstrohm Foods creates amazing products that are perfect for children and adults alike.
           </p>
           
           <p className="text-[15px] font-bold leading-relaxed font-sans">
             The proprietary recipes developed by the scientists at Happy Bar and Angstrohm Foods combine natural ingredients to create tasty and healthy nutrition bars that taste like family recipes.
           </p>
        </div>

        {/* Column 3: Fuel Your Day */}
        <div className="flex-1 bg-[#f0dfab] relative flex flex-col justify-center items-center  overflow-hidden group">
            
            
               <img src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-your-day-happy-bar.webp" onError={(e) => (e.currentTarget.style.display = 'none')} alt="Heart kids" className="object-contain h-full drop-shadow-xl z-10 relative transition-transform duration-500 group-hover:scale-105" />
               
          
        </div>
      </div>

      {/* BOING Section */}
      <div className="w-full relative min-h-[450px] flex items-center justify-center bg-[#51ace3] overflow-hidden pt-16">
        {/* Abstract Sky Shapes */}
        <div className="absolute top-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[120%] h-[200px] bg-white rounded-[100%] rotate-3"></div>
          <div className="absolute top-[30%] left-[-20%] w-[150%] h-[300px] bg-[#66C9F3] rounded-[100%] -rotate-2"></div>
        </div>

        {/* Sandy wave bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[35%] bg-[#ecdba8] z-10">
          <svg className="absolute -top-[55px] w-full h-[60px] text-[#ecdba8]" viewBox="0 0 1440 60" preserveAspectRatio="none">
             <path fill="currentColor" d="M0,60 L1440,60 L1440,0 C1100,50 800,10 450,25 C200,35 100,15 0,0 Z"></path>
          </svg>
          {/* subtle sand variation */}
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-[#f4cb76]">
             <svg className="absolute -top-[30px] w-full h-[35px] text-[#f4cb76]" viewBox="0 0 1440 35" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,35 L1440,35 L1440,0 C1200,20 900,5 600,15 C300,25 150,5 0,0 Z"></path>
             </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl h-full mt-[-40px]">
          <div className="flex-1 text-center items-center flex flex-col justify-center">
            <h2 className="text-[#de4934] text-[48px] font-black mb-4 uppercase tracking-wide drop-shadow-sm" style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}>
              About BOING
            </h2>
            <p className="text-white text-[20px] font-bold  w-[600px] text-center font-sans">
              BOING is the mascot of purpose and focus.<br/>
              BOING is the ostrich that kept its eyes on the<br/>
              egg, guarded and nurtured it till it hatched<br/>
              without being distracted. BOING is telling us<br/>
              that good things come from keeping your eyes<br/>
              on a higher power, a job at hand or staying<br/>
              focused.
            </p>
          </div>
          
          <div className="w-[300px] flex justify-center items-end self-end relative pb-6">
             <div className="absolute top-10 left-10 flex flex-col gap-2 opacity-80">
                <span className="text-red-500 text-2xl -rotate-12">❤</span>
                <span className="text-red-500 text-xl rotate-12 ml-6">❤</span>
                <span className="text-red-500 text-sm -rotate-6 ml-12">❤</span>
             </div>
             {/* Boing and Egg Placeholder */}
             <img src="https://thehappyfoodcompany.com/wp-content/uploads/2024/01/HB_Boing_500.png" onError={(e) => (e.currentTarget.src = '/images/logo.png')} alt="BOING Mascot" className="object-contain h-[260px] drop-shadow-xl pl-8" />
             <div className="absolute bottom-[20px] left-0 w-24 h-16 bg-[#e5dfc9] rounded-[40%] border-b-4 border-[#b9a980] shadow-md -z-10"></div>
          </div>
        </div>
      </div>

      {/* SHOP Section */}
      <ShopNowSection />
    </div>
  );
};
