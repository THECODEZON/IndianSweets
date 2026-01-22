"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { getSweetImage } from '@/utils/defaultImages';

type SweetProps = {
  sweet: {
    _id: string;
    name: string;
    price: number;
    image: string; // URL string
    category: string;
    rating: number;
  };
};

const SweetCard = ({ sweet }: SweetProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ ...sweet, qty: 1 });
    // Optional: Show toast notification
  };

  return (
    <Link href={`/sweets/${sweet._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 w-full">
           {/* Use sweet image or fallback to default */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
             <img 
               src={sweet.image || getSweetImage(sweet.name)} 
               alt={sweet.name} 
               className="w-full h-full object-cover" 
             />
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
               <p className="text-xs text-primary-gold uppercase font-semibold tracking-wider">{sweet.category}</p>
               <h3 className="text-lg font-bold text-text-brown truncate">{sweet.name}</h3>
            </div>
            <div className="flex items-center bg-green-100 px-2 py-1 rounded">
               <span className="text-primary-green font-bold text-sm">★ {sweet.rating}</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-primary-maroon">₹{sweet.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-primary-maroon text-white p-2 rounded-full hover:bg-primary-green transition-colors"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SweetCard;
