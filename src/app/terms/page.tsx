'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      <section className='pt-32 pb-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-card rounded-xl p-8 md:p-12 metallic-border'>
            <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
              Terms and Conditions
            </h1>
            <p className='text-foreground/60 mb-8'>
              Last updated: January 2025
            </p>

            <div className='prose prose-lg max-w-none text-foreground/80 space-y-8'>
              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  1. Agreement to Terms
                </h2>
                <p>
                  By accessing or using the Built Ancestry website and services,
                  you agree to be bound by these Terms and Conditions. If you
                  disagree with any part of these terms, you may not access our
                  services.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  2. Description of Services
                </h2>
                <p>
                  Built Ancestry provides documentation and storytelling services
                  for construction projects and businesses, including:
                </p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>Construction project documentation and photography</li>
                  <li>Business documentary production</li>
                  <li>QR/NFC plaque services</li>
                  <li>Team interviews and testimonials</li>
                  <li>Digital content creation and hosting</li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  3. User Accounts
                </h2>
                <p>
                  When you create an account with us, you must provide accurate,
                  complete, and current information. You are responsible for
                  safeguarding your account credentials and for all activities
                  that occur under your account. You agree to notify us
                  immediately of any unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  4. Intellectual Property Rights
                </h2>
                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  4.1 Our Content
                </h3>
                <p>
                  All content on our website, including text, graphics, logos,
                  images, and software, is the property of Built Ancestry or its
                  content suppliers and is protected by copyright and other
                  intellectual property laws.
                </p>

                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  4.2 User Content
                </h3>
                <p>
                  You retain ownership of any content you submit to us. By
                  submitting content, you grant Built Ancestry a worldwide,
                  non-exclusive, royalty-free license to use, reproduce, modify,
                  and display your content for the purpose of providing our
                  services.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  5. Payment Terms
                </h2>
                <p>
                  Payment terms will be specified in individual service
                  agreements. All fees are non-refundable unless otherwise stated
                  in writing. We reserve the right to change our pricing at any
                  time, with notice to existing clients.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  6. Service Delivery
                </h2>
                <p>
                  We will make reasonable efforts to deliver services within
                  agreed timeframes. However, delivery dates are estimates and
                  not guaranteed. Delays may occur due to circumstances beyond
                  our control, including but not limited to weather conditions,
                  client availability, or technical issues.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  7. Client Responsibilities
                </h2>
                <p>Clients are responsible for:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>Providing accurate information and materials</li>
                  <li>Ensuring access to project sites or business locations</li>
                  <li>Obtaining necessary permissions and releases</li>
                  <li>Reviewing and approving content in a timely manner</li>
                  <li>Making payments according to agreed terms</li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  8. Prohibited Uses
                </h2>
                <p>You agree not to use our services:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To collect or track the personal information of others</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                  <li>To interfere with or circumvent the security features of our services</li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  9. Disclaimer of Warranties
                </h2>
                <p>
                  Our services are provided "as is" and "as available" without
                  warranties of any kind, either express or implied. We do not
                  warrant that our services will be uninterrupted, secure, or
                  error-free, or that defects will be corrected.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  10. Limitation of Liability
                </h2>
                <p>
                  To the fullest extent permitted by law, Built Ancestry shall
                  not be liable for any indirect, incidental, special,
                  consequential, or punitive damages, or any loss of profits or
                  revenues, whether incurred directly or indirectly, or any loss
                  of data, use, goodwill, or other intangible losses resulting
                  from your use of our services.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  11. Indemnification
                </h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Built
                  Ancestry and its officers, directors, employees, and agents
                  from and against any claims, liabilities, damages, losses, and
                  expenses, including reasonable attorney's fees, arising out of
                  or in any way connected with your use of our services or
                  violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  12. Termination
                </h2>
                <p>
                  We may terminate or suspend your account and access to our
                  services immediately, without prior notice or liability, for
                  any reason, including if you breach these Terms. Upon
                  termination, your right to use the services will immediately
                  cease.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  13. Governing Law
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of the State of New York, United States, without
                  regard to its conflict of law provisions. Any disputes arising
                  from these Terms shall be subject to the exclusive jurisdiction
                  of the courts located in New York, NY.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  14. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will
                  notify users of any material changes by posting the new Terms
                  on this page and updating the "Last updated" date. Your
                  continued use of our services after such modifications
                  constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  15. Severability
                </h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or
                  invalid, that provision shall be limited or eliminated to the
                  minimum extent necessary, and the remaining provisions shall
                  remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  16. Entire Agreement
                </h2>
                <p>
                  These Terms, together with our Privacy Policy, constitute the
                  entire agreement between you and Built Ancestry regarding the
                  use of our services and supersede all prior agreements and
                  understandings.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  17. Contact Information
                </h2>
                <p>
                  If you have any questions about these Terms and Conditions,
                  please contact us:
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

