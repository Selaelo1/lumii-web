// pages/Terms.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Document, Tools, Certificate } from '@carbon/icons-react';

const Terms: React.FC = () => {
  const lastUpdated = "February 25, 2025";
  const effectiveDate = "March 1, 2025";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <Tools size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
          <p className="text-md text-gray-500">Effective: {effectiveDate}</p>
        </div>

        {/* Quick Summary */}
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Document size={24} className="text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Summary</h3>
              <p className="text-sm text-gray-700">
                By using Lumii, you agree to these terms. We provide a platform to track your certification progress 
                and study activities. You own your data, and we're committed to keeping it safe. Please read the full 
                terms below for complete details.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="prose prose-purple max-w-none">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Lumii ("the Service"), you agree to be bound by these Terms of Service and all 
                applicable laws and regulations. If you do not agree with any part of these terms, you may not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lumii provides a platform for users to track their certification progress, manage study activities, 
                maintain study streaks, and access study tools. The Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Certification tracking and management</li>
                <li>Study streak and progress monitoring</li>
                <li>Study tools and resources</li>
                <li>Performance analytics</li>
                <li>Community features (study groups)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use certain features of the Service, you must register for an account. You agree to provide accurate, 
                current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Responsibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for safeguarding your password and for all activities that occur under your account. 
                You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Account Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account at our discretion, including for violation of 
                these terms or extended inactivity. You may delete your account at any time through your profile settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Content and Data</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Your Ownership</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain all rights to any content you submit, post, or display on or through the Service. Your study data, 
                progress information, and personal content belong to you.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 License to Us</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By submitting content to the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                reproduce, modify, and display such content solely for the purpose of providing and improving the Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Data Deletion</h3>
              <p className="text-gray-700 leading-relaxed">
                You can delete your content at any time. When you delete content, it may remain in backups for a limited period 
                but will not be accessible through the Service. Account deletion will remove your personal data from active systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the Service for any illegal purpose</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Upload malicious code or attempt to compromise the Service</li>
                <li>Interfere with other users' enjoyment of the Service</li>
                <li>Create multiple accounts to abuse features or manipulate study streaks</li>
                <li>Use automated means to access the Service without our permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service, including its original content, features, and functionality, is owned by Lumii and is protected 
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The Lumii name, logo, and all related names, logos, product and service names, designs, and slogans are 
                trademarks of Lumii or its affiliates. You may not use such marks without our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Subscription and Payments</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Free Tier</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lumii offers a free tier with basic features. We reserve the right to modify free tier features at any time.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Premium Subscriptions</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Premium features may require a paid subscription. Subscription fees are non-refundable except as required 
                by law or as specified in our refund policy.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 Billing</h3>
              <p className="text-gray-700 leading-relaxed">
                By subscribing to a paid plan, you authorize us to charge your provided payment method on a recurring basis. 
                You may cancel your subscription at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. 
                WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL LUMII BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER 
                INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to defend, indemnify, and hold harmless Lumii and its employees, contractors, and agents from and 
                against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your 
                use of the Service or your violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may modify these terms at any time. We will provide notice of material changes through the Service or via email. 
                Your continued use of the Service after such modifications constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by the laws of the State of California without regard to its conflict of law provisions. 
                Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts 
                located in San Francisco County, California.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">Email: <a href="mailto:legal@lumii.app" className="text-purple-600 hover:text-purple-700">legal@lumii.app</a></p>
                <p className="text-gray-700">Address: Lumii Learning, 123 Study Street, San Francisco, CA 94105</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-100">
          <div className="flex items-center space-x-3">
            <Certificate size={24} className="text-purple-600" />
            <p className="text-sm text-gray-700">
              By using Lumii, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service 
              and our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;