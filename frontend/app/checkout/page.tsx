"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, CreditCard, Smartphone, Truck, User, Shield } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: ''
  });

  // Guest info state
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Order state
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  // Calculate totals
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Clear cart immediately when user places order
    localStorage.removeItem('cart');

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          image: item.image || '',
          product: item.id
        })),
        shippingAddress,
        paymentMethod,
        orderNotes,
        guestInfo: user ? null : guestInfo,
        user: user?._id || null
      };

      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        const orderId = data.data._id;
        
        if (paymentMethod === 'COD') {
          // For COD, process payment immediately
          const payResponse = await fetch(`http://localhost:5001/api/orders/${orderId}/pay`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: 'COD_' + Date.now(),
              status: 'completed',
              update_time: new Date().toISOString(),
              email_address: guestInfo?.email || user?.email || 'user@example.com'
            }),
          });

          if (payResponse.ok) {
            setOrderId(orderId);
            setOrderPlaced(true);
            localStorage.removeItem('cart');
          }
        } else {
          // For UPI and Card, show payment form
          setOrderId(orderId);
          setShowPayment(true);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUPIPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await fetch(`http://localhost:5001/api/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'UPI_' + Date.now(),
          status: 'completed',
          update_time: new Date().toISOString(),
          email_address: guestInfo?.email || user?.email || 'user@example.com'
        }),
      });

      if (response.ok) {
        setOrderPlaced(true);
        setShowPayment(false);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const response = await fetch(`http://localhost:5001/api/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'CARD_' + Date.now(),
          status: 'completed',
          update_time: new Date().toISOString(),
          email_address: guestInfo?.email || user?.email || 'user@example.com'
        }),
      });

      if (response.ok) {
        setOrderPlaced(true);
        setShowPayment(false);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  // Payment Forms
  if (showPayment) {
    return (
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => setShowPayment(false)}
              className="inline-flex items-center text-primary-green hover:underline mb-4"
            >
              ← Back to Checkout
            </button>
            <h1 className="text-3xl font-serif font-bold text-primary-maroon">Complete Payment</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary-maroon mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono text-sm">{orderId.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold text-primary-maroon">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {paymentMethod === 'UPI' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-primary-maroon mb-4 flex items-center">
                    <Smartphone size={20} className="mr-2" />
                    UPI Payment
                  </h2>
                  <form onSubmit={handleUPIPayment} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourupi@paytm"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={paymentLoading}
                      className="w-full bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors disabled:opacity-50"
                    >
                      {paymentLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        `Pay ₹${totalPrice}`
                      )}
                    </button>
                  </form>
                  <p className="text-sm text-gray-500 mt-4">
                    🔒 Secure payment powered by UPI
                  </p>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-primary-maroon mb-4 flex items-center">
                    <CreditCard size={20} className="mr-2" />
                    Card Payment
                  </h2>
                  <form onSubmit={handleCardPayment} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength={3}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={paymentLoading}
                      className="w-full bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors disabled:opacity-50"
                    >
                      {paymentLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        `Pay ₹${totalPrice}`
                      )}
                    </button>
                  </form>
                  <div className="mt-6 p-4 bg-accent-yellow/20 rounded-lg">
                    <p className="text-sm text-primary-maroon flex items-center">
                      <Shield size={16} className="mr-2" />
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-bg-cream py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-primary-maroon mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-2">
            Thank you for your order!
          </p>
          <p className="text-gray-600 mb-6">
            Order ID: <span className="font-mono font-bold">{orderId}</span>
          </p>
          <p className="text-gray-600 mb-6">
            We'll send you order updates via email.
          </p>
          <div className="space-y-3">
            <Link 
              href="/orders"
              className="block bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious sweets to your cart!</p>
            <Link 
              href="/sweets" 
              className="bg-primary-maroon text-white px-8 py-3 rounded-full font-bold hover:bg-primary-green transition-colors"
            >
              Browse Sweets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-primary-maroon mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Guest Information */}
            {!user && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-maroon mb-4 flex items-center">
                  <User size={20} className="mr-2" />
                  Guest Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={guestInfo.name}
                      onChange={handleGuestInfoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={guestInfo.email}
                      onChange={handleGuestInfoChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary-maroon mb-4 flex items-center">
                <Truck size={20} className="mr-2" />
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={shippingAddress.addressLine1}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      placeholder="Postal code"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary-maroon mb-4 flex items-center">
                <CreditCard size={20} className="mr-2" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-maroon"
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-maroon"
                  />
                  <div className="flex items-center">
                    <Smartphone size={16} className="mr-2" />
                    <span>UPI</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-maroon"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="NetBanking"
                    checked={paymentMethod === 'NetBanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-maroon"
                  />
                  <span>Net Banking</span>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary-maroon mb-4">Order Notes (Optional)</h2>
              <textarea
                name="orderNotes"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                placeholder="Special instructions for your order..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {orderNotes.length}/500 characters
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-primary-maroon mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-maroon">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Items Total:</span>
                  <span>₹{itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{taxPrice}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary-maroon">₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Message */}
              {itemsPrice <= 500 && (
                <div className="mt-4 p-3 bg-accent-yellow/20 rounded-lg text-sm">
                  <p className="text-primary-maroon">
                    🎁 Add ₹{500 - itemsPrice} more for FREE shipping!
                  </p>
                </div>
              )}

              {/* Place Order Button */}
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors disabled:opacity-50 mt-6"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Placing Order...
                    </div>
                  ) : (
                    `Place Order • ₹${totalPrice}`
                  )}
                </button>
              </form>

              {/* Back to Cart */}
              <div className="text-center mt-4">
                <Link href="/cart" className="text-primary-green hover:underline">
                  ← Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
