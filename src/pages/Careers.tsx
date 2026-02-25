// pages/Careers.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { User, Launch } from '@carbon/icons-react';

const Careers: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <User size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers at Lumii</h1>
          <p className="text-lg text-gray-600">Join our team!</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-700 mb-6">
            We're always looking for talented individuals to join our team. Check back soon for open positions!
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <span>Back to Home</span>
            <Launch size={16} />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;