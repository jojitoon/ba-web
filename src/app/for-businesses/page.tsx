"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PricingCard from "@/components/pricing-card";
import { Video, QrCode, Users, Award, CheckCircle, Star } from "lucide-react";

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-50 pb-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              For <span className="text-accent">Businesses</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Tell your story, preserve your legacy, and connect with your
              community through professional documentary services and
              interactive QR/NFC plaque branding.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Documentary & <span className="text-accent">Plaque Service</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              We create compelling documentaries about your business and provide
              interactive QR/NFC plaques that let customers discover your story
              with a simple scan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Professional Documentary Production
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Cinematic Storytelling
                    </h4>
                    <p className="text-foreground/70">
                      Professional videography and editing that captures your
                      business's unique story, values, and community impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Owner & Team Interviews
                    </h4>
                    <p className="text-foreground/70">
                      In-depth interviews with business owners, employees, and
                      customers to showcase the human side of your business.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Legacy Timeline
                    </h4>
                    <p className="text-foreground/70">
                      Document your business journey from founding to present,
                      including key milestones, challenges overcome, and
                      community contributions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 metallic-border">
              <div className="w-full h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <Video className="w-20 h-20 text-accent/50" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-card rounded-xl p-8 metallic-border">
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <QrCode className="w-20 h-20 text-primary/50" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Interactive QR/NFC Plaque Branding
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Custom Plaques
                    </h4>
                    <p className="text-foreground/70">
                      Beautiful, durable plaques with embedded QR codes or NFC
                      technology that customers can scan to watch your
                      documentary.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      "Visit [Business Name] and Scan to Watch"
                    </h4>
                    <p className="text-foreground/70">
                      Professional branding that encourages customer engagement
                      and creates a memorable experience at your location.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Support This Business CTA
                    </h4>
                    <p className="text-foreground/70">
                      Direct links to your ordering, booking, or reservation
                      systems to convert viewers into customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Choose Your <span className="text-accent">Plan</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Professional documentary and plaque services designed to showcase
              your business and connect with your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="$2,499"
              period="one-time"
              description="Perfect for small businesses looking to tell their story"
              features={[
                "30-minute documentary",
                "Professional videography",
                "Owner interview",
                "Basic editing",
                "1 QR/NFC plaque",
                "Online hosting",
                "Email support",
              ]}
              cta="Get Started"
              ctaLink="/contact?plan=basic"
              accent="primary"
            />

            <PricingCard
              title="Premium"
              price="$4,999"
              period="one-time"
              description="Comprehensive storytelling for established businesses"
              features={[
                "45-minute documentary",
                "Professional videography & photography",
                "Owner & team interviews",
                "Advanced editing & graphics",
                "3 QR/NFC plaques",
                "Online hosting & analytics",
                "Priority support",
                "Social media clips",
              ]}
              cta="Get Started"
              ctaLink="/contact?plan=premium"
              accent="accent"
              popular={true}
            />

            <PricingCard
              title="Legacy"
              price="$9,999"
              period="one-time"
              description="Complete legacy preservation for multi-generational businesses"
              features={[
                "60-minute documentary",
                "Cinematic production quality",
                "Multiple interviews & testimonials",
                "Professional editing & motion graphics",
                "5 QR/NFC plaques",
                "Premium hosting & analytics",
                "Dedicated project manager",
                "Social media package",
                "Print materials",
              ]}
              cta="Get Started"
              ctaLink="/contact?plan=legacy"
              accent="primary"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Why Choose <span className="text-accent">Built Ancestry</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Professional Quality
              </h3>
              <p className="text-foreground/70">
                Cinematic production values with professional equipment and
                experienced filmmakers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Interactive Experience
              </h3>
              <p className="text-foreground/70">
                QR/NFC plaques create engaging customer experiences and drive
                foot traffic.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Community Connection
              </h3>
              <p className="text-foreground/70">
                Strengthen your relationship with customers and showcase your
                community impact.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Legacy Preservation
              </h3>
              <p className="text-foreground/70">
                Create a lasting digital record of your business story for
                future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Tell Your <span className="text-accent">Story</span>?
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Let's create a documentary that captures the heart and soul of your
            business and connects you with your community.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-3 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-300 metallic-glow"
          >
            <Video className="w-6 h-6" />
            <span>Start Your Documentary</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
