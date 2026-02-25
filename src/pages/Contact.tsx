// pages/Contact.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Email, Launch } from '@carbon/icons-react';

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <Email size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">We'd love to hear from you</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:support@lumii.app" className="text-purple-600 hover:text-purple-700">
                support@lumii.app
              </a>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+15551234567" className="text-purple-600 hover:text-purple-700">
                +1 (555) 123-4567
              </a>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-700">
                Lumii Learning<br />
                123 Study Street<br />
                San Francisco, CA 94105
              </p>
            </div>
            
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

export default Contact;