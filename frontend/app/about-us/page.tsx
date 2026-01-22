"use client";
import React from 'react';
import Link from 'next/link';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary-maroon mb-4">
            About Mithai Wala
          </h1>
          <p className="text-lg text-gray-600">
            Where Tradition Meets Sweetness
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-maroon mb-4">
                Where Tradition Meets Sweetness
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Mithai Wala we believe every celebration deserves something sweet.
                Crafted with love, tradition, and the finest ingredients, our sweets bring the authentic taste of India to every bite. 
                From festive moments to everyday happiness, we are proud to be a part of your joyful memories.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary-maroon mb-4">Our Promise</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-gray-700">Pure ingredients</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-gray-700">Time-honored recipes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-gray-700">Made fresh with love</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-maroon mb-4">Get in Touch</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Address:</strong> old phagwara deepnager</p>
                <p><strong>Phone:</strong> +91 6267093990</p>
                <p><strong>Email:</strong> ddas12181@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex items-center justify-center">
            <img 
              src="/images/aboutimg.png" 
              alt="About Mithai Wala" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/default-sweet.jpg';
              }}
            />
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-lg p-8 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-primary-maroon mb-6 text-center">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🍬</div>
              <h3 className="text-lg font-bold text-primary-maroon mb-2">Authentic Recipes</h3>
              <p className="text-gray-600">
                Our recipes have been passed down through generations, preserving the authentic taste of Indian sweets.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍🍳</div>
              <h3 className="text-lg font-bold text-primary-maroon mb-2">Expert Craftsmen</h3>
              <p className="text-gray-600">
                Our skilled sweet makers bring decades of experience to create perfect sweets every time.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-lg font-bold text-primary-maroon mb-2">Celebrating Moments</h3>
              <p className="text-gray-600">
                We've been part of countless celebrations, making every moment sweeter and more memorable.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-maroon text-bg-cream rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Experience the Sweetness</h2>
          <p className="text-lg mb-6">
            Browse our collection of authentic Indian sweets and make your celebrations extra special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sweets" 
              className="bg-accent-yellow text-primary-maroon px-8 py-3 rounded-full font-bold hover:bg-white transition-colors"
            >
              Explore Our Sweets
            </Link>
            <Link 
              href="/contact-us" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primary-maroon transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Back to Shopping */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary-green font-bold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
