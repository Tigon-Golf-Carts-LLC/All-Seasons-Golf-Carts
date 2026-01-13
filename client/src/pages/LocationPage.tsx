import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/FeatureCard";
import { 
  ArrowRight, 
  Mountain, 
  Shield, 
  Zap, 
  Volume2, 
  Smartphone, 
  Snowflake,
  Users,
  Battery,
  Gauge,
  CheckCircle2,
  ChevronRight,
  Phone,
  MapPin
} from "lucide-react";
import xt4Image from "@assets/EVOLUTION_D-MAX_XT4_RED_1768250430375.png";
import xt6Image from "@assets/EVOLUTION_D-MAX_XT6_RED_1768250430374.png";
import mountainBg from "@assets/stock_images/mountain_landscape_s_e3842dcf.jpg";
import { getLocationBySlug, LocationData } from "@/data/locations";

function LocationSchema({ location }: { location: LocationData }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://allterraingolfcarts.com/${location.slug}#business`,
    "name": `All Terrain Golf Carts - ${location.name}`,
    "description": `Premium EVolution D-MAX 4X4 electric golf carts available in ${location.name}. Dual-motor all-terrain capability, street-legal LSV options, and luxury features.`,
    "url": `https://allterraingolfcarts.com/${location.slug}`,
    "telephone": "+1-844-884-6744",
    "priceRange": "$15,000 - $20,000",
    "image": "https://allterraingolfcarts.com/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": location.abbreviation,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "areaServed": {
      "@type": location.type === "state" ? "State" : "AdministrativeArea",
      "name": location.name
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://allterraingolfcarts.com"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": location.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://allterraingolfcarts.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${location.name}`,
        "item": `https://allterraingolfcarts.com/${location.slug}`
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `4X4 Golf Carts in ${location.name}`,
    "description": `Premium EVolution D-MAX 4X4 electric golf carts available for ${location.name} residents. Features dual-motor all-wheel drive, luxury amenities, and street-legal LSV options.`,
    "brand": {
      "@type": "Brand",
      "name": "EVolution Electric Vehicles"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "15595",
      "highPrice": "17595",
      "offerCount": "2",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}

export default function LocationPage() {
  const [pathname] = useLocation();
  const slug = pathname.slice(1);
  const location = getLocationBySlug(slug);

  useEffect(() => {
    if (location) {
      document.title = `All Terrain Golf Cart in ${location.name} | EVolution D-MAX 4X4`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', 
        `Premium 4X4 electric golf carts available in ${location.name}. EVolution D-MAX XT4 and XT6 with dual-motor all-terrain capability, street-legal LSV options. Call (844) 884-6744.`
      );

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', `All Terrain Golf Cart in ${location.name}`);

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', 
        `Shop EVolution D-MAX 4X4 golf carts in ${location.name}. Dual-motor power, luxury features, street-legal options available.`
      );
    }

    return () => {
      document.title = 'All Terrain Golf Carts | Premium 4X4 Electric Golf Carts';
    };
  }, [location]);

  if (!location) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
          <p className="text-muted-foreground mb-8">The location you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${location.coordinates.lng - 5}%2C${location.coordinates.lat - 3}%2C${location.coordinates.lng + 5}%2C${location.coordinates.lat + 3}&layer=mapnik&marker=${location.coordinates.lat}%2C${location.coordinates.lng}`;

  return (
    <>
      <LocationSchema location={location} />
      <div className="min-h-screen">
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${mountainBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <Badge variant="secondary" className="mb-4">
                  Serving {location.name}
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                  All Terrain Golf Carts
                  <br />
                  <span className="text-gradient">in {location.name}</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
                  Experience the power of dual-motor 4X4 capability in {location.name}. 
                  The EVolution D-MAX XT series delivers unmatched performance for {location.type === "state" ? "your state's" : "your"} unique terrain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="tel:1-844-884-6744">
                    <Button size="lg" className="w-full sm:w-auto gap-2" data-testid="button-call-hero">
                      <Phone className="w-5 h-5" />
                      (844) 884-6744
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-hero-contact">
                      Request Quote
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                  <div className="text-center lg:text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">4X4</p>
                    <p className="text-sm text-muted-foreground">Drive System</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">50</p>
                    <p className="text-sm text-muted-foreground">Mile Range</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">25</p>
                    <p className="text-sm text-muted-foreground">MPH Top Speed</p>
                  </div>
                </div>
              </div>
              
              <div className="relative order-1 lg:order-2">
                <div className="relative aspect-[4/3] max-w-lg mx-auto lg:max-w-none">
                  <img
                    src={xt6Image}
                    alt={`EVolution D-MAX XT6 4X4 Golf Cart available in ${location.name}`}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    data-testid="img-hero-location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-card" id="models">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <Badge variant="outline" className="mb-4">Available in {location.name}</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Choose Your 4X4 Golf Cart
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Two powerful models designed for {location.name}'s unique terrain. Both equipped with 
                our legendary 4X4 all-terrain capability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <Card className="overflow-hidden group hover-elevate">
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 p-6 relative overflow-hidden">
                  <img
                    src={xt4Image}
                    alt={`EVolution D-MAX XT4 4-Seat Golf Cart for ${location.name}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    data-testid="img-xt4-card"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">EVolution D-MAX XT4</h3>
                      <p className="text-muted-foreground">4-Passenger 4X4</p>
                    </div>
                    <Badge variant="secondary">
                      <Users className="w-4 h-4 mr-1" />
                      4 Seats
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Compact powerhouse with dual 6.3kW motors, on-demand 4WD, and premium features 
                    including 24-speaker sound system and built-in refrigerator.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-bold">$15,595</p>
                    </div>
                    <Link href="/evolution-d-max-xt4">
                      <Button className="gap-2" data-testid="button-view-xt4">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden group hover-elevate">
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 p-6 relative overflow-hidden">
                  <img
                    src={xt6Image}
                    alt={`EVolution D-MAX XT6 6-Seat Golf Cart for ${location.name}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    data-testid="img-xt6-card"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">EVolution D-MAX XT6</h3>
                      <p className="text-muted-foreground">6-Passenger 4X4</p>
                    </div>
                    <Badge variant="secondary">
                      <Users className="w-4 h-4 mr-1" />
                      6 Seats
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Extended capacity with the same powerful dual-motor 4WD system. Perfect for 
                    families or groups who need room without compromising capability.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-bold">$17,595</p>
                    </div>
                    <Link href="/evolution-d-max-xt6">
                      <Button className="gap-2" data-testid="button-view-xt6">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Why 4X4?</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built for {location.name}'s Terrain
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The EVolution D-MAX 4X4 system provides unmatched capability for any environment in {location.name}.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={Mountain}
                title="All-Terrain Capability"
                description={`Navigate ${location.name}'s diverse landscapes with confidence. Dual motors provide power to all four wheels when you need it.`}
              />
              <FeatureCard
                icon={Zap}
                title="Dual 6.3kW Motors"
                description="12.6kW of combined power delivers exceptional torque and climbing ability for any terrain challenge."
              />
              <FeatureCard
                icon={Battery}
                title="50+ Mile Range"
                description="Explore more of your property or community with an impressive range on a single charge."
              />
              <FeatureCard
                icon={Shield}
                title="Street Legal Ready"
                description={`LSV-compliant features available for legal road use in ${location.name} communities with proper registration.`}
              />
              <FeatureCard
                icon={Volume2}
                title="Premium Sound System"
                description="24-speaker surround sound system lets you enjoy your favorite music wherever your adventure takes you."
              />
              <FeatureCard
                icon={Snowflake}
                title="Built-in Refrigerator"
                description="Keep refreshments cold with the integrated refrigerator - perfect for long days on the course or trail."
              />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <Badge variant="outline" className="mb-4">Frequently Asked Questions</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  4X4 Golf Carts in {location.name}
                </h2>
                
                <div className="space-y-6">
                  {location.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-border pb-6 last:border-0">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-muted-foreground mb-4">
                    Have more questions about 4X4 golf carts in {location.name}?
                  </p>
                  <a href="tel:1-844-884-6744">
                    <Button className="gap-2" data-testid="button-call-faq">
                      <Phone className="w-4 h-4" />
                      Call (844) 884-6744
                    </Button>
                  </a>
                </div>
              </div>

              <div>
                <Card className="overflow-hidden">
                  <div className="aspect-video w-full">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${location.name}`}
                      data-testid="map-location"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Serving {location.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      We deliver EVolution D-MAX 4X4 golf carts throughout {location.name}
                      {location.majorCities.length > 0 && (
                        <>, including {location.majorCities.slice(0, 3).join(", ")}{location.majorCities.length > 3 ? ", and more" : ""}.</>
                      )}
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Free delivery quotes available</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Financing options for {location.name} residents</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Full warranty coverage</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why {location.name} Chooses All Terrain Golf Carts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of satisfied customers across {location.name} who trust the EVolution D-MAX 4X4.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Authorized Dealer</h3>
                <p className="text-sm text-muted-foreground">
                  Official EVolution dealer with factory support
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Full Warranty</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive coverage for your investment
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Expert Service</h3>
                <p className="text-sm text-muted-foreground">
                  Factory-trained technicians and support
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Financing Available</h3>
                <p className="text-sm text-muted-foreground">
                  Flexible payment options for {location.name} buyers
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience 4X4 in {location.name}?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about EVolution D-MAX 4X4 golf carts, 
              get a personalized quote, or schedule a test drive in {location.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-844-884-6744">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2" data-testid="button-cta-call">
                  <Phone className="w-5 h-5" />
                  Call (844) 884-6744
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-cta-contact">
                  Request a Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
