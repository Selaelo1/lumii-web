// pages/Support.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {  Help, Launch, Email } from '@carbon/icons-react';

const Support: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <Help size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support</h1>
          <p className="text-lg text-gray-600">We're here to help</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-6">
            <div className="p-6 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Support</h3>
              <p className="text-gray-700 mb-4">
                Have a question or need assistance? Our support team is ready to help.
              </p>
              <a 
                href="mailto:selaelolanga@gmail.com" 
                className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Email size={16} />
                <span>Email Support</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Hours</h4>
                <p className="text-sm text-gray-600">Monday - Friday, 9am - 6pm PT</p>
              </div>
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

export default Support;