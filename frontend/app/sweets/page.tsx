"use client";
import React, { useState, useEffect } from 'react';
import SweetCard from '@/components/SweetCard';
import api from '@/utils/api';

const categories = ['All', 'Traditional', 'Dry-fruit', 'Bengali', 'South Indian', 'Winter'];

const SweetsPage = () => {
  const [sweets, setSweets] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const { data } = await api.get('/sweets');
        setSweets(data);
      } catch (error) {
        console.error('Error fetching sweets:', error);
      }
    };
    fetchSweets();
  }, []);

  const filteredSweets = selectedCategory === 'All' 
    ? sweets 
    : sweets.filter(sweet => sweet.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-primary-maroon mb-8 text-center">Our Sweets Collection</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat 
                  ? 'bg-primary-maroon text-white' 
                  : 'bg-white text-text-brown hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredSweets.map(sweet => (
            <SweetCard key={sweet._id} sweet={sweet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SweetsPage;
