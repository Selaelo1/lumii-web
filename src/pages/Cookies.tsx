// pages/Cookies.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Cookie, Launch } from '@carbon/icons-react';

const Cookies: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <Cookie size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">Last updated: February 25, 2025</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="prose max-w-none">
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
              <p className="text-gray-700">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Authentication Cookies:</strong> Keep you logged in securely</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
              <p className="text-gray-700">
                Most web browsers allow you to control cookies through their settings preferences. 
                However, limiting cookies may affect your ability to use certain features of our website.
              </p>
            </section>

            <div className="text-center pt-4">
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <span>Back to Home</span>
                <Launch size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;