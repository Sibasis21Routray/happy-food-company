import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  path: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Satisfy your Sugar Cravings Naturally',
    path: '/blog/satisfy-your-sugar-cravings-naturally',
    author: 'Boing the Blogger',
    date: 'Jun 1, 2024',
    excerpt: 'Satisfying your Sugar Cravings Naturally In the vibrant landscape of modern nutrition, the quest for energy bars low...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/craving-control-400x250.webp",
    imageAlt: 'Dark chocolate bars satisfying sugar cravings'
  },
  {
    id: '2',
    title: 'Unwrapping Happiness: A Closer Look at the Wholesome Ingredients of Happy Bars',
    path: '/blog/unwrapping-happiness-ingredients',
    author: 'Boing the Blogger',
    date: 'May 25, 2024',
    excerpt: 'Unwrapping Happiness: A Closer Look at the Wholesome Ingredients of Happy Bars At the Happy Food Company, we\'re...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/health-flavour-natural-happy-bar-400x250.webp",
    imageAlt: 'Natural ingredients like nuts, seeds and oats'
  },
  {
    id: '3',
    title: 'Nourish, Energize, Thrive: The Happy Bar Way',
    path: '/blog/nourish-energize-thrive',
    author: 'Boing the Blogger',
    date: 'May 18, 2024',
    excerpt: 'Nourish, Energize, Thrive: The Happy Bar Way In the tapestry of modern life, where every thread intertwines with the...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/nourish-energize-thrive-400x250.webp",
    imageAlt: 'Wellness and mindfulness with healthy snacks'
  },
  {
    id: '4',
    title: 'Fueling Your Day with Happy Bars: A Nutrient Powerhouse',
    path: '/blog/fueling-your-day-with-happy-bars',
    author: 'Boing the Blogger',
    date: 'May 11, 2024',
    excerpt: 'Fueling Your Day with Happy Bars: A Nutrient Powerhouse When it comes to nourishing our bodies, the right balance of...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/my-daily-fix-400x250.webp",
    imageAlt: 'Protein bars and nuts for energy'
  },
    {
    id: '5',
    title: 'Fuel Your Well-being with Happy Bars: A Natural Protein Energy Solution',
    path: '/blog/fuel-wellbeing-happy-bars',
    author: 'Boing the Blogger',
    date: 'May 4, 2024',
    excerpt: 'Fuel Your Well-being with Happy Bars: A Natural Protein Energy Solution In today\'s health-conscious world, finding...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-your-wellbeing-400x250.webp",
    imageAlt: 'Healthy lifestyle with natural protein bars'
  },
   {
    id: '6',
    title: 'Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go',
    path: '/blog/happy-bars-parents-kids',
    author: 'Boing the Blogger',
    date: 'Apr 27, 2024',
    excerpt: 'Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go In the whirlwind of modern family life, finding...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/whats-in-the-bag-400x250.webp",
    imageAlt: 'Family enjoying healthy snacks together'
  },
  {
    id: '7',
    title: 'Fueling Your Workouts with Happy Bars',
    path: '/blog/fueling-your-workouts-with-happy-bars',
    author: 'Boing the Blogger',
    date: 'Apr 20, 2024',
    excerpt: 'Fueling Your Workouts with Happy Bars Introduction As fitness enthusiasts, we understand the importance of nourishing...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-workout-protein-pro-400x250.webp",
    imageAlt: 'Person working out with protein bar'
  },
  

  {
    id: '8',
    title: 'Craving Control: How Protein Bars Can Support Your Weight Loss Journey',
    path: '/blog/craving-control-weight-loss',
    author: 'Boing the Blogger',
    date: 'Apr 13, 2024',
    excerpt: 'Craving Control: How Protein Bars Can Support Your Weight Loss Journey Introduction In our fast-paced lives, finding...',
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/craving-for-chocolate-400x250.webp",
    imageAlt: 'Healthy food choices for weight management'
  },
  
 
];

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Header Section */}
      <div className="relative bg-[#ff7043] h-64 md:h-80 flex items-center mb-24">
        <div className="container mx-auto px-4 max-w-7xl flex justify-end items-center">
          {/* Floating Image Card */}
          {/* <div className="absolute left-4 md:left-20 top-12 md:top-16 bg-slate-100 rounded-3xl p-4 shadow-2xl w-48 md:w-72 overflow-hidden rotate-[-2deg]">
            <img 
              src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/my-daily-fix-400x250.webp" 
              alt="Happy Bars background" 
              className="rounded-2xl w-full h-auto"
            />
          </div> */}
          
          <h1 className="text-4xl md:text-7xl font-bold text-black mr-4 md:mr-20">
            The Happy Blog
          </h1>
        </div>
      </div>

      {/* 2. Blog Grid Section - Show ALL posts */}
      <div className="container mx-auto px-4 max-w-7xl pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container with specific aspect ratio */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-800 mb-2 leading-tight line-clamp-2">
                  {post.title}
                </h2>
                
                <div className="text-xs text-purple-800 font-medium mb-4">
                  by {post.author} | {post.date}
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link
                  to={post.path}
                  className="mt-auto text-purple-900 text-sm font-bold hover:underline inline-flex items-center group/link"
                >
                  read more
                  <svg 
                    className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};