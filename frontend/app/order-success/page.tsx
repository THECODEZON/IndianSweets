"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowLeft, Home, Truck, Mail } from 'lucide-react';

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const paymentMethod = searchParams.get('method') || 'Online';

  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/orders/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data.data);
          
          // Clear cart after successful order
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handleContinueShopping = () => {
    router.push('/sweets');
  };

  const handleTrackOrder = () => {
    // In a real app, this would open a tracking modal or go to tracking page
    alert('Tracking feature coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-maroon mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-8">The order you're looking for could not be found.</p>
            <Link 
              href="/orders" 
              className="bg-primary-maroon text-white px-8 py-3 rounded-full font-bold hover:bg-primary-green transition-colors"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-primary-maroon mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. We've received your payment and will start processing your sweets.
          </p>
          <p className="text-gray-600">
            Order ID: <span className="font-mono font-bold">{orderId.slice(-8)}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary-maroon mb-4">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{orderId.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">
                    {new Date(orderDetails.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {orderDetails.guestInfo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{orderDetails.guestInfo.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  {orderDetails.shippingAddress.addressLine1}<br />
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}<br />
                  📞 {orderDetails.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Items</h3>
              <div className="space-y-3">
                {orderDetails.orderItems.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/images/default-sweet.jpg';
                          }}
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.qty} × ₹{item.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-maroon">₹{item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Total:</span>
                  <span className="font-medium">₹{orderDetails.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {orderDetails.shippingPrice === 0 ? 'FREE' : `₹${orderDetails.shippingPrice}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">₹{orderDetails.taxPrice}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-primary-maroon">Total Paid:</span>
                    <span className="font-bold text-primary-maroon">₹{orderDetails.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Status</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${
                  orderDetails.status === 'Placed' ? 'bg-blue-500' :
                  orderDetails.status === 'Processing' ? 'bg-yellow-500' :
                  orderDetails.status === 'Shipped' ? 'bg-purple-500' :
                  'bg-green-500'
                }`}></div>
                <span className="font-medium text-gray-700">{orderDetails.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${
                  orderDetails.isPaid ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className="font-medium text-gray-700">
                  {orderDetails.isPaid ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${
                  orderDetails.isDelivered ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className="font-medium text-gray-700">
                  {orderDetails.isDelivered ? 'Delivered' : 'Processing'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleTrackOrder}
            className="flex items-center justify-center bg-primary-maroon text-white px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors"
          >
            <Truck size={20} className="mr-2" />
            Track Order
          </button>
          <button
            onClick={handleContinueShopping}
            className="flex items-center justify-center border-2 border-primary-maroon text-primary-maroon px-6 py-3 rounded-full font-bold hover:bg-primary-green transition-colors"
          >
            <Home size={20} className="mr-2" />
            Continue Shopping
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 p-6 bg-accent-yellow/20 rounded-lg text-center">
          <p className="text-sm text-primary-maroon mb-2">
            <Mail size={16} className="mr-2" />
            Order confirmation sent to your email
          </p>
          <p className="text-gray-600">
            You'll receive order updates via email and can track your order status here.
          </p>
        </div>

        {/* Back to Orders */}
        <div className="text-center mt-6">
          <Link 
            href="/orders" 
            className="inline-flex items-center text-primary-green hover:underline"
          >
            <ArrowLeft size={20} className="mr-2" />
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

const OrderSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-maroon mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccessPage;
