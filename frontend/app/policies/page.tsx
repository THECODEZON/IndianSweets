"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      icon: '🔒',
      content: [
        {
          heading: 'Information We Collect',
          text: 'We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This includes your name, email address, phone number, payment information, and delivery address.'
        },
        {
          heading: 'How We Use Your Information',
          text: 'We use the information we collect to process your orders, communicate with you about your orders, provide customer support, personalize your experience, and improve our services.'
        },
        {
          heading: 'Information Sharing',
          text: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to fulfill your orders or as required by law.'
        },
        {
          heading: 'Data Security',
          text: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        }
      ]
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: '🚚',
      content: [
        {
          heading: 'Delivery Areas',
          text: 'We currently deliver within Mumbai city limits. For orders outside Mumbai, please contact us for special delivery arrangements.'
        },
        {
          heading: 'Delivery Time',
          text: 'Standard delivery: 2-3 business days within Mumbai. Express delivery: Same day for orders placed before 2 PM (additional charges apply).'
        },
        {
          heading: 'Delivery Charges',
          text: 'Free delivery for orders above ₹500. For orders below ₹500, a nominal delivery charge of ₹50 applies.'
        },
        {
          heading: 'Order Tracking',
          text: 'Once your order is dispatched, you will receive a tracking number via email/SMS to monitor your delivery status.'
        }
      ]
    },
    returns: {
      title: 'Returns & Refunds Policy',
      icon: '↩️',
      content: [
        {
          heading: 'Return Policy',
          text: 'We accept returns within 24 hours of delivery if there is a quality issue or wrong product delivered. Please contact us immediately if you face any issues.'
        },
        {
          heading: 'Refund Process',
          text: 'Refunds are processed within 5-7 business days after we receive the returned product. The amount will be credited to your original payment method.'
        },
        {
          heading: 'Non-Returnable Items',
          text: 'Due to food safety regulations, we cannot accept returns on opened or consumed products, unless there is a quality issue.'
        },
        {
          heading: 'Damaged Products',
          text: 'If you receive damaged products, please contact us immediately with photos. We will arrange for replacement or refund at the earliest.'
        }
      ]
    },
    payment: {
      title: 'Payment Policy',
      icon: '💳',
      content: [
        {
          heading: 'Accepted Payment Methods',
          text: 'We accept cash on delivery, UPI, debit cards, credit cards, and net banking. All online payments are secured with industry-standard encryption.'
        },
        {
          heading: 'Payment Security',
          text: 'Your payment information is encrypted and secure. We do not store your card details on our servers.'
        },
        {
          heading: 'Order Confirmation',
          text: 'You will receive an order confirmation via email and SMS once your payment is successfully processed.'
        },
        {
          heading: 'Failed Payments',
          text: 'If your payment fails, you will be notified immediately. You can retry the payment or choose an alternative payment method.'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary-maroon mb-4">
            Our Policies
          </h1>
          <p className="text-lg text-gray-600">
            Clear policies for a sweet and transparent relationship
          </p>
        </div>

        {/* Policy Tabs */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2 space-y-2">
          {Object.entries(policies).map(([key, policy]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === key
                  ? 'bg-primary-maroon text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{policy.icon}</span>
              {policy.title}
            </button>
          ))}
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary-maroon mb-2 flex items-center">
              <span className="mr-3">{policies[activeTab as keyof typeof policies].icon}</span>
              {policies[activeTab as keyof typeof policies].title}
            </h2>
            <div className="w-20 h-1 bg-accent-yellow rounded"></div>
          </div>

          <div className="space-y-8">
            {policies[activeTab as keyof typeof policies].content.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-primary-maroon mb-3">
                  {section.heading}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-primary-maroon mb-3">
              Need Help?
            </h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our policies or need clarification, please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> ddas12181@gmail.com</p>
              <p><strong>Phone:</strong> +91 6267093990</p>
              <p><strong>Address:</strong> old phagwara deepnager</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-primary-maroon text-bg-cream rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Policies?</h2>
          <p className="text-lg mb-6">
            Our customer support team is here to help you understand our policies better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us" 
              className="bg-accent-yellow text-primary-maroon px-8 py-3 rounded-full font-bold hover:bg-white transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              href="/about-us" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primary-maroon transition-colors"
            >
              About Mithai Wala
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary-green font-bold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
