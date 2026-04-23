import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ShopNowSection } from '../components/ShopNowSection';

const PrivacyPolicyUI = () => {
  const combos = [
    {
      title: "Almond Cranberry",
      subTitle: "Cashew Raisin",
      count: "Combo Box of 6",
      desc: "Embark on a flavor-packed journey with our Combo Box featuring the dynamic duo of Almond Cranberry and Cashew Raisin.",
      img: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/AC-CR-top.webp" // Replace with actual combo pack image
    },
    {
      title: "Almond Cranberry, Cashew Raisin,",
      subTitle: "Coconut Almond, Date Almond Cranberry",
      count: "Combo Box of 12",
      desc: "Enjoy a snack symphony with our Combo Box featuring Almond Cranberry, Cashew Raisin, Coconut Almond, and Date Almond Cranberry. Each flavor is a unique and delicious experience, ensuring a diverse snacking delight for every taste bud.",
      img: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/AC-CR-top.webp",
      featured: true
    },
    {
      title: "Coconut Almond",
      subTitle: "Date Almond Cranberry",
      count: "Combo Box of 6",
      desc: "Savor the delightful medley of flavors in our Combo Box, featuring the irresistible pairing of Coconut Almond and Date Almond Cranberry.",
      img: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/AC-CR-top.webp"
    }
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* 1. Header Section - Blue Background */}
      <section className="bg-[#4ba9d4] pt-20 pb-16 text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl md:text-[120px] font-black tracking-tighter leading-none mb-0"
        >
          POLICIES
        </motion.h1>
        <h2 className="text-3xl md:text-5xl font-black text-[#1d4289] italic -mt-2 md:-mt-6">
          Privacy Policy
        </h2>

        {/* 2. Privacy Policy Document Container */}
         <div className="min-h-screen  py-12">
      {/* Privacy Policy Document Container */}
      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 text-left text-slate-700 leading-relaxed overflow-hidden">
       
        
        <div className="space-y-6 text-sm md:text-base max-w-5xl">
          <p>
            Welcome to <strong>thehappyfoodcompany.com</strong>, a website owned and operated by Angstrohm Foods Pvt Ltd 
            (“Angstrohm” or “we”), a registered company in India. Angstrohm Foods Pvt Ltd, (we, us, our) is committed 
            to protecting your personal information.
          </p>
          
          <p>
            This Privacy Policy sets out how we handle personal information that we may collect from you, including 
            when you visit any of our brand websites or social media pages, get in contact or correspond with us and 
            enter our brand promotions. Personal information may include, but is not limited to, your name, email 
            address, mailing address, phone number, date of birth and gender (Personal Information).
          </p>

          <h2 className="text-xl font-black text-[#1d4289] pt-4">
            We will only use Personal Information we collect from you for lawful purposes which may include:
          </h2>
          <ul className="list-none space-y-2">
            {[
              "to personalize any future communications to you;",
              "to manage and develop our promotions and to contact you in relation to our promotions, including if you are a winner of a particular promotion;",
              "to send marketing communications to you which include but are not limited to emails, texts or notifications relating to our brands, products, promotions or services or those of our related companies or strategic partners;",
              "for our administrative purposes and for internal record keeping;",
              "to improve the experience across our digital assets;",
              "to undertake customer service activities such as responding to any queries, comments or complaints you may have;",
              "for marketing analytics and research purposes;",
              "to comply with relevant laws and regulations;",
              "for any other specific purpose which we notify you of at the time your Personal Information is collected."
            ].map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-[#4ba9d4] font-bold">•</span> 
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p>
            Prior to sending you marketing communications relating to our brands, products, promotions or services 
            or those of our related companies or strategic partners, on the first occasion you provide Personal 
            Information to us, you will be asked if you wish to opt in to these marketing communications.
          </p>

          <p>
            You may opt out of receiving marketing communications relating to our brands, products, promotions, 
            services or those of our related companies or strategic partners at any time by following the opt-out 
            instructions provided.
          </p>

          <p>
            All Personal Information is collected and held by Angstrohm Foods Pvt Ltd or by our related companies 
            in jurisdictions outside of India. However, we may also store your Personal Information within technology 
            platforms and databases operated by third parties. We will take reasonable precautions against unauthorized 
            use, access, and disclosure by those third parties.
          </p>

          <h2 className="text-xl font-black text-[#1d4289] pt-4">We will not share your Personal Information with third parties except:</h2>
          <ul className="list-none space-y-2">
            {[
              "we may publish your name in connection with a promotion if you are a winner;",
              "where necessary and only to the extent necessary for the third parties to provide services to us in connection with our promotions;",
              "to our third-party business partners including marketing and advertising companies, data processing companies, and data analysis companies to conduct sales, marketing, and advertising research and analysis on our behalf;",
              "to third party data processing agents to assist us in providing our services to you;",
              "to third party survey analysis agencies (we contractually obligate these third parties to protect the confidentiality of customer survey information) to assist us in improving our services."
            ].map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-[#4ba9d4] font-bold">•</span> 
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p>
            Except as described in this Privacy Policy, we will not disclose or use your Personal Information without 
            your permission unless required or permitted by law.
          </p>

          <p>
            Your Personal Information remains yours. You may request details of the Personal Information that is held 
            by us and we will delete it or correct it if you ask us to do so. You may contact us using the contact 
            information below.
          </p>

          <p>
            We take reasonable precautions to make sure that we keep your Personal Information secure and comply with 
            our obligations in relation to the security of your Personal Information that is held by us to address 
            risks such as loss, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>

          <p>
            Where you have authorized us to disclose your Personal Information to third parties, their use and 
            maintenance of your Personal Information is outside our control and we accept no responsibility or 
            liability for such third-party use. These third parties may have separate and independent privacy 
            policies which will govern your Personal Information disclosed to them.
          </p>

          <p>
            We may update this Privacy Policy from time to time.
          </p>

          <p>
            From time to time, Angstrohm Foods Pvt Ltd may offer certain promotions. Our promotions may contain links 
            to third party websites or applications. We are not responsible for the privacy practices or content of 
            third party websites or applications. These third party websites may have separate and independent privacy 
            policies, and we encourage you to investigate and ask questions before disclosing any information to the 
            operators of third party websites.
          </p>

          <p>
            Your participation in our promotions is also governed by any applicable Terms and Conditions of Entry. 
            Please read these carefully, as you agree to them by your entry to the relevant promotion.
          </p>

          <p>
            By using or accessing our digital platforms or entering our promotions, you are deemed to have agreed to 
            our Privacy Policy (as amended from time to time). Be sure to review this Privacy Policy periodically to 
            ensure familiarity with its most current version. If you disagree with the changes in our Privacy Policy, 
            please do not use our digital platforms after the posting of such changes online. Please note that if you 
            elect not to provide certain information to us, we may not be able to provide you with the products, 
            services or information you require.
          </p>

          <p className="italic">
            “Cookie” technology enables the Websites or service provider’s system to recognize your browser and 
            capture and remember certain information. We use cookies to understand and save your preferences for 
            future visits, to enable ad serving on our Websites and to compile aggregate data about Websites traffic 
            and interaction so that we can offer a better Websites experience and tools in the future. We may contract 
            with third party service providers to assist us in better understanding our Websites visitors.
          </p>

          <h2 className="text-xl font-black text-[#1d4289] pt-4">Contact Us</h2>
          <p>
            If there are any questions regarding this Privacy Policy or you would like to request correction to your 
            Personal Information that we hold, you may contact us using the information below:
          </p>
          
          <div className="mt-6 p-6 bg-slate-50 rounded-2xl border-l-4 border-[#4ba9d4]">
            <p className="font-bold text-[#1d4289] text-lg">Angstrohm Foods Pvt Ltd</p>
            <p>3rd Floor, Krishna Arcade,</p>
            <p>No. 17, S K NAGAR, KODIGEHALLI,</p>
            <p>Bengaluru, Karnataka, 560092</p>
            <p className="mt-2">
              <span className="font-bold text-[#1d4289]">Email:</span>{' '}
              <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-[#ff4081] hover:underline">
                woohoo@thehappyfoodcompany.com
              </a>
            </p>
            <p className="text-xs mt-4 font-black uppercase text-slate-400 tracking-widest">
              Effective as of January 11, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
      </section>

      {/* 3. Combo Products Section - White/Cream Background */}
      <ShopNowSection />
    </div>
  );
};

export default PrivacyPolicyUI;