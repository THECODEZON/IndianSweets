"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, Smartphone, Shield, ArrowLeft } from 'lucide-react';

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const amount = parseFloat(searchParams.get('amount') || '0');
  const paymentMethod = searchParams.get('paymentMethod') || 'COD';

  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    if (!orderId) {
      router.push('/checkout');
    }
  }, [orderId, router]);

  const handleUPIPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          email_address: 'user@example.com'
        }),
      });

      if (response.ok) {
        router.push(`/order-success?orderId=${orderId}`);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          email_address: 'user@example.com'
        }),
      });

      if (response.ok) {
        router.push(`/order-success?orderId=${orderId}`);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
    }
  };

  const handleCODPayment = () => {
    router.push(`/order-success?orderId=${orderId}&method=COD`);
    localStorage.removeItem('cart');
  };

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/checkout" 
            className="inline-flex items-center text-primary-green hover:underline mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Checkout
          </Link>
          <h1 className="text-3xl font-serif font-bold text-primary-maroon">Payment</h1>
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
                <span className="font-bold text-primary-maroon">₹{amount}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {paymentMethod === 'COD' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-maroon mb-4 flex items-center">
                  <Shield size={20} className="mr-2" />
                  Cash on Delivery
                </h2>
                <p className="text-gray-600 mb-6">
                  Pay when you receive your order. No additional charges.
                </p>
                <button
                  onClick={handleCODPayment}
                  className="w-full bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors"
                >
                  Confirm COD Order
                </button>
              </div>
            )}

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
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourupi@paytm"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-maroon focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ₹${amount}`
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
                    disabled={loading}
                    className="w-full bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ₹${amount}`
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
};

export default PaymentPage;
