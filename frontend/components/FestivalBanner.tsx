"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Festival = {
  id: string;
  name: string;
  headline: string;
  subtext: string;
  ctaText: string;
  bannerImage: string; // Gradient or Color for now
  color: string;
};

const festivals: Festival[] = [
  {
    id: 'diwali',
    name: 'Diwali',
    headline: '✨ Diwali Ki Mithaas, Ghar Tak ✨',
    subtext: 'Celebrate lights with premium handmade sweets',
    ctaText: 'Shop Diwali Specials',
    bannerImage: 'from-orange-500 to-red-600',
    color: '#FF9933'
  },
  {
    id: 'holi',
    name: 'Holi',
    headline: '🎨 Rangon Ki Mithaas 🎨',
    subtext: 'Gujiya, Malpua & festive delights',
    ctaText: 'Order for Holi',
    bannerImage: 'from-pink-500 to-purple-600',
    color: '#E76F51'
  },
   {
    id: 'eid',
    name: 'Eid',
    headline: '🌙 Eid Mubarak – Meethi Shuruaat 🌙',
    subtext: 'Traditional sweets made with love',
    ctaText: 'Explore Eid Collection',
    bannerImage: 'from-green-600 to-teal-500',
    color: '#1B4332'
  },
];

const FestivalBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % festivals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const festival = festivals[currentIndex];

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={festival.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-r ${festival.bannerImage} flex items-center justify-center`}
        >
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif font-bold mb-4"
            >
              {festival.headline}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 font-light"
            >
              {festival.subtext}
            </motion.p>
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 0.6 }}
              className="bg-accent-yellow text-primary-maroon px-8 py-3 rounded-full font-bold text-lg hover:bg-white transition-colors shadow-lg"
            >
              {festival.ctaText}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {festivals.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
            />
        ))}
      </div>
    </div>
  );
};

export default FestivalBanner;
