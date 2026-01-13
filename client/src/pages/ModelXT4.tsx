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
  Smartphone,
  Snowflake,
  Wifi,
  Car,
  Download,
} from "lucide-react";
import xt4Red from "@assets/EVOLUTION_D-MAX_XT4_RED_1768250430375.png";
import xt4White from "@assets/EVOLUTION_D-MAX_XT4_WHITE_1768251453734.png";
import xt4Black from "@assets/EVOLUTION_D-MAX_XT4_BLACK_1768251453733.png";
import xt4Blue from "@assets/EVOLUTION_D-MAX_XT4_BLUE_1768251453733.png";
import xt4Gray from "@assets/EVOLUTION_D-MAX_XT4_GRAY_1768251453733.png";
import xt4SkyBlue from "@assets/EVOLUTION_D-MAX_XT4_SKY_BLUE_1768251453732.png";

const colorImages: Record<string, string> = {
  white: xt4White,
  black: xt4Black,
  blue: xt4Blue,
  gray: xt4Gray,
  red: xt4Red,
  "sky-blue": xt4SkyBlue,
};

export default function ModelXT4() {
  const [selectedColor, setSelectedColor] = useState("red");

  const powerSpecs = [
    { label: "Battery", value: "48V Lithium with Smart Management", icon: "battery" as const },
    { label: "Motors", value: "Dual 6.3kW AC with EM Brake", icon: "zap" as const },
    { label: "Controller", value: "400A AC with 25A Onboard Charger", icon: "cog" as const },
    { label: "Drive System", value: "On-Demand 4-Wheel Drive (4X4)", icon: "navigation" as const },
    { label: "Top Speed", value: "Up to 25 MPH (LSV Ready)", icon: "gauge" as const },
    { label: "Range", value: "40-50 Miles Per Charge", icon: "battery" as const },
  ];

  const dimensionSpecs = [
    { label: "Overall Length", value: '122.6"', icon: "ruler" as const },
    { label: "Overall Width", value: '56.1"', icon: "ruler" as const },
    { label: "Overall Height", value: '83.8"', icon: "ruler" as const },
    { label: "Wheelbase", value: '81"', icon: "ruler" as const },
    { label: "Curb Weight", value: "1,499 lbs", icon: "weight" as const },
    { label: "Max Payload", value: "2,270 lbs", icon: "weight" as const },
    { label: "Seating Capacity", value: "4 Passengers", icon: "users" as const },
    { label: "Wheels", value: '16" x 8.5" Aluminum', icon: "cog" as const },
  ];

  const standardFeatures = [
    "10.1\" Touchscreen with Apple CarPlay & Android Auto",
    "Premium 24-Speaker Surround Sound System",
    "Dual Wireless Phone Charging Pads",
    "Built-In Dash Refrigerator",
    "74-Qt Portable Cooler",
    "Sliding Rear Utility Tray",
    "Foldable Rear Storage Basket",
    "Golf Bag Rack",
    "Foldable Windshield with Sliding Vents",
    "LED Headlights, Taillights & Running Boards",
    "Automotive-Style Luxury Seats",
    "3-Point Seat Belts for All Seats",
    "USB Ports & Cupholders",
    "Electric Power Steering (EPS)",
  ];

  const streetLegalEquipment = [
    "LED Headlights & Taillights",
    "Turn Signals & Brake Lights",
    "Horn",
    "Side & Rearview Mirrors",
    "DOT-Approved Tires",
    "3-Point Seat Belts",
    "Vehicle Identification Number (VIN)",
  ];

  const optionalUpgrades = [
    "Windshield Wipers & Washer Kit",
    "Rear Bumper Guards",
    "Reflective Trim",
    "License Plate Bracket & Light",
    "Extended Mirrors",
    "LED Light Bars",
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
                  alt={`EVolution D-MAX XT4 4X4 Golf Cart in ${selectedColor}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  data-testid="img-xt4-main"
                />
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground text-center mb-3">Select Color</p>
                <ColorSwatches
                  model="xt4"
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </div>
            </div>

            <div>
              <Badge variant="secondary" className="mb-4">4-Passenger 4X4</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                EVolution D-MAX XT4
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                The Ultimate All-Terrain Golf Cart
              </p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Starting at</span>
                <span className="text-4xl font-bold">$15,595</span>
                <span className="text-sm text-muted-foreground">MSRP</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                The EVolution D-MAX XT4 blends off-road power with street-legal capability, 
                offering a dual-motor 4WD system, premium infotainment, comfort tech, and 
                utility features. With proper street-legal equipment, it serves as both a 
                fun off-road machine and a registered LSV for neighborhood or community use.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-bold">4 Seats</p>
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
                  <Button size="lg" className="w-full sm:w-auto gap-2" data-testid="button-xt4-quote">
                    Get a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="/xt4-spec-sheet.pdf" download>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" data-testid="button-xt4-download">
                    <Download className="w-5 h-5" />
                    Download Spec Sheet
                  </Button>
                </a>
                <Link href="/evolution-d-max-xt6">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-xt4-compare">
                    Compare to XT6
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
                    The heart of the D-MAX XT4 is its revolutionary on-demand 4-wheel drive 
                    system. Powered by dual 6.3kW AC motors, the XT4 delivers exceptional 
                    torque and traction across any terrain. Whether you're climbing steep 
                    hills, navigating rough trails, or cruising neighborhood streets, the 
                    4X4 system automatically engages when you need it most.
                  </p>
                  <SpecTable title="Power & Drive Specifications" specs={powerSpecs} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Ruler className="w-6 h-6 text-primary" />
                    Dimensions & Capacity
                  </h2>
                  <SpecTable title="Size & Weight Specifications" specs={dimensionSpecs} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Volume2 className="w-6 h-6 text-primary" />
                    Standard Features
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Every D-MAX XT4 comes fully loaded with premium features designed for 
                    comfort, convenience, and entertainment.
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
                    The D-MAX XT4 can be configured to meet Low-Speed Vehicle (LSV) requirements, 
                    allowing you to register, title, and drive it on roads with posted limits 
                    up to 35 mph in many areas.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="font-bold mb-4">Standard LSV Equipment</h4>
                      <div className="space-y-2">
                        {streetLegalEquipment.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                    <Card className="p-6">
                      <h4 className="font-bold mb-4">Optional Upgrades</h4>
                      <div className="space-y-2">
                        {optionalUpgrades.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Cog className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4 p-4 bg-muted rounded-md">
                    Note: LSV compliance may require dealer installation of street-legal kits 
                    and must meet your local DMV/Department of Transportation rules before road use.
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
            <p className="text-muted-foreground">See how the XT4 stacks up against the XT6</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Specification</th>
                  <th className="text-center py-4 px-4 font-semibold bg-primary/5">D-MAX XT4</th>
                  <th className="text-center py-4 px-4 font-semibold">D-MAX XT6</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Starting Price</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">$15,595</td>
                  <td className="py-4 px-4 text-center">$17,595</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Seating</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">4 Passengers</td>
                  <td className="py-4 px-4 text-center">6 Passengers</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Drive System</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">4X4</td>
                  <td className="py-4 px-4 text-center">4X4</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Motors</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">Dual 6.3kW</td>
                  <td className="py-4 px-4 text-center">Dual 6.3kW</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Range</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">40-50 Miles</td>
                  <td className="py-4 px-4 text-center">30-50 Miles</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Top Speed</td>
                  <td className="py-4 px-4 text-center font-semibold bg-primary/5">25 MPH</td>
                  <td className="py-4 px-4 text-center">25 MPH</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/evolution-d-max-xt6">
              <Button variant="outline" className="gap-2" data-testid="button-xt4-goto-xt6">
                View XT6 Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
          <p className="text-muted-foreground mb-8">
            Contact us today to schedule a test drive or get a personalized quote 
            for your EVolution D-MAX XT4.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-xt4-final-cta">
              Contact Us Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
