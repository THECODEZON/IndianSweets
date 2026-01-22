"use client";
import React, { useEffect, useState } from 'react';
import SweetCard from '@/components/SweetCard';
import Link from 'next/link';
import api from '@/utils/api';

const festivals = [
  { name: 'Diwali', description: 'Festival of Lights', icon: '🪔' },
  { name: 'Eid', description: 'Festival of Breaking Fast', icon: '🌙' },
  { name: 'Durga Puja', description: 'Worship of Goddess Durga', icon: '🙏' },
  { name: 'Ganesh Chaturthi', description: 'Birthday of Lord Ganesha', icon: '🐘' },
  { name: 'Sankranti', description: 'Harvest Festival', icon: '🌾' },
  { name: 'Ramadan', description: 'Month of Fasting', icon: '🕌' },
  { name: 'Gudi Padwa', description: 'Maharashtrian New Year', icon: '🎊' },
];

const FestivalsPage = () => {
  const [festivalSweets, setFestivalSweets] = useState<any[]>([]);
  const [selectedFestival, setSelectedFestival] = useState('');

  useEffect(() => {
    const fetchFestivalSweets = async () => {
      if (selectedFestival) {
        try {
          const { data } = await api.get(`/sweets?festival=${selectedFestival}`);
          setFestivalSweets(data);
        } catch (error) {
          console.error('Error fetching festival sweets:', error);
        }
      }
    };
    fetchFestivalSweets();
  }, [selectedFestival]);

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary-maroon mb-4">
            Festival Special Sweets 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Discover traditional sweets for every Indian festival
          </p>
        </div>

        {/* Festival Selection */}
        <div className="mb-8">
          <select
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
          >
            <option value="">Select a Festival</option>
            {festivals.map((festival) => (
              <option key={festival.name} value={festival.name}>
                {festival.icon} {festival.name} - {festival.description}
              </option>
            ))}
          </select>
        </div>

        {/* Festival Sweets Grid */}
        {selectedFestival && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-maroon mb-6">
              {festivals.find(f => f.name === selectedFestival)?.icon} {selectedFestival} Specials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {festivalSweets.map((sweet) => (
                <SweetCard key={sweet._id} sweet={sweet} />
              ))}
            </div>
          </div>
        )}

        {/* All Festivals Grid */}
        {!selectedFestival && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festivals.map((festival) => (
              <div key={festival.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-6xl mb-4">{festival.icon}</div>
                  <h3 className="text-xl font-bold text-primary-maroon mb-2">{festival.name}</h3>
                  <p className="text-gray-600 mb-4">{festival.description}</p>
                  <button
                    onClick={() => setSelectedFestival(festival.name)}
                    className="bg-primary-maroon text-white px-6 py-2 rounded-full hover:bg-primary-green transition-colors"
                  >
                    View Sweets
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to All Sweets */}
        <div className="text-center mt-8">
          <Link href="/sweets" className="text-primary-green font-bold hover:underline">
            ← Back to All Sweets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FestivalsPage;
