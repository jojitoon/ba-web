'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      <section className='pt-32 pb-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-card rounded-xl p-8 md:p-12 metallic-border'>
            <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
              Privacy Policy
            </h1>
            <p className='text-foreground/60 mb-8'>
              Last updated: January 2025
            </p>

            <div className='prose prose-lg max-w-none text-foreground/80 space-y-8'>
              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  1. Introduction
                </h2>
                <p>
                  Built Ancestry ("we," "our," or "us") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  2. Information We Collect
                </h2>
                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  2.1 Information You Provide
                </h3>
                <p>We may collect information that you voluntarily provide to us, including:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Company or organization name</li>
                  <li>Project details and requirements</li>
                  <li>Account credentials (if you create an account)</li>
                  <li>Payment information (processed through secure third-party providers)</li>
                  <li>Communications with us (contact form submissions, emails)</li>
                </ul>

                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  2.2 Automatically Collected Information
                </h3>
                <p>When you visit our website, we may automatically collect:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  3. How We Use Your Information
                </h2>
                <p>We use the information we collect to:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and respond to your inquiries and requests</li>
                  <li>Send you administrative information and updates</li>
                  <li>Personalize your experience on our website</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  4. Information Sharing and Disclosure
                </h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>
                    <strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting our business
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may share information with your explicit consent
                  </li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  5. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information. However, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure. While we strive to use commercially acceptable
                  means to protect your information, we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  6. Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track
                  activity on our website and store certain information. You can
                  instruct your browser to refuse all cookies or to indicate when
                  a cookie is being sent. However, if you do not accept cookies,
                  you may not be able to use some portions of our website.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  7. Your Rights and Choices
                </h2>
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to request deletion of your information</li>
                  <li>The right to object to processing of your information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className='mt-4'>
                  To exercise these rights, please contact us at{' '}
                  <a
                    href='mailto:builtAncestry@gmail.com'
                    className='text-primary hover:underline'
                  >
                    builtAncestry@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  8. Children's Privacy
                </h2>
                <p>
                  Our services are not directed to individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If you become aware that a child has provided us with
                  personal information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  9. Third-Party Links
                </h2>
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  third-party sites. We encourage you to review the privacy
                  policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  10. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. You are advised
                  to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  11. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className='mt-4 space-y-2'>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href='mailto:builtAncestry@gmail.com'
                      className='text-primary hover:underline'
                    >
                      builtAncestry@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href='tel:+13476799566'
                      className='text-primary hover:underline'
                    >
                      347-679-9566
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> New York, NY
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

