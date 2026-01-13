import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  Shield, 
  Clock, 
  Percent,
  Building2,
  Home,
  Users,
  Sparkles,
  Phone
} from "lucide-react";
import allSeasonsBg from "@assets/ALL_SEASONS_GOLF_CARTS_1768325026733.png";

interface FinancingOption {
  id: string;
  name: string;
  description: string;
  features: string[];
  ctaText: string;
  externalUrl: string;
  icon: typeof DollarSign;
  badge?: string;
}

const financingOptions: FinancingOption[] = [
  {
    id: "sheffield",
    name: "Sheffield Financial",
    description: "Get prequalified with no impact to your credit. Quick and easy application process for all credit types.",
    features: [
      "No credit impact prequalification",
      "Fast approval process",
      "Competitive rates available",
      "Flexible payment terms"
    ],
    ctaText: "Prequalify Now",
    externalUrl: "https://prequalify.sheffieldfinancial.com/Apply/Dealer/56712?source=web",
    icon: Shield,
    badge: "Popular Choice"
  },
  {
    id: "rent-to-own",
    name: "Rent To Own",
    description: "Helping golf cart customers achieve ownership. Flexible rent-to-own programs designed to fit your budget.",
    features: [
      "Path to ownership",
      "Flexible monthly payments",
      "No long-term commitment required",
      "Build equity over time"
    ],
    ctaText: "Apply Now",
    externalUrl: "https://blirentals.com/app/TIGON_GOLFCARTS_LLC",
    icon: Home
  },
  {
    id: "dll",
    name: "DLL Financial Solutions",
    description: "Get the lowest APR without hidden fees. Transparent financing with straightforward terms.",
    features: [
      "Lowest APR available",
      "No hidden fees",
      "Transparent terms",
      "Professional service"
    ],
    ctaText: "Apply Now",
    externalUrl: "https://applynow-cica-prd.dllgroup.com/?entityId=4&dealerCode=015639",
    icon: Percent,
    badge: "Best Rates"
  },
  {
    id: "consumer",
    name: "Consumer Financing",
    description: "Get ready to ride with consumer financing. Simple application with quick decisions.",
    features: [
      "Quick approval decisions",
      "Consumer-friendly terms",
      "Easy online application",
      "Multiple term options"
    ],
    ctaText: "Apply Now",
    externalUrl: "https://octane.co/flex/034170",
    icon: Users
  },
  {
    id: "univest",
    name: "Univest Capital",
    description: "Customized solutions for your specific business needs. Commercial financing for fleet and business use.",
    features: [
      "Business financing solutions",
      "Customized payment plans",
      "Fleet financing available",
      "Tax benefits for business"
    ],
    ctaText: "Apply Now",
    externalUrl: "https://form.jotform.com/UnivestCapital/credit-application-bakos?utm_source=All+Seasons+Golf+Carts&utm_medium=Financing&utm_campaign=Business&utm_term=Best+Golf+Cart+Financing",
    icon: Building2,
    badge: "Business"
  },
  {
    id: "dealer-direct",
    name: "Dealer Direct Financing",
    description: "Buy now, pay later with Dealer Direct Financing. Convenient financing right from the dealership.",
    features: [
      "Buy now, pay later",
      "In-house financing",
      "Quick approvals",
      "Personalized service"
    ],
    ctaText: "Apply Now",
    externalUrl: "https://dealerdirect.apptraker.com/my/guest?dealer=10735",
    icon: CreditCard
  }
];

function FinancingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "All Seasons Golf Carts Financing",
    "description": "0% financing options available on All Seasons Golf Carts. Multiple financing programs including rent-to-own, consumer financing, and business financing for EVolution D-MAX 4X4 golf carts.",
    "url": "https://allseasonsgolfcarts.com/financing",
    "provider": {
      "@type": "Organization",
      "name": "All Seasons Golf Carts",
      "url": "https://allseasonsgolfcarts.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "Golf Cart Financing",
      "Vehicle Financing",
      "Rent to Own",
      "Business Financing"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Financing() {
  useEffect(() => {
    document.title = "All Seasons Golf Cart Financing | 0% Financing Available | All Seasons Golf Carts";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "0% financing on All Seasons Golf Carts. Multiple financing options including no credit impact prequalification, rent-to-own, and business financing. Get your EVolution D-MAX 4X4 golf cart today.");
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FinancingSchema />
      <div className="min-h-screen">
        <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${allSeasonsBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Flexible Financing Options
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              All Seasons Golf Carts
              <br />
              <span className="text-primary">Financing</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get behind the wheel of your EVolution D-MAX 4X4 golf cart today. 
              We offer multiple financing options including 0% financing programs to fit every budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-844-884-6744">
                <Button size="lg" className="w-full sm:w-auto gap-2" data-testid="button-call-financing">
                  <Phone className="w-5 h-5" />
                  (844) 884-6744
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-contact-financing">
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">0% Financing Available</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Financing Options for Every Budget
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our selection of trusted financing partners. 
                Whether you're looking for personal financing or business solutions, we have options for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {financingOptions.map((option) => (
                <Card 
                  key={option.id} 
                  className="p-6 flex flex-col h-full hover-elevate"
                  data-testid={`card-financing-${option.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    {option.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {option.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href={option.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto"
                  >
                    <Button className="w-full gap-2" data-testid={`button-apply-${option.id}`}>
                      {option.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Why Finance With Us</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Get Your Dream Golf Cart Today
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Don't let budget constraints keep you from experiencing the power of an 
                  EVolution D-MAX 4X4 golf cart. Our financing partners offer competitive 
                  rates and flexible terms to make ownership accessible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Quick Approvals</h3>
                      <p className="text-sm text-muted-foreground">
                        Most applications receive a decision within minutes, not days.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Percent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Competitive Rates</h3>
                      <p className="text-sm text-muted-foreground">
                        0% financing and low APR options available for qualified buyers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Secure Process</h3>
                      <p className="text-sm text-muted-foreground">
                        All applications are processed through secure, trusted partners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-md p-8">
                <div className="text-center mb-6">
                  <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">
                    Contact us today to discuss your financing options and find the best solution for your needs.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a href="tel:1-844-884-6744" className="block">
                    <Button size="lg" className="w-full gap-2" data-testid="button-call-cta">
                      <Phone className="w-5 h-5" />
                      Call (844) 884-6744
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="w-full" data-testid="button-contact-cta">
                      Request a Quote
                    </Button>
                  </Link>
                </div>
                
                <p className="text-xs text-center text-muted-foreground mt-6">
                  *Financing subject to credit approval. Terms and conditions apply. 
                  Contact us for complete details on available programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Experience Year-Round Performance
            </h2>
            <p className="text-lg opacity-90 mb-8">
              The EVolution D-MAX 4X4 delivers unmatched all-season capability. 
              Finance your new golf cart today and conquer every season.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/evolution-d-max-xt4">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" data-testid="button-view-xt4">
                  View D-MAX XT4
                </Button>
              </Link>
              <Link href="/evolution-d-max-xt6">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-view-xt6">
                  View D-MAX XT6
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
