import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, FileText } from 'lucide-react';
import { ShopNowSection } from '../components/ShopNowSection';

const Term = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('terms'); // Default to terms

  const combos = [
    {
      title: "Almond Cranberry",
      subTitle: "Cashew Raisin",
      count: "Combo Box of 6",
      desc: "Embark on a flavor-packed journey with our Combo Box featuring the dynamic duo of Almond Cranberry and Cashew Raisin.",
      img: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/AC-CR-top.webp"
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
        
        {/* Tab Buttons */}
        

        <h2 className="text-3xl md:text-5xl font-black text-[#1d4289] italic -mt-2 md:-mt-6">
          {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        </h2>

        {/* Policy Document Container */}
        <div className="min-h-screen py-12">
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 text-left text-slate-700 leading-relaxed overflow-hidden">
            
            {activeTab === 'privacy' ? (
              <div className="space-y-6 text-sm md:text-base max-w-5xl">
                <p>
                  Welcome to <strong>thehappyfoodcompany.com</strong>, a website owned and operated by Angstrohm Foods Pvt Ltd 
                  ("Angstrohm" or "we"), a registered company in India. Angstrohm Foods Pvt Ltd, (we, us, our) is committed 
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
                  "Cookie" technology enables the Websites or service provider's system to recognize your browser and 
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
            ) : (
              <div className="space-y-6 text-sm md:text-base max-w-5xl">
                {/* Opening paragraphs */}
                <p>
                  Welcome to <strong>thehappyfoodcompany.com</strong>, a website owned and operated by Angstrohm Foods Pvt Ltd 
                  ("Angstrohm" or "we"), a registered company in India.
                </p>
                
                <p>
                  Throughout the site, the terms "we", "us" and "our" refer to Angstrohm. Angstrohm offers this website, 
                  including all information, tools and services available from this site to you, the user, conditioned upon 
                  your acceptance of all terms, conditions, policies and notices stated here.
                </p>

                <p>
                  By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound 
                  by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and 
                  conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all 
                  users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ 
                  or contributors of content.
                </p>

                <p>
                  Please read these Terms of Service carefully before accessing or using our website. By accessing or using 
                  any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms 
                  and conditions of this agreement, then you may not access the website or use any services. If these Terms 
                  of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                </p>

                <p>
                  Any new features or tools which are added to the current store shall also be subject to the Terms of Service. 
                  You can review the most current version of the Terms of Service at any time on this page. We reserve the right 
                  to update, change or replace any part of these Terms of Service by posting updates and/or changes to our 
                  website. It is your responsibility to check this page periodically for changes. Your continued use of or 
                  access to the website following the posting of any changes constitutes acceptance of those changes.
                </p>

                <p>
                  In addition to our own store hosted on https://thehappyfoodcompany.com, our products are also available online 
                  on amazon.in and flipkart.com. They provide us with the online e-commerce platform that allows us to sell our 
                  products and services to you.
                </p>

                {/* SECTION 1 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 1 – ONLINE STORE TERMS</h2>
                <ul className="list-none space-y-2 mt-2">
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> By agreeing to these Terms of Service, you represent that you are at least 18 years old.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> You must not transmit any worms or viruses or any code of a destructive nature.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> A breach or violation of any of the Terms will result in an immediate termination of your Services.</li>
                </ul>

                {/* SECTION 2 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 2 – GENERAL CONDITIONS</h2>
                <ul className="list-none space-y-2 mt-2">
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> We reserve the right to refuse service to anyone for any reason at any time.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</li>
                </ul>

                {/* SECTION 3 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 3 – ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h2>
                <ul className="list-none space-y-2 mt-2">
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</li>
                </ul>

                {/* SECTION 4 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES</h2>
                <ul className="list-none space-y-2 mt-2">
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> Prices for our products are subject to change without notice.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</li>
                </ul>

                {/* SECTION 5 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 5 – PRODUCTS OR SERVICES</h2>
                <ul className="list-none space-y-2 mt-2">
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> Certain products or services may be available exclusively online through the website or partner websites. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.</li>
                  <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">•</span> We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.</li>
                </ul>

                {/* SECTION 6 - REFUND POLICIES */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 6 – REFUND POLICIES</h2>
                <div className="mt-2 space-y-3">
                  <p><strong>Our policy lasts 7 days.</strong> If 7 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
                  <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
                  <p>To complete your return, we require a receipt or proof of purchase.</p>
                  <p>There are certain situations where refunds are not possible or only partial refunds are granted at our discretion.</p>
                  <ul className="list-none space-y-1 ml-4">
                    <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">–</span> Any item not in its original condition, is damaged or missing parts for reasons not due to our error</li>
                    <li className="flex gap-2"><span className="text-[#4ba9d4] font-bold">–</span> Any item that is returned more than 7 days after delivery</li>
                  </ul>
                  <p className="font-bold mt-3">Refunds:</p>
                  <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                  <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
                  <p className="font-bold mt-3">Late or missing refunds:</p>
                  <p>If you haven't received a refund yet, first check your bank account again.</p>
                  <p>Then contact your credit card company, it may take some time before your refund is officially posted.</p>
                  <p>Next contact your bank. There is often some processing time before a refund is posted.</p>
                  <p>If you've done all of this and you still have not received your refund yet, please contact us at <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-[#ff4081] hover:underline">woohoo@thehappyfoodcompany.com</a></p>
                  <p className="font-bold mt-3">Sale items:</p>
                  <p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded. Some of the sales items may have a shorter expiry date.</p>
                  <p className="font-bold mt-3">Shipping:</p>
                  <p>To return your product, you should mail your product to:</p>
                  <p className="font-semibold">Angstrohm Foods Pvt Ltd<br />3rd Floor, Krishna Arcade,<br />No. 17, S K NAGAR, KODIGEHALLI,<br />Bengaluru, Karnataka, 560092</p>
                  <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                  <p>Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>
                  <p>We don't guarantee that we will receive your returned item.</p>
                </div>

                {/* SECTION 7 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 7 – ACCURACY OF BILLING AND ACCOUNT INFORMATION</h2>
                <p className="mt-2">We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.</p>
                <p className="mt-2">You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>
                <p className="mt-2">For more detail, please review our Returns Policy.</p>

                {/* SECTION 8 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 8 – OPTIONAL TOOLS</h2>
                <p className="mt-2">We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</p>
                <p className="mt-2">You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</p>
                <p className="mt-2">Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</p>
                <p className="mt-2">We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.</p>

                {/* SECTION 9 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 9 – THIRD-PARTY LINKS</h2>
                <p className="mt-2">Certain content, products and services available via our Service may include materials from third-parties.</p>
                <p className="mt-2">Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.</p>
                <p className="mt-2">We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.</p>

                {/* SECTION 10 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 10 – USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h2>
                <p className="mt-2">If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.</p>
                <p className="mt-2">We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.</p>
                <p className="mt-2">You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.</p>

                {/* SECTION 11 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 11 – PERSONAL INFORMATION</h2>
                <p className="mt-2">Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.</p>

                {/* SECTION 12 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 12 – ERRORS, INACCURACIES AND OMISSIONS</h2>
                <p className="mt-2">Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</p>
                <p className="mt-2">We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.</p>

                {/* SECTION 13 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 13 – PROHIBITED USES</h2>
                <p className="mt-2">In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>

                {/* SECTION 14 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 14 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h2>
                <p className="mt-2">We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</p>
                <p className="mt-2">We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</p>
                <p className="mt-2">You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</p>
                <p className="mt-2">You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.</p>
                <p className="mt-2">In no case shall Angstrohm, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</p>

                {/* SECTION 15 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 15 – INDEMNIFICATION</h2>
                <p className="mt-2">You agree to indemnify, defend and hold harmless Angstrohm and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</p>

                {/* SECTION 16 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 16 – SEVERABILITY</h2>
                <p className="mt-2">In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>

                {/* SECTION 17 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 17 – TERMINATION</h2>
                <p className="mt-2">The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</p>
                <p className="mt-2">These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.</p>
                <p className="mt-2">If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</p>

                {/* SECTION 18 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 18 – ENTIRE AGREEMENT</h2>
                <p className="mt-2">The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</p>
                <p className="mt-2">These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</p>
                <p className="mt-2">Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</p>

                {/* SECTION 19 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 19 – GOVERNING LAW</h2>
                <p className="mt-2">These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.</p>

                {/* SECTION 20 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 20 – CHANGES TO TERMS OF SERVICE</h2>
                <p className="mt-2">You can review the most current version of the Terms of Service at any time at this page.</p>
                <p className="mt-2">We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>

                {/* SECTION 21 */}
                <h2 className="text-xl font-black text-[#1d4289] pt-4">SECTION 21 – CONTACT INFORMATION</h2>
                <p className="mt-2">Questions about the Terms of Service should be sent to us at <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-[#ff4081] hover:underline">woohoo@thehappyfoodcompany.com</a></p>

                {/* Effective Date */}
                <p className="text-xs mt-6 font-black uppercase text-slate-400 tracking-widest text-center pt-4">
                  Effective as of January 11, 2024
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Combo Products Section - White/Cream Background */}
      <ShopNowSection />
    </div>
  );
};

export default Term;