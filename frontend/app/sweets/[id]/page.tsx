"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import { getSweetImage } from '@/utils/defaultImages';

const SweetDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [sweet, setSweet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const { data } = await api.get(`/sweets/${id}`);
        setSweet(data);
      } catch (error) {
        console.error('Error fetching sweet:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSweet();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!sweet) return <div className="p-10 text-center">Sweet not found</div>;

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
           <div className="md:w-1/2 h-96 bg-gray-200 flex items-center justify-center">
   <img 
     src={sweet.image || getSweetImage(sweet.name)} 
     alt={sweet.name} 
     className="w-full h-full object-cover"
   />
</div>
           <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <span className="text-sm font-bold text-primary-gold tracking-wide uppercase">{sweet.category}</span>
              <h1 className="mt-2 text-4xl font-serif font-bold text-primary-maroon">{sweet.name}</h1>
              
              <div className="flex items-center mt-4">
                 <div className="flex items-center text-accent-yellow">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < Math.floor(sweet.rating) ? "currentColor" : "none"} stroke="currentColor" />
                    ))}
                 </div>
                 <span className="ml-2 text-gray-600">({sweet.rating} / 5)</span>
              </div>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                 {sweet.description}
              </p>

              <div className="mt-8 flex items-center justify-between">
                 <span className="text-3xl font-bold text-primary-maroon">₹{sweet.price} <span className="text-sm font-normal text-gray-500">/ kg</span></span>
                 <button 
                   onClick={() => addToCart({ ...sweet, qty: 1 })}
                   className="flex items-center bg-primary-maroon text-white px-8 py-3 rounded-full hover:bg-primary-green transition-colors font-bold text-lg"
                 >
                   <ShoppingCart className="mr-2" /> Add to Cart
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SweetDetailPage;
