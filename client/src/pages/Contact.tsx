import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2,
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-4">Get In Touch</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Let's Talk About Your Next Ride
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about all season golf carts? Ready for a test drive? 
              Fill out the form below or contact us directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Card className="p-6 lg:p-8">
                <LeadForm location="Contact page" />
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">WE SHIP NATIONWIDE</p>
                      <p className="text-sm text-muted-foreground">
                        NATIONWIDE<br />
                        DELIVERY
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href="tel:1-844-884-6744" 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="link-contact-phone"
                      >
                        (844) 884-6744
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:info@allseasonsgolfcarts.com" 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="link-contact-email"
                      >
                        info@allseasonsgolfcarts.com
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Business Hours</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium text-foreground">Mon - Fri:</span> 9:00 AM - 5:00 PM</p>
                    <p><span className="font-medium text-foreground">Saturday:</span> 9:00 AM - 5:00 PM</p>
                    <p><span className="font-medium text-foreground">Sunday:</span> Closed</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground">
                <h3 className="font-bold text-lg mb-2">Schedule a Test Drive</h3>
                <p className="text-sm text-primary-foreground/90 mb-4">
                  Experience the power of 4X4 golf cart firsthand. Schedule your test drive today!
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="tel:1-844-884-6744" data-testid="button-call-now">Call Now</a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose ALL Seasons Golf Carts?</h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Authorized Dealer</h3>
                <p className="text-sm text-muted-foreground">
                  Official all seasons golf cart dealer with factory-trained technicians
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Full Service Support</h3>
                <p className="text-sm text-muted-foreground">
                  Complete service, maintenance, and parts department
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Financing Available</h3>
                <p className="text-sm text-muted-foreground">
                  Flexible financing options to fit your budget
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
