"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Order {
  _id: string;
  orderItems: Array<{
    name: string;
    qty: number;
    price: number;
    image?: string;
  }>;
  shippingAddress: {
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  status: 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/orders/myorders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Placed':
        return <Clock size={20} className="text-blue-500" />;
      case 'Processing':
        return <Package size={20} className="text-yellow-500" />;
      case 'Shipped':
        return <Truck size={20} className="text-purple-500" />;
      case 'Delivered':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'Cancelled':
        return <XCircle size={20} className="text-red-500" />;
      default:
        return <Clock size={20} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Placed':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login to View Orders</h2>
            <p className="text-gray-600 mb-8">You need to be logged in to view your order history.</p>
            <Link 
              href="/login" 
              className="bg-primary-maroon text-white px-8 py-3 rounded-full font-bold hover:bg-primary-green transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-maroon mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping!</p>
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
        <h1 className="text-3xl font-serif font-bold text-primary-maroon mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-3 md:mt-0">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                  {order.isPaid && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Paid
                    </span>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b">
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
                          <h5 className="font-medium text-gray-800">{item.name}</h5>
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

              {/* Shipping Address */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Shipping Address</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {order.shippingAddress.addressLine1}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                    📞 {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-gray-600">
                      Payment Method: <span className="font-medium">{order.paymentMethod}</span>
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">Items: ₹{order.itemsPrice}</span>
                      <span className="text-sm text-gray-600">Shipping: {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-maroon">
                      Total: ₹{order.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Shopping */}
        <div className="text-center mt-8">
          <Link href="/sweets" className="text-primary-green font-bold hover:underline">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
