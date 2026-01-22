"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { getSweetImage } from '@/utils/defaultImages';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary-maroon mb-4">Your Cart is Empty</h2>
        <Link href="/sweets" className="bg-primary-maroon text-white px-6 py-2 rounded-full hover:bg-primary-green transition-colors">
          Shop Sweets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-primary-maroon mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-4">
  <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden">
     <img 
       src={item.image || getSweetImage(item.name)} 
       alt={item.name} 
       className="h-full w-full object-cover" 
     />
  </div>
  <div>
    <h3 className="font-bold text-text-brown">{item.name}</h3>
    <p className="text-primary-maroon font-semibold">₹{item.price}</p>
    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
  </div>
</div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tax (5%)</span>
              <span>₹{(total * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6 pt-2 border-t">
              <span>Total</span>
              <span>₹{(total * 1.05).toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout" 
              className="block w-full bg-primary-maroon text-white py-3 rounded-md hover:bg-primary-green transition-colors font-bold text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
