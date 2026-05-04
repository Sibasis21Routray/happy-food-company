import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

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
    <div className="min-h-screen bg-white pt-24 pb-16">
      
      {/* Hero Section */}
      <div
  className="py-16 mb-12"
  style={{
    backgroundImage: "url('https://img.freepik.com/premium-vector/blue-background-with-line-that-says-blue-vector-illustration-autumn-leaves_1007350-15391.jpg')",
    backgroundSize: "fill",
    backgroundPosition: "center",
    // backgroundRepeat: "no-repeat"
  }}
>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-light text-white mb-3">The Happy Blog</h1>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
            <p className="text-gray-400 text-sm font-light mt-4 max-w-md mx-auto">
              Stories, tips, and inspiration for a healthier, happier life
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              {/* Image Container */}
              <Link to={post.path} className="block overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                  <img 
                    src={post.image} 
                    alt={post.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              
              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <User size={12} strokeWidth={1.5} />
                    {post.author.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} strokeWidth={1.5} />
                    {post.date}
                  </span>
                </div>
                
                {/* Title */}
                <h2 className="text-lg font-light text-gray-800 mb-3 leading-relaxed line-clamp-2">
                  <Link to={post.path} className="hover:text-gray-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                {/* Excerpt */}
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Read More Link */}
                <Link
                  to={post.path}
                  className="mt-auto text-gray-500 text-xs font-light tracking-wider hover:text-gray-700 transition-colors inline-flex items-center gap-1 group/link"
                >
                  READ MORE
                  <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};