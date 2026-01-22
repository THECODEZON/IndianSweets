"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const giftBoxes = [
  {
    id: 1,
    name: 'Royal Diwali Box',
    price: 599,
    description: 'Premium assortment of traditional Diwali sweets including Gulab Jamun, Jalebi, Barfi, and more.',
    items: ['Gulab Jamun', 'Jalebi', 'Barfi', 'Rasgulla', 'Sonpari'],
    weight: '2kg',
    occasions: ['Diwali', 'Wedding', 'Corporate'],
    image: '/images/gift1.jpg',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Eid Special Box',
    price: 499,
    description: 'Elegant collection of Eid favorites with Seviyan, Barfi, and traditional sweets.',
    items: ['Barfi', 'Balushahi', 'Imarti', 'Rasmalai'],
    weight: '1.5kg',
    occasions: ['Eid', 'Ramadan', 'Family'],
    image: '/images/gift2.webp',
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: 'Wedding Collection',
    price: 699,
    description: 'Luxurious wedding gift box with premium sweets for the special occasion.',
    items: ['Mysore Pak', 'Sandesh', 'Chhena Poda', 'Ledikeni'],
    weight: '3kg',
    occasions: ['Wedding', 'Engagement', 'Anniversary'],
    image: '/images/gift3.png',
    rating: 4.9,
    reviews: 203
  },
  {
    id: 4,
    name: 'Corporate Gift Box',
    price: 399,
    description: 'Professional gift box perfect for corporate gifting and employee appreciation.',
    items: ['Barfi', 'Jalebi', 'Modak', 'Balushahi'],
    weight: '1kg',
    occasions: ['Corporate', 'Employee', 'Client'],
    image: '/images/gift4.jpg',
    rating: 4.6,
    reviews: 67
  },
  {
    id: 5,
    name: 'Festival Sampler',
    price: 299,
    description: 'Variety pack with all our popular sweets for every festival.',
    items: ['Gulab Jamun', 'Rasgulla', 'Jalebi', 'Barfi'],
    weight: '1kg',
    occasions: ['General', 'Festival', 'Housewarming'],
    image: '/images/gift5.jpg',
    rating: 4.5,
    reviews: 156
  },
  {
    id: 6,
    name: 'Regional Special Box',
    price: 549,
    description: 'Explore different regional sweets from across India in one premium box.',
    items: ['Ariselu', 'Bobbatlu', 'Chhena Gaja', 'Mysore Pak', 'Sandesh'],
    weight: '2.5kg',
    occasions: ['Festival', 'Gourmet', 'Gift'],
    image: '/images/gift6.jpg',
    rating: 4.8,
    reviews: 92
  },
  {
    id: 7,
    name: 'Premium Collection',
    price: 649,
    description: 'Exclusive selection of our finest sweets for special celebrations.',
    items: ['Mysore Pak', 'Chhena Poda', 'Rasmalai', 'Payasam'],
    weight: '2kg',
    occasions: ['Premium', 'Special', 'Luxury'],
    image: '/images/gift7.jpg',
    rating: 4.9,
    reviews: 118
  },
  {
    id: 8,
    name: 'Classic Assortment',
    price: 449,
    description: 'Traditional favorites perfect for any occasion and celebration.',
    items: ['Gulab Jamun', 'Jalebi', 'Barfi', 'Rasgulla'],
    weight: '1.5kg',
    occasions: ['Classic', 'Traditional', 'Family'],
    image: '/images/gift8.png',
    rating: 4.7,
    reviews: 134
  }
];

