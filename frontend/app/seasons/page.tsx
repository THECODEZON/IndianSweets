"use client";
import React, { useEffect, useState } from 'react';
import SweetCard from '@/components/SweetCard';
import Link from 'next/link';
import api from '@/utils/api';

const seasons = [
  { name: 'Winter', description: 'Warm sweets for cold weather', icon: '❄️' },
  { name: 'Summer', description: 'Cool sweets for hot weather', icon: '☀️' },
  { name: 'Monsoon', description: 'Comfort sweets for rainy days', icon: '🌧️' },
  { name: 'Spring', description: 'Fresh sweets for new beginnings', icon: '🌸' },
  { name: 'All seasons', description: 'Sweets perfect any time', icon: '🌈' },
];

const SeasonsPage = () => {
  const [seasonSweets, setSeasonSweets] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState('');

  useEffect(() => {
    const fetchSeasonSweets = async () => {
      if (selectedSeason) {
        try {
          const { data } = await api.get(`/sweets?season=${selectedSeason}`);
          setSeasonSweets(data);
        } catch (error) {
          console.error('Error fetching season sweets:', error);
        }
      }
    };
    fetchSeasonSweets();
  }, [selectedSeason]);

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary-maroon mb-4">
            Seasonal Sweets 🌿
          </h1>
          <p className="text-lg text-gray-600">
            Perfect sweets for every season and mood
          </p>
        </div>

        {/* Season Selection */}
        <div className="mb-8">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
          >
            <option value="">Select a Season</option>
            {seasons.map((season) => (
              <option key={season.name} value={season.name}>
                {season.icon} {season.name} - {season.description}
              </option>
            ))}
          </select>
        </div>

        {/* Season Sweets Grid */}
        {selectedSeason && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-maroon mb-6">
              {seasons.find(s => s.name === selectedSeason)?.icon} {selectedSeason} Specials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {seasonSweets.map((sweet) => (
                <SweetCard key={sweet._id} sweet={sweet} />
              ))}
            </div>
          </div>
        )}

        {/* All Seasons Grid */}
        {!selectedSeason && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasons.map((season) => (
              <div key={season.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-6xl mb-4">{season.icon}</div>
                  <h3 className="text-xl font-bold text-primary-maroon mb-2">{season.name}</h3>
                  <p className="text-gray-600 mb-4">{season.description}</p>
                  <button
                    onClick={() => setSelectedSeason(season.name)}
                    className="bg-primary-maroon text-white px-6 py-2 rounded-full hover:bg-primary-green transition-colors"
                  >
                    View Sweets
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Seasonal Highlights */}
        {!selectedSeason && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary-maroon mb-6 text-center">
              Seasonal Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-primary-maroon mb-3">❄️ Winter Favorites</h3>
                <p className="text-gray-600 mb-4">
                  Warm, rich sweets perfect for cold weather. Try our Gajar ka Halwa and hot milk sweets.
                </p>
                <button
                  onClick={() => setSelectedSeason('Winter')}
                  className="bg-primary-maroon text-white px-4 py-2 rounded-full hover:bg-primary-green transition-colors"
                >
                  Explore Winter Sweets
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-primary-maroon mb-3">☀️ Summer Coolers</h3>
                <p className="text-gray-600 mb-4">
                  Light, refreshing sweets for hot summer days. Enjoy Rasmalai and Keri no Ras.
                </p>
                <button
                  onClick={() => setSelectedSeason('Summer')}
                  className="bg-primary-maroon text-white px-4 py-2 rounded-full hover:bg-primary-green transition-colors"
                >
                  Explore Summer Sweets
                </button>
              </div>
            </div>
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

export default SeasonsPage;
