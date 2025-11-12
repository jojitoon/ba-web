'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function CookiePolicyPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      <section className='pt-32 pb-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-card rounded-xl p-8 md:p-12 metallic-border'>
            <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
              Cookie Policy
            </h1>
            <p className='text-foreground/60 mb-8'>
              Last updated: January 2025
            </p>

            <div className='prose prose-lg max-w-none text-foreground/80 space-y-8'>
              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  1. What Are Cookies
                </h2>
                <p>
                  Cookies are small text files that are placed on your computer
                  or mobile device when you visit a website. They are widely used
                  to make websites work more efficiently and provide information
                  to the website owners. Cookies allow a website to recognize
                  your device and store some information about your preferences
                  or past actions.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  2. How We Use Cookies
                </h2>
                <p>
                  Built Ancestry uses cookies and similar tracking technologies to
                  track activity on our website and store certain information. We
                  use cookies for the following purposes:
                </p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>
                    <strong>Essential Cookies:</strong> These cookies are
                    necessary for the website to function properly. They enable
                    basic functions like page navigation and access to secure
                    areas of the website.
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> These cookies help us
                    understand how visitors interact with our website by
                    collecting and reporting information anonymously. This helps
                    us improve our website's performance and user experience.
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> These cookies remember
                    your preferences and settings, such as language preferences,
                    to provide a more personalized experience.
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> These cookies are used to
                    track visitors across websites to display relevant
                    advertisements and measure the effectiveness of our marketing
                    campaigns.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  3. Types of Cookies We Use
                </h2>
                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  3.1 Session Cookies
                </h3>
                <p>
                  Session cookies are temporary cookies that are deleted when you
                  close your browser. They help maintain your session while you
                  navigate through our website.
                </p>

                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  3.2 Persistent Cookies
                </h3>
                <p>
                  Persistent cookies remain on your device for a set period or
                  until you delete them. They help us recognize you when you
                  return to our website and remember your preferences.
                </p>

                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  3.3 First-Party Cookies
                </h3>
                <p>
                  First-party cookies are set by our website directly. These
                  cookies are used to provide core functionality and improve user
                  experience.
                </p>

                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  3.4 Third-Party Cookies
                </h3>
                <p>
                  Third-party cookies are set by domains other than ours. These
                  may include analytics services, advertising networks, or social
                  media platforms that provide features on our website.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  4. Specific Cookies We Use
                </h2>
                <div className='overflow-x-auto'>
                  <table className='min-w-full border border-border rounded-lg'>
                    <thead className='bg-secondary/50'>
                      <tr>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border'>
                          Cookie Name
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border'>
                          Purpose
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border'>
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-border'>
                      <tr>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          session_id
                        </td>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          Maintains user session
                        </td>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          Session
                        </td>
                      </tr>
                      <tr>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          preferences
                        </td>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          Stores user preferences
                        </td>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          1 year
                        </td>
                      </tr>
                      <tr>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          analytics
                        </td>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          Tracks website usage
                        </td>
                        <td className='px-4 py-3 text-sm text-foreground/80'>
                          2 years
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  5. Managing Cookies
                </h2>
                <p>
                  You have the right to accept or reject cookies. Most web
                  browsers automatically accept cookies, but you can usually
                  modify your browser settings to decline cookies if you prefer.
                  However, this may prevent you from taking full advantage of our
                  website.
                </p>

                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  5.1 Browser Settings
                </h3>
                <p>You can control cookies through your browser settings:</p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and Security →
                    Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Options → Privacy & Security →
                    Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies and
                    website data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Privacy, search, and
                    services → Cookies and site permissions
                  </li>
                </ul>

                <h3 className='text-xl font-semibold text-foreground mt-6 mb-3'>
                  5.2 Opt-Out Tools
                </h3>
                <p>
                  You can also opt out of certain third-party cookies by visiting
                  the following websites:
                </p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>
                    <a
                      href='http://www.aboutads.info/choices/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:underline'
                    >
                      Digital Advertising Alliance
                    </a>
                  </li>
                  <li>
                    <a
                      href='http://www.youronlinechoices.eu/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:underline'
                    >
                      Your Online Choices
                    </a>
                  </li>
                  <li>
                    <a
                      href='http://www.networkadvertising.org/choices/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:underline'
                    >
                      Network Advertising Initiative
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  6. Impact of Disabling Cookies
                </h2>
                <p>
                  If you choose to disable cookies, some features of our website
                  may not function properly. This may include:
                </p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>Inability to stay logged into your account</li>
                  <li>Loss of personalized preferences</li>
                  <li>Reduced functionality of interactive features</li>
                  <li>Inability to save favorite projects or stories</li>
                </ul>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  7. Local Storage and Similar Technologies
                </h2>
                <p>
                  In addition to cookies, we may use other similar technologies
                  such as:
                </p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>
                    <strong>Local Storage:</strong> Stores data locally in your
                    browser for faster access and improved performance
                  </li>
                  <li>
                    <strong>Session Storage:</strong> Stores data for a single
                    browser session
                  </li>
                  <li>
                    <strong>Web Beacons:</strong> Small transparent images used
                    to track website usage
                  </li>
                  <li>
                    <strong>Pixel Tags:</strong> Similar to web beacons, used to
                    track user interactions
                  </li>
                </ul>
                <p className='mt-4'>
                  These technologies are subject to the same privacy and security
                  considerations as cookies and can be managed through your
                  browser settings.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  8. Updates to This Cookie Policy
                </h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. We will notify you of any material changes
                  by posting the new Cookie Policy on this page and updating the
                  "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-foreground mt-8 mb-4'>
                  9. Contact Us
                </h2>
                <p>
                  If you have any questions about our use of cookies or this
                  Cookie Policy, please contact us:
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

