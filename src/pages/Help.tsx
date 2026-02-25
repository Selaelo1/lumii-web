// pages/Help.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Help as HelpIcon, Launch } from '@carbon/icons-react';


const Help: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <HelpIcon size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">How can we help you?</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600">Learn the basics of using Lumii</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Account Settings</h3>
              <p className="text-sm text-gray-600">Manage your profile and preferences</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Study Tools</h3>
              <p className="text-sm text-gray-600">How to use our study features</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Billing & Subscriptions</h3>
              <p className="text-sm text-gray-600">Manage your payments and plans</p>
            </div>
          </div>
          
          <div className="text-center pt-6">
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
    </Layout>
  );
};

export default Help;