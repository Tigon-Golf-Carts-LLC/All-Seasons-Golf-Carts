import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign, MessageSquare, Phone } from "lucide-react";
import { LeadForm, type LeadVehicle } from "@/components/LeadForm";
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/leads";

interface LeadFormModalProps {
  vehicle: LeadVehicle;
  location: string;
  /** The element that opens the modal. */
  children: React.ReactNode;
}

/** A button (passed as children) that opens the lead form in a modal. */
export function LeadFormModal({ vehicle, location, children }: LeadFormModalProps) {
  const [delivered, setDelivered] = useState(false);

  return (
    <Dialog onOpenChange={(open) => open && setDelivered(false)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!delivered && (
          <DialogHeader>
            <DialogTitle>Get Pricing & Availability</DialogTitle>
            <DialogDescription>
              Ask about the {vehicle.model}. We'll get back to you within 24 hours, or
              call us now at {CONTACT_PHONE}.
            </DialogDescription>
          </DialogHeader>
        )}
        <LeadForm
          vehicle={vehicle}
          location={location}
          submitLabel="Request My Quote"
          onDelivered={() => setDelivered(true)}
        />
      </DialogContent>
    </Dialog>
  );
}

interface ProductLeadCtaProps {
  vehicle: LeadVehicle;
  /** Prefix for data-testid attributes, e.g. "xt4". */
  testId: string;
}

/**
 * Product-page call to action: Call Now and Apply for Financing, with the
 * lead form modal right underneath.
 */
export function ProductLeadCta({ vehicle, testId }: ProductLeadCtaProps) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <a href={CONTACT_PHONE_HREF}>
          <Button size="lg" className="w-full gap-2" data-testid={`button-${testId}-call-now`}>
            <Phone className="w-5 h-5" />
            Call Now
          </Button>
        </a>
        <Link href="/financing">
          <Button size="lg" variant="outline" className="w-full gap-2" data-testid={`button-${testId}-financing`}>
            <DollarSign className="w-5 h-5" />
            Apply for Financing
          </Button>
        </Link>
      </div>
      <LeadFormModal vehicle={vehicle} location={`${vehicle.model} product page`}>
        <Button
          size="lg"
          variant="secondary"
          className="w-full gap-2"
          data-testid={`button-${testId}-lead-modal`}
        >
          <MessageSquare className="w-5 h-5" />
          Get Pricing & Availability
        </Button>
      </LeadFormModal>
    </div>
  );
}
