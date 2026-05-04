import React from 'react';
import { motion, easeInOut } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';

const Term = () => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  const contactVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.3 }
    },
    hover: {
      scale: 1.01,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      
      {/* Header Section */}
      <motion.section
                   variants={headerVariants}
                   initial="hidden"
                   animate="visible"
                   className="py-16 mb-12 relative overflow-hidden "
                     style={{
               backgroundImage: "url('https://img.freepik.com/premium-vector/blue-background-with-line-that-says-blue-vector-illustration-autumn-leaves_1007350-15391.jpg')",
               backgroundSize: "fill",
               backgroundPosition: "center",
               // backgroundRepeat: "no-repeat"
             }}
                 >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 "
        />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-light text-white mb-3"
            >
              Terms of Service
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-px bg-white/30 mx-auto"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-white/70 text-sm font-light mt-4"
            >
              Effective as of January 11, 2024
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Policy Document Container */}
      <motion.section
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white border border-gray-100 p-8 md:p-12 hover:border-gray-200 transition-all duration-300">
            
            <motion.div 
              variants={contentVariants}
              className="space-y-6 text-gray-600 text-sm leading-relaxed"
            >
              <motion.p variants={sectionVariants}>
                Welcome to <strong className="text-gray-800">thehappyfoodcompany.com</strong>, a website owned and operated by Angstrohm Foods Pvt Ltd 
                ("Angstrohm" or "we"), a registered company in India.
              </motion.p>
              
              <motion.p variants={sectionVariants}>
                Throughout the site, the terms "we", "us" and "our" refer to Angstrohm. Angstrohm offers this website, 
                including all information, tools and services available from this site to you, the user, conditioned upon 
                your acceptance of all terms, conditions, policies and notices stated here.
              </motion.p>

              <motion.p variants={sectionVariants}>
                By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound 
                by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and 
                conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all 
                users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ 
                or contributors of content.
              </motion.p>

              <motion.p variants={sectionVariants}>
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using 
                any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms 
                and conditions of this agreement, then you may not access the website or use any services. If these Terms 
                of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
              </motion.p>

              <motion.p variants={sectionVariants}>
                Any new features or tools which are added to the current store shall also be subject to the Terms of Service. 
                You can review the most current version of the Terms of Service at any time on this page. We reserve the right 
                to update, change or replace any part of these Terms of Service by posting updates and/or changes to our 
                website. It is your responsibility to check this page periodically for changes. Your continued use of or 
                access to the website following the posting of any changes constitutes acceptance of those changes.
              </motion.p>

              <motion.p variants={sectionVariants}>
                In addition to our own store hosted on https://thehappyfoodcompany.com, our products are also available online 
                on amazon.in and flipkart.com. They provide us with the online e-commerce platform that allows us to sell our 
                products and services to you.
              </motion.p>

              {/* SECTION 1 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 1 – ONLINE STORE TERMS</motion.h2>
              <motion.ul className="list-none space-y-2 mt-2">
                {[
                  "By agreeing to these Terms of Service, you represent that you are at least 18 years old.",
                  "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).",
                  "You must not transmit any worms or viruses or any code of a destructive nature.",
                  "A breach or violation of any of the Terms will result in an immediate termination of your Services."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover="hover"
                    className="flex gap-3"
                  >
                    <span className="text-gray-400 mt-0.5">•</span> 
                    <span className="text-gray-500 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* SECTION 2 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 2 – GENERAL CONDITIONS</motion.h2>
              <motion.ul className="list-none space-y-2 mt-2">
                {[
                  "We reserve the right to refuse service to anyone for any reason at any time.",
                  "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.",
                  "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.",
                  "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover="hover"
                    className="flex gap-3"
                  >
                    <span className="text-gray-400 mt-0.5">•</span> 
                    <span className="text-gray-500 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* SECTION 3 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 3 – ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</motion.h2>
              <motion.ul className="list-none space-y-2 mt-2">
                {[
                  "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.",
                  "This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover="hover"
                    className="flex gap-3"
                  >
                    <span className="text-gray-400 mt-0.5">•</span> 
                    <span className="text-gray-500 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* SECTION 4 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES</motion.h2>
              <motion.ul className="list-none space-y-2 mt-2">
                {[
                  "Prices for our products are subject to change without notice.",
                  "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
                  "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover="hover"
                    className="flex gap-3"
                  >
                    <span className="text-gray-400 mt-0.5">•</span> 
                    <span className="text-gray-500 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* SECTION 5 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 5 – PRODUCTS OR SERVICES</motion.h2>
              <motion.ul className="list-none space-y-2 mt-2">
                {[
                  "Certain products or services may be available exclusively online through the website or partner websites. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.",
                  "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.",
                  "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.",
                  "We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover="hover"
                    className="flex gap-3"
                  >
                    <span className="text-gray-400 mt-0.5">•</span> 
                    <span className="text-gray-500 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* SECTION 6 - REFUND POLICIES */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 6 – REFUND POLICIES</motion.h2>
              <motion.div variants={sectionVariants} className="mt-2 space-y-3">
                <p><strong className="text-gray-700">Our policy lasts 7 days.</strong> If 7 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
                <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
                <p>To complete your return, we require a receipt or proof of purchase.</p>
                <p>There are certain situations where refunds are not possible or only partial refunds are granted at our discretion.</p>
                <ul className="list-none space-y-1 ml-4">
                  <li className="flex gap-3"><span className="text-gray-400">–</span> Any item not in its original condition, is damaged or missing parts for reasons not due to our error</li>
                  <li className="flex gap-3"><span className="text-gray-400">–</span> Any item that is returned more than 7 days after delivery</li>
                </ul>
                <p className="font-medium text-gray-700 mt-3">Refunds:</p>
                <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
                <p className="font-medium text-gray-700 mt-3">Late or missing refunds:</p>
                <p>If you haven't received a refund yet, first check your bank account again.</p>
                <p>Then contact your credit card company, it may take some time before your refund is officially posted.</p>
                <p>Next contact your bank. There is often some processing time before a refund is posted.</p>
                <p>If you've done all of this and you still have not received your refund, please contact us at <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-gray-500 hover:text-gray-700 transition-colors">woohoo@thehappyfoodcompany.com</a></p>
                <p className="font-medium text-gray-700 mt-3">Sale items:</p>
                <p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded. Some of the sales items may have a shorter expiry date.</p>
                <p className="font-medium text-gray-700 mt-3">Shipping:</p>
                <p>To return your product, you should mail your product to:</p>
                <p className="font-medium text-gray-700">Angstrohm Foods Pvt Ltd<br />3rd Floor, Krishna Arcade,<br />No. 17, S K NAGAR, KODIGEHALLI,<br />Bengaluru, Karnataka, 560092</p>
                <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                <p>Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>
                <p>We don't guarantee that we will receive your returned item.</p>
              </motion.div>

              {/* SECTION 7 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 7 – ACCURACY OF BILLING AND ACCOUNT INFORMATION</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">For more detail, please review our Returns Policy.</motion.p>

              {/* SECTION 8 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 8 – OPTIONAL TOOLS</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.</motion.p>

              {/* SECTION 9 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 9 – THIRD-PARTY LINKS</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">Certain content, products and services available via our Service may include materials from third-parties.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.</motion.p>

              {/* SECTION 10 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 10 – USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.</motion.p>

              {/* SECTION 11 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 11 – PERSONAL INFORMATION</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">Your submission of personal information through the store is governed by our Privacy Policy.</motion.p>

              {/* SECTION 12 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 12 – ERRORS, INACCURACIES AND OMISSIONS</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.</motion.p>

              {/* SECTION 13 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 13 – PROHIBITED USES</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</motion.p>

              {/* SECTION 14 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 14 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">In no case shall Angstrohm, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</motion.p>

              {/* SECTION 15 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 15 – INDEMNIFICATION</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">You agree to indemnify, defend and hold harmless Angstrohm and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</motion.p>

              {/* SECTION 16 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 16 – SEVERABILITY</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</motion.p>

              {/* SECTION 17 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 17 – TERMINATION</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</motion.p>

              {/* SECTION 18 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 18 – ENTIRE AGREEMENT</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</motion.p>

              {/* SECTION 19 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 19 – GOVERNING LAW</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.</motion.p>

              {/* SECTION 20 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 20 – CHANGES TO TERMS OF SERVICE</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">You can review the most current version of the Terms of Service at any time at this page.</motion.p>
              <motion.p variants={sectionVariants} className="mt-2">We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</motion.p>

              {/* SECTION 21 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">SECTION 21 – CONTACT INFORMATION</motion.h2>
              <motion.p variants={sectionVariants} className="mt-2">Questions about the Terms of Service should be sent to us at <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-gray-500 hover:text-gray-700 transition-colors">woohoo@thehappyfoodcompany.com</a></motion.p>

              {/* Contact Section */}
              <motion.div 
                variants={contactVariants}
                whileHover="hover"
                className="border border-gray-100 p-6 mt-6 hover:border-gray-200 transition-all duration-300"
              >
                <p className="font-light text-gray-800 text-base mb-2">Angstrohm Foods Pvt Ltd</p>
                <p className="text-gray-500 text-sm">3rd Floor, Krishna Arcade,</p>
                <p className="text-gray-500 text-sm">No. 17, S K NAGAR, KODIGEHALLI,</p>
                <p className="text-gray-500 text-sm">Bengaluru, Karnataka, 560092</p>
                <p className="mt-3 text-sm">
                  <span className="font-light text-gray-600">Email:</span>{' '}
                  <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-gray-500 hover:text-gray-700 transition-colors">
                    woohoo@thehappyfoodcompany.com
                  </a>
                </p>
              </motion.div>

              {/* Effective Date */}
              <motion.p className="text-[10px] mt-6 text-gray-400 tracking-wider text-center pt-4">
                Effective as of January 11, 2024
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Shop Now Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ShopNowSection />
      </motion.div>
    </div>
  );
};

export default Term;