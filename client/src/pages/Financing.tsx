import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Shield, 
  Clock, 
  Percent,
  Building2,
  Sparkles,
  Phone,
  ExternalLink,
  Zap,
  CreditCard,
  RefreshCw
} from "lucide-react";
import allSeasonsBg from "@assets/ALL_SEASONS_GOLF_CARTS_1768325026733.png";

interface FinancingOption {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  externalUrl: string;
  badgeText: string;
  badgeIcon: typeof DollarSign;
}

const financingOptions: FinancingOption[] = [
  {
    id: "sheffield",
    name: "Sheffield Financial",
    subtitle: "Prequalify Now",
    description: "Get prequalified with no impact to your credit. Quick and easy approval process for all terrain golf cart financing.",
    externalUrl: "https://prequalify.sheffieldfinancial.com/Apply/Dealer/56712?source=web",
    badgeText: "No Credit Impact",
    badgeIcon: Shield
  },
  {
    id: "bli-rentals",
    name: "BLI Rentals",
    subtitle: "Rent To Own",
    description: "Helping golf cart customers achieve ownership. Flexible rent-to-own options for your all terrain golf cart purchase.",
    externalUrl: "https://blirentals.com/app/TIGON_GOLFCARTS_LLC",
    badgeText: "Rent To Own",
    badgeIcon: RefreshCw
  },
  {
    id: "dll",
    name: "DLL Financial Solutions",
    subtitle: "Low APR Financing",
    description: "Get the lowest APR without hidden fees. Transparent financing solutions for your 4X4 golf cart.",
    externalUrl: "https://applynow-cica-prd.dllgroup.com/?entityId=4&dealerCode=015639",
    badgeText: "Lowest APR",
    badgeIcon: Percent
  },
  {
    id: "roadrunner",
    name: "Roadrunner Financial",
    subtitle: "Consumer Financing",
    description: "Get ready to ride with consumer financing. Fast approvals and competitive rates for all terrain golf carts.",
    externalUrl: "https://octane.co/flex/034170",
    badgeText: "Fast Approval",
    badgeIcon: Zap
  },
  {
    id: "univest",
    name: "Univest Capital",
    subtitle: "Business Financing",
    description: "Customized solutions for your specific business needs. Commercial financing options for fleet purchases.",
    externalUrl: "https://form.jotform.com/UnivestCapital/credit-application-bakos?utm_source=All+Seasons+Golf+Carts&utm_medium=Financing&utm_campaign=Business&utm_term=Best+Golf+Cart+Financing",
    badgeText: "Business Solutions",
    badgeIcon: Building2
  },
  {
    id: "dealer-direct",
    name: "Dealer Direct Financing",
    subtitle: "Buy Now, Pay Later",
    description: "Buy now, pay later with dealer direct financing. Flexible payment plans for your all terrain golf cart.",
    externalUrl: "https://dealerdirect.apptraker.com/my/guest?dealer=10735",
    badgeText: "Buy Now Pay Later",
    badgeIcon: CreditCard
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
                  className="p-6 flex flex-col h-full bg-card/80 dark:bg-zinc-900 border-border/50 hover-elevate"
                  data-testid={`card-financing-${option.id}`}
                >
                  <div className="mb-4">
                    <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/20">
                      <option.badgeIcon className="w-3 h-3 mr-1.5" />
                      {option.badgeText}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{option.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">
                    {option.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {option.description}
                  </p>
                  
                  <a 
                    href={option.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto"
                  >
                    <Button className="w-full gap-2" data-testid={`button-apply-${option.id}`}>
                      Quick Apply
                      <ExternalLink className="w-4 h-4" />
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
