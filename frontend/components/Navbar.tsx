"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-primary-maroon text-bg-cream shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold text-accent-yellow">
              Mithai Wala
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/sweets" className="hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium">
                All Sweets
              </Link>
              <Link href="/festivals" className="hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium">
                Festivals
              </Link>
              <Link href="/seasons" className="hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium">
                Seasons
              </Link>
              <Link href="/gift-boxes" className="hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium">
                Gift Boxes
              </Link>
              <Link href="/about-us" className="hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium">
                About Us
              </Link>
              <Link href="/contact-us" className="hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative hover:text-accent-yellow">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link href="/orders" className="hover:text-accent-yellow">
              <Package size={24} />
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Hi, {user.name}</span>
                <button onClick={logout} className="text-sm hover:text-accent-yellow">Logout</button>
              </div>
            ) : (
              <Link href="/login" className="hover:text-accent-yellow">
                <User size={24} />
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-bg-cream hover:text-white hover:bg-primary-green focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-maroon">
            <Link href="/sweets" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
              All Sweets
            </Link>
            <Link href="/festivals" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
              Festivals
            </Link>
            <Link href="/seasons" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
              Seasons
            </Link>
            <Link href="/gift-boxes" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
              Gift Boxes
            </Link>
            <Link href="/about-us" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
              About Us
            </Link>
            <Link href="/contact-us" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
              Contact Us
            </Link>
            <Link href="/cart" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
              Cart ({cartItems.length})
            </Link>
            {user ? (
              <button onClick={logout} className="block w-full text-left hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
                Logout
              </button>
            ) : (
              <Link href="/login" className="block hover:text-accent-yellow px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
