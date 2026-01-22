"use client";
import React, { useEffect, useState } from 'react';
import FestivalBanner from '@/components/FestivalBanner';
import SweetCard from '@/components/SweetCard';
import Link from 'next/link';
import api from '@/utils/api';

export default function Home() {
  const [featuredSweets, setFeaturedSweets] = useState<any[]>([]);
  const [seasonalSweets, setSeasonalSweets] = useState<any[]>([]);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        // In a real app we might have specific endpoints for featured/seasonal
        // Here we just fetch all and filter for demo
        const { data } = await api.get('/sweets');
        setFeaturedSweets(data.slice(0, 4)); // Mock featured
        setSeasonalSweets(data.filter((s: any) => s.seasonTags && s.seasonTags.includes('Winter')).slice(0, 4));
      } catch (error) {
        console.error('Error fetching sweets:', error);
      }
    };
    fetchSweets();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <FestivalBanner />

      {/* Seasonal Picks */}
      <section className="py-16 bg-bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-8">
             <div>
               <h2 className="text-3xl font-serif font-bold text-primary-maroon">Seasonal Picks: Winter Delights ❄️</h2>
               <p className="text-gray-600 mt-2">Warm your soul with our winter specials</p>
             </div>
             <Link href="/sweets?season=winter" className="text-primary-green font-bold hover:underline">View All</Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {seasonalSweets.length > 0 ? (
                seasonalSweets.map(sweet => (
                  <SweetCard key={sweet._id} sweet={sweet} />
                ))
              ) : (
                <p>No seasonal sweets found.</p>
              )}
           </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-serif font-bold text-primary-maroon">Our Best Sellers</h2>
             <p className="text-gray-600 mt-2">Loved by everyone, for every occasion</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredSweets.map(sweet => (
                  <SweetCard key={sweet._id} sweet={sweet} />
              ))}
           </div>
        </div>
      </section>

      {/* Gift Boxes CTA */}
      <section className="py-16 bg-primary-maroon text-bg-cream">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
               <h2 className="text-4xl font-serif font-bold mb-4">Royal Gift Boxes</h2>
               <p className="text-lg text-gray-200 mb-8">Perfect for weddings, corporate gifting, and festivals. Customizable assortments in premium packaging.</p>
               <button className="bg-accent-yellow text-primary-maroon px-8 py-3 rounded-full font-bold text-lg hover:bg-white transition-colors">
                 Explore Gift Collections
               </button>
            </div>
            <div className="md:w-1/3 h-64 bg-white/10 rounded-lg flex items-center justify-center">
               <img src="/images/gitbox.png" alt="Gift Box" className="h-full w-full object-cover rounded-lg" />
            </div>
         </div>
      </section>
    </div>
  );
}
