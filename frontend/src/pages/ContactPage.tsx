import React, { useState } from 'react';
import { motion, easeInOut } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: easeInOut }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: { 
      y: -4,
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, staggerChildren: 0.08 }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      
      {/* Animated Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-3">
            Contact Us
          </h1>
          <div className="w-12 h-px bg-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-light max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with any questions, feedback, or just to say hello.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-5"
          >
            {/* Email Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300"
            >
              <div className="mb-4">
                <Mail className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-light text-gray-800 mb-1">Email Us</h3>
              <p className="text-gray-400 text-xs font-light mb-2">For general inquiries and support</p>
              <a 
                href="mailto:woohoo@thehappyfoodcompany.com" 
                className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors break-all"
              >
                woohoo@thehappyfoodcompany.com
              </a>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300"
            >
              <div className="mb-4">
                <Phone className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-light text-gray-800 mb-1">Call Us</h3>
              <p className="text-gray-400 text-xs font-light mb-2">Mon-Fri, 10 AM - 6 PM IST</p>
              <a href="tel:+918042987652" className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors">
                +91 8042987652
              </a>
            </motion.div>

            {/* Address Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300"
            >
              <div className="mb-4">
                <MapPin className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-light text-gray-800 mb-1">Visit Us</h3>
              <p className="text-gray-500 text-xs font-light leading-relaxed">
                Angstrohm Foods Pvt Ltd<br />
                3rd Floor, Krishna Arcade,<br />
                No. 17, S K Nagar, Kodigehalli,<br />
                Bengaluru, Karnataka - 560092
              </p>
            </motion.div>

            {/* Business Hours Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300"
            >
              <div className="mb-4">
                <Clock className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-light text-gray-800 mb-1">Business Hours</h3>
              <div className="space-y-1 text-xs text-gray-500 font-light">
                <p><span className="text-gray-600">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p><span className="text-gray-600">Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p><span className="text-gray-600">Sunday:</span> Closed</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <div className="bg-white border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-light text-gray-800 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={fieldVariants}>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">YOUR NAME *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  
                  <motion.div variants={fieldVariants}>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">SUBJECT *</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Question">Order Question</option>
                    <option value="Returns">Returns & Refunds</option>
                    <option value="Wholesale">Wholesale Inquiry</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">MESSAGE *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </motion.div>

                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-green-300 bg-green-50 text-green-700 px-4 py-3 text-sm font-light"
                  >
                    Thank you for your message! We'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-red-300 bg-red-50 text-red-700 px-4 py-3 text-sm font-light"
                  >
                    Something went wrong. Please try again.
                  </motion.div>
                )}

                <motion.button
                  variants={fieldVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 text-white py-3 text-sm font-light tracking-wider hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white border border-gray-200 overflow-hidden"
            >
              <div className="p-5 pb-0">
                <h3 className="text-base font-light text-gray-800 mb-1">Find Us</h3>
                <p className="text-gray-400 text-xs font-light">Located in Bengaluru, Karnataka</p>
              </div>
              <div className="h-64 bg-gray-100 mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.123456789012!2d77.5945627!3d13.0279357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d9c2c3d6c1%3A0x8f2c8c3f5e5b9f8a!2sKodigehalli%2C%20Bengaluru%2C%20Karnataka%20560092!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Happy Bar Location"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;