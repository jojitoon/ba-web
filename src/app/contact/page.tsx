"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Building2,
  Video,
  Users,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    projectType: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-50 pb-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get <span className="text-primary">Started</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Ready to preserve your legacy? Contact us to discuss your project
              documentation or business documentary needs. We're here to help
              bring your story to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-card rounded-xl p-8 metallic-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Service Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="business-documentary">
                        Business Documentary
                      </option>
                      <option value="construction-documentation">
                        Construction Documentation
                      </option>
                      <option value="qr-plaque">QR/NFC Plaque Service</option>
                      <option value="both">Both Services</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select project type</option>
                      <option value="commercial">
                        Commercial Construction
                      </option>
                      <option value="residential">
                        Residential Construction
                      </option>
                      <option value="industrial">
                        Industrial Construction
                      </option>
                      <option value="retail-business">Retail Business</option>
                      <option value="restaurant">
                        Restaurant/Food Service
                      </option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-3 metallic-glow"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  Ready to start your project? We'd love to hear from you.
                  Whether you're a construction firm looking to document your
                  latest project or a business owner wanting to tell your story,
                  we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Email Us
                    </h3>
                    <p>
                      <a
                        href="mailto:builtAncestry@gmail.com"
                        className="text-foreground/70"
                      >
                        builtAncestry@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Call Us
                    </h3>
                    <a href="tel:+13476799566" className="text-foreground/70">
                      347-679-9566
                    </a>
                    <p className="text-foreground/60 text-sm">
                      Mon-Fri 9AM-6PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Visit Us
                    </h3>
                    <p className="text-foreground/70">New York, NY</p>
                    <p className="text-foreground/60 text-sm">
                      Serving nationwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Highlights */}
              <div className="bg-card/50 rounded-xl p-6 metallic-border">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Our Services
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground/80">
                      Construction Project Documentation
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-accent" />
                    <span className="text-foreground/80">
                      Business Documentary Production
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-foreground/80">
                      Team Interview Services
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by <span className="text-primary">Industry Leaders</span>
            </h2>
            <p className="text-foreground/70">
              Construction firms and businesses across the country trust Built
              Ancestry to preserve their legacies.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder for client logos */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-card rounded-lg p-6 metallic-border text-center"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-primary/50" />
                </div>
                <div className="text-sm text-foreground/50">Client Logo</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
