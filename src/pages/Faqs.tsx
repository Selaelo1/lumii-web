// pages/Faqs.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { User, Launch } from '@carbon/icons-react';

const Faqs: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <User size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">What is Lumii?</h3>
              <p className="text-gray-600">Lumii is a certification tracking and study platform that helps you prepare for and pass your certification exams.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Is Lumii free?</h3>
              <p className="text-gray-600">Yes, Lumii offers a free tier with basic features. Premium features are available with a subscription.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How do I track my study streak?</h3>
              <p className="text-gray-600">Your study streak is automatically tracked when you log your study sessions in the Tracker.</p>
            </div>
            
            <div className="pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can I export my data?</h3>
              <p className="text-gray-600">Yes, you can export your study data and progress from your profile settings.</p>
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

export default Faqs;