const GiftBoxesPage = () => {
  const [selectedBox, setSelectedBox] = useState<typeof giftBoxes[0] | null>(null);
  const [likedBoxes, setLikedBoxes] = useState<Set<number>>(new Set());
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customBox, setCustomBox] = useState({
    name: '',
    items: [] as string[],
    weight: '1kg',
    price: 299
  });
  const { addToCart } = useCart();

  const handleLike = (boxId: number) => {
    setLikedBoxes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(boxId)) {
        newSet.delete(boxId);
      } else {
        newSet.add(boxId);
      }
      return newSet;
    });
  };

  const handleAddToCart = (box: typeof giftBoxes[0]) => {
    const cartItem = {
      _id: `gift-${box.id}`,
      name: box.name,
      price: box.price,
      qty: 1,
      image: box.image,
      category: 'Gift Box'
    };
    addToCart(cartItem);
  };

  const handleCustomize = () => {
    setShowCustomizer(true);
  };

  const handleCustomBoxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customBox.name && customBox.items.length > 0) {
      const customGiftBox = {
        _id: `custom-${Date.now()}`,
        name: customBox.name,
        price: customBox.price,
        qty: 1,
        image: '/images/gitbox.png',
        category: 'Custom Gift Box'
      };
      addToCart(customGiftBox);
      setShowCustomizer(false);
      setCustomBox({
        name: '',
        items: [],
        weight: '1kg',
        price: 299
      });
    }
  };

  const handleCustomItemToggle = (item: string) => {
    setCustomBox(prev => ({
      ...prev,
      items: prev.items.includes(item)
        ? prev.items.filter(i => i !== item)
        : [...prev.items, item]
    }));
  };

  const availableSweets = [
    'Gulab Jamun', 'Jalebi', 'Barfi', 'Rasgulla', 'Sonpari',
    'Mysore Pak', 'Sandesh', 'Chhena Poda', 'Ledikeni',
    'Balushahi', 'Imarti', 'Rasmalai', 'Modak', 'Ariselu',
    'Bobbatlu', 'Chhena Gaja', 'Payasam', 'Rava Kesari'
  ];

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary-maroon mb-4">
            Premium Gift Boxes 🎁
          </h1>
          <p className="text-lg text-gray-600">
            Curated sweet collections for every occasion
          </p>
        </div>

        {/* Gift Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {giftBoxes.map((box) => (
            <div key={box.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={box.image} 
                  alt={box.name} 
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-accent-yellow text-primary-maroon px-2 py-1 rounded-full text-xs font-bold">
                  {box.weight}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-maroon mb-2">{box.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{box.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-accent-yellow mr-2">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-sm font-bold">{box.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({box.reviews} reviews)</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Includes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {box.items.map((item, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Perfect for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {box.occasions.map((occasion, index) => (
                      <span 
                        key={index} 
                        className="bg-primary-green text-white px-2 py-1 rounded-full text-xs"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-maroon">₹{box.price}</span>
                  <div className="space-x-2">
                    <button 
                      onClick={() => handleLike(box.id)}
                      className={`p-2 transition-colors ${
                        likedBoxes.has(box.id) 
                          ? 'text-red-500 hover:text-red-700' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart size={20} fill={likedBoxes.has(box.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button 
                      onClick={() => handleAddToCart(box)}
                      className="bg-primary-maroon text-white p-2 rounded-full hover:bg-primary-green transition-colors"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Gift Box Modal */}
        {showCustomizer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold text-primary-maroon mb-6">Customize Your Gift Box</h2>
              <form onSubmit={handleCustomBoxSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Gift Box Name</label>
                  <input
                    type="text"
                    value={customBox.name}
                    onChange={(e) => setCustomBox(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                    placeholder="Enter custom gift box name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Select Sweets</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {availableSweets.map((sweet) => (
                      <label key={sweet} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customBox.items.includes(sweet)}
                          onChange={() => handleCustomItemToggle(sweet)}
                          className="rounded text-primary-maroon focus:ring-primary-maroon"
                        />
                        <span className="text-sm">{sweet}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Weight</label>
                  <select
                    value={customBox.weight}
                    onChange={(e) => setCustomBox(prev => ({ 
                      ...prev, 
                      weight: e.target.value,
                      price: e.target.value === '1kg' ? 299 : e.target.value === '1.5kg' ? 399 : 499
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                  >
                    <option value="1kg">1kg - ₹299</option>
                    <option value="1.5kg">1.5kg - ₹399</option>
                    <option value="2kg">2kg - ₹499</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCustomizer(false)}
                    className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-maroon text-white px-6 py-2 rounded-full hover:bg-primary-green transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Special Offers */}
        <div className="bg-primary-maroon text-bg-cream rounded-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Special Festival Offers</h2>
            <p className="text-lg mb-6">
              Get 20% off on all gift boxes this festive season!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent-yellow text-primary-maroon px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
                Shop All Gift Boxes
              </button>
              <button 
                onClick={handleCustomize}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primary-maroon transition-colors"
              >
                Customize Your Box
              </button>
            </div>
          </div>
        </div>

        {/* Back to Shopping */}
        <div className="text-center">
          <Link href="/sweets" className="text-primary-green font-bold hover:underline">
            ← Continue Shopping Individual Sweets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftBoxesPage;
