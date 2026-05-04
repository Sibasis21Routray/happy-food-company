import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image: string;
}

const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Satisfy your Sugar Cravings Naturally",
    slug: "satisfy-your-sugar-cravings-naturally",
    date: "Jun 1, 2024",
    excerpt: "Satisfying your Sugar Cravings Naturally In the vibrant landscape of modern nutrition, the quest for energy bars low...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/craving-control-400x250.webp",
  },
  {
    id: 2,
    title: "Fueling Your Day with Happy Bars: A Nutrient Powerhouse",
    slug: "fueling-your-day-with-happy-bars",
    date: "May 11, 2024",
    excerpt: "Fueling Your Day with Happy Bars: A Nutrient Powerhouse When it comes to nourishing our bodies, the right balance of...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/health-flavour-natural-happy-bar-400x250.webp",
  },
  {
    id: 3,
    title: "Fueling Your Workouts with Happy Bars",
    slug: "fueling-your-workouts-with-happy-bars",
    date: "Apr 20, 2024",
    excerpt: "Fueling Your Workouts with Happy Bars Introduction As fitness enthusiasts, we understand the importance of nourishing...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/nourish-energize-thrive-400x250.webp",
  },
  {
    id: 4,
    title: "Unwrapping Happiness: A Closer Look at the Wholesome Ingredients of Happy Bars",
    slug: "unwrapping-happiness-ingredients",
    date: "May 25, 2024",
    excerpt: "Unwrapping Happiness: A Closer Look at the Wholesome Ingredients of Happy Bars At the Happy Food Company, we're...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/my-daily-fix-400x250.webp",
  },
  {
    id: 5,
    title: "Fuel Your Well-being with Happy Bars: A Natural Protein Energy Solution",
    slug: "fuel-wellbeing-happy-bars",
    date: "May 4, 2024",
    excerpt: "Fuel Your Well-being with Happy Bars: A Natural Protein Energy Solution In today's health-conscious world, finding...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-your-wellbeing-400x250.webp",
  },
  {
    id: 6,
    title: "Craving Control: How Protein Bars Can Support Your Weight Loss Journey",
    slug: "craving-control-weight-loss",
    date: "Apr 13, 2024",
    excerpt: "Craving Control: How Protein Bars Can Support Your Weight Loss Journey Introduction In our fast-paced lives, finding...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/whats-in-the-bag-400x250.webp",
  },
  {
    id: 7,
    title: "Nourish, Energize, Thrive: The Happy Bar Way",
    slug: "nourish-energize-thrive",
    date: "May 18, 2024",
    excerpt: "Nourish, Energize, Thrive: The Happy Bar Way In the tapestry of modern life, where every thread intertwines with the...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-workout-protein-pro-400x250.webp",
  },
  {
    id: 8,
    title: "Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go",
    slug: "happy-bars-parents-kids",
    date: "Apr 27, 2024",
    excerpt: "Happy Bars: The Perfect Snack for Busy Parents and Kids On-The-Go In the whirlwind of modern family life, finding...",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/craving-for-chocolate-400x250.webp",
  }
];

function YouMayLike() {
  const location = useLocation();
  const currentSlug = location.pathname.split('/blog/')[1];
  
  // Filter out the current post and get 3 random posts
  const getSuggestedPosts = () => {
    const otherPosts = allBlogPosts.filter(post => post.slug !== currentSlug);
    
    // Shuffle array and get first 3 posts
    const shuffled = [...otherPosts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, 3);
  };
  
  const suggestedPosts = getSuggestedPosts();

  // Don't show anything if there are no suggested posts
  if (suggestedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header - Increased text size */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-3">You May Also Like</h2>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
        </div>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suggestedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              {/* Image Container */}
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Content Area - Increased text sizes */}
              <div className="p-6">
                {/* Date - Larger */}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                  <Calendar size={12} strokeWidth={1.5} />
                  <span>{post.date}</span>
                </div>

                {/* Title - Larger */}
                <h3 className="text-base md:text-lg font-light text-gray-800 mb-3 leading-relaxed line-clamp-2">
                  <Link to={`/blog/${post.slug}`} className="hover:text-gray-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt - Larger */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                {/* Read More Link - Larger */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-gray-500 text-xs tracking-wider hover:text-gray-700 transition-colors group/link"
                >
                  READ MORE
                  <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default YouMayLike;