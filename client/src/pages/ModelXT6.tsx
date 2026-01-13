import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorSwatches } from "@/components/ColorSwatches";
import { SpecTable } from "@/components/SpecTable";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Battery,
  Gauge,
  Ruler,
  Weight,
  Cog,
  Zap,
  Navigation,
  Shield,
  Volume2,
  Download,
} from "lucide-react";
import xt6Red from "@assets/EVOLUTION_D-MAX_XT6_RED_1768250430374.png";
import xt6White from "@assets/EVOLUTION_D-MAX_XT6_WHITE_1768251535645.png";
import xt6Black from "@assets/EVOLUTION_D-MAX_XT6_BLACK_1768251535645.png";
import xt6Blue from "@assets/EVOLUTION_D-MAX_XT6_BLUE_1768251535644.png";
import xt6Gray from "@assets/EVOLUTION_D-MAX_XT6_GRAY_1768251535644.png";
import xt6SkyBlue from "@assets/EVOLUTION_D-MAX_XT6_SKY_BLUE_1768251535644.png";

const colorImages: Record<string, string> = {
  white: xt6White,
  black: xt6Black,
  blue: xt6Blue,
  gray: xt6Gray,
  red: xt6Red,
  "sky-blue": xt6SkyBlue,
};

export default function ModelXT6() {
  const [selectedColor, setSelectedColor] = useState("red");

  const powerSpecs = [
    { label: "Battery", value: "48V Lithium with Smart Management", icon: "battery" as const },
    { label: "Motors", value: "Dual 6.3kW AC for Strong Acceleration", icon: "zap" as const },
    { label: "Controller", value: "Dual 400A AC with 25A Charger", icon: "cog" as const },
    { label: "Drive System", value: "Selectable 4×2 / 4×4 Drive", icon: "navigation" as const },
    { label: "Top Speed", value: "Up to 25 MPH (Street Ready)", icon: "gauge" as const },
    { label: "Range", value: "30-50 Miles (160Ah Upgrade Available)", icon: "battery" as const },
  ];

  const dimensionSpecs = [
    { label: "Seating Capacity", value: "6 Passengers", icon: "users" as const },
    { label: "Body Style", value: "Extended Length for 6 Seats", icon: "ruler" as const },
    { label: "Wheels", value: '16" All-Terrain or Street Ready', icon: "cog" as const },
    { label: "Brakes", value: "Hydraulic Disc Brake System", icon: "cog" as const },
    { label: "Steering", value: "Electric Power Steering (EPS)", icon: "navigation" as const },
    { label: "Battery Options", value: "110Ah Standard / 160Ah Upgrade", icon: "battery" as const },
  ];

  const standardFeatures = [
    "10.1\" Touchscreen with Apple CarPlay & Android Auto",
    "Premium Integrated Sound System with LED Lighting",
    "Electric Power Steering",
    "Built-In Refrigerator/Storage Compartment",
    "Foldable Rear Storage Basket/Utility Tray",
    "LED Headlights, Taillights & Accent Lighting",
    "USB Charging Ports",
    "Cupholders for All Passengers",
    "6 Forward-Facing Seats",
  ];

  const streetLegalEquipment = [
    "Headlights, Taillights & Brake Lights",
    "Turn Signals",
    "DOT-Approved Street Tires",
    "Rearview & Side Mirrors",
    "Horn",
    "3-Point Seat Belts for All 6 Passengers",
    "Windshield (Wipers Optional)",
    "License Plate Bracket & Light",
    "Required Safety Reflectors",
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="sticky top-24">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-4 lg:p-8 relative overflow-hidden">
                <img
                  src={colorImages[selectedColor]}
                  alt={`EVolution D-MAX XT6 4X4 Golf Cart in ${selectedColor}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  data-testid="img-xt6-main"
                />
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground text-center mb-3">Select Color</p>
                <ColorSwatches
                  model="xt6"
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </div>
            </div>

            <div>
              <Badge variant="secondary" className="mb-4">6-Passenger 4X4</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                EVolution D-MAX XT6
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Maximum Capacity, Maximum Capability
              </p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Starting at</span>
                <span className="text-4xl font-bold">$17,595</span>
                <span className="text-sm text-muted-foreground">MSRP</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                The EVolution D-MAX XT6 is a rugged and spacious 6-passenger electric golf 
                cart with dual-motor 4WD capability, advanced tech features, and luxury comfort. 
                Perfect for both community cruising and off-road use. With the right street-legal 
                options installed, it can serve as a registered LSV for neighborhood roads or 
                gated communities.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-bold">6 Seats</p>
                </Card>
                <Card className="p-4 text-center">
                  <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-bold">12.6kW</p>
                </Card>
                <Card className="p-4 text-center">
                  <Battery className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-bold">50 Miles</p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto gap-2" data-testid="button-xt6-quote">
                    Get a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="/xt6-spec-sheet.pdf" download>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" data-testid="button-xt6-download">
                    <Download className="w-5 h-5" />
                    Download Spec Sheet
                  </Button>
                </a>
                <Link href="/evolution-d-max-xt4">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-xt6-compare">
                    Compare to XT4
                  </Button>
                </Link>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    4X4 Power & Performance
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The D-MAX XT6 features the same powerful selectable 4×2/4×4 drive system 
                    as its smaller sibling, but with an extended body to accommodate six passengers 
                    comfortably. The dual 6.3kW AC motors deliver strong acceleration and on-demand 
                    4-wheel-drive performance for tackling any terrain with confidence.
                  </p>
                  <SpecTable title="Power & Drive Specifications" specs={powerSpecs} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Ruler className="w-6 h-6 text-primary" />
                    Dimensions & Capacity
                  </h2>
                  <SpecTable title="Size & Configuration" specs={dimensionSpecs} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Volume2 className="w-6 h-6 text-primary" />
                    Features & Comfort
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The XT6 comes loaded with tech and comfort features for all six passengers.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {standardFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    Street-Legal / LSV Compliance
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    To register and use the D-MAX XT6 as a street-legal LSV (Low-Speed Vehicle) 
                    where allowed, you can add required equipment to meet regulations in most 
                    jurisdictions for roads with posted limits up to 35 mph.
                  </p>
                  
                  <Card className="p-6">
                    <h4 className="font-bold mb-4">Required / Recommended Street-Legal Equipment</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {streetLegalEquipment.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  <p className="text-sm text-muted-foreground mt-4 p-4 bg-muted rounded-md">
                    These features help meet LSV regulations enabling use on roads with posted 
                    limits up to ~35 mph in many jurisdictions. Specific requirements depend on 
                    your state's LSV rules, so confirm with your local DMV.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Models</h2>
            <p className="text-muted-foreground">See how the XT6 stacks up against the XT4</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Specification</th>
                  <th className="text-center py-4 px-4 font-semibold">D-MAX XT4</th>
                  <th className="text-center py-4 px-4 font-semibold bg-primary/5">D-MAX XT6</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Starting Price</td>
                  <td className="py-4 px-4 text-center">$15,595</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">$17,595</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Seating</td>
                  <td className="py-4 px-4 text-center">4 Passengers</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">6 Passengers</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Drive System</td>
                  <td className="py-4 px-4 text-center">4X4</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">Selectable 4×2/4×4</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Motors</td>
                  <td className="py-4 px-4 text-center">Dual 6.3kW</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">Dual 6.3kW</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Range</td>
                  <td className="py-4 px-4 text-center">40-50 Miles</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">30-50 Miles</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Battery Upgrade</td>
                  <td className="py-4 px-4 text-center">Standard</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">160Ah Available</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Top Speed</td>
                  <td className="py-4 px-4 text-center">25 MPH</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">25 MPH</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/evolution-d-max-xt4">
              <Button variant="outline" className="gap-2" data-testid="button-xt6-goto-xt4">
                View XT4 Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Bring the Whole Crew?</h2>
          <p className="text-muted-foreground mb-8">
            Contact us today to schedule a test drive or get a personalized quote 
            for your EVolution D-MAX XT6.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-xt6-final-cta">
              Contact Us Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
