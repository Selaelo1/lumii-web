// pages/Privacy.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Certificate, Security, Calendar } from '@carbon/icons-react';

const Privacy: React.FC = () => {
  const lastUpdated = "February 25, 2025";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <Security size={32} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-purple-50 rounded-xl p-4">
            <Security size={24} className="text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Data Collection</h3>
            <p className="text-sm text-gray-600">What we collect and why</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <Security size={24} className="text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Your Rights</h3>
            <p className="text-sm text-gray-600">Control your data</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <Calendar size={24} className="text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Cookies</h3>
            <p className="text-sm text-gray-600">How we use them</p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="prose prose-purple max-w-none">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At Lumii ("we," "our," or "us"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our certification tracking and study platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you register on the Services, express interest in obtaining information about us or our products, or otherwise contact us. The personal information we collect may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Name and email address</li>
                <li>Profile information (bio, current role, experience level)</li>
                <li>Study preferences and goals</li>
                <li>Certification targets and progress</li>
                <li>Study streak and activity data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Derived Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our servers automatically collect information when you access the Services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, click patterns)</li>
                <li>Study statistics and performance metrics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create and manage your account</li>
                <li>Track your study progress and maintain streaks</li>
                <li>Provide personalized study recommendations</li>
                <li>Send you study reminders and notifications</li>
                <li>Improve and optimize our services</li>
                <li>Respond to your comments and questions</li>
                <li>Send administrative information (updates, security alerts)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Service Providers:</strong> With third-party vendors who help us operate our platform (hosting, analytics, email services)</li>
                <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Data Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@lumii.app" className="text-purple-600 hover:text-purple-700">privacy@lumii.app</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">Email: <a href="mailto:privacy@lumii.app" className="text-purple-600 hover:text-purple-700">privacy@lumii.app</a></p>
                <p className="text-gray-700">Address: Lumii Learning, 123 Study Street, San Francisco, CA 94105</p>
              </div>
            </section>
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

export default Privacy;