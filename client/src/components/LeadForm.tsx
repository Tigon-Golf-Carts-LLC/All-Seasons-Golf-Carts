import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  EMAIL_PATTERN,
  FORM_NAME,
  HONEYPOT_FIELD,
  IMAGE_ACCEPT,
  IMAGE_FIELDS,
  LeadError,
  MAX_IMAGE_MB,
  TRACKING_FIELDS,
  digitsOnly,
  hasLeadEndpoint,
  imageError,
  submitLead,
} from "@/lib/leads";

export const BRAND_OPTIONS = ["EVolution", "Other / Not sure"];

export const MODEL_OPTIONS = [
  "EVolution D-MAX XT4 (4-Seat)",
  "EVolution D-MAX XT6 (6-Seat)",
  "Both Models",
  "General Inquiry",
];

/** A specific cart the form is about; its details are locked in the form. */
export interface LeadVehicle {
  brand: string;
  model: string;
  vin?: string;
  sku?: string;
  /** Sent as an extra "color" field. */
  color?: string;
}

interface LeadFormProps {
  /** Pre-fills and locks brand / model / VIN / SKU (product pages). */
  vehicle?: LeadVehicle;
  /** Sent as the extra "form_location" field so leads show where they came from. */
  location: string;
  submitLabel?: string;
  /** Called after a lead is delivered (e.g. to let a modal adjust its title). */
  onDelivered?: () => void;
  className?: string;
}

type Errors = Partial<Record<string, string>>;

const REQUIRED: Record<string, string> = {
  first_name: "Please enter your first name.",
  last_name: "Please enter your last name.",
  email: "Please enter your email address.",
  phone1: "Please enter your phone number.",
};

function validate(form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const value = (name: string) => String(data.get(name) || "").trim();
  const errors: Errors = {};

  for (const [name, message] of Object.entries(REQUIRED)) {
    if (!value(name)) errors[name] = message;
  }
  if (value("email") && !EMAIL_PATTERN.test(value("email"))) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }
  if (value("phone1") && digitsOnly(value("phone1")).length < 10) {
    errors.phone1 = "Please enter a phone number with at least 10 digits.";
  }
  if (value("phone2") && digitsOnly(value("phone2")).length < 10) {
    errors.phone2 = "Please enter at least 10 digits, or leave this blank.";
  }
  for (const field of IMAGE_FIELDS) {
    const file = data.get(field);
    if (file instanceof File && file.size > 0) {
      const error = imageError(file);
      if (error) errors[field] = error;
    }
  }
  return errors;
}

const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export function LeadForm({
  vehicle,
  location,
  submitLabel = "Send Message",
  onDelivered,
  className,
}: LeadFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "sending" }
    | { kind: "error"; message: string }
    | { kind: "done"; delivered: boolean }
  >({ kind: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus({
        kind: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const result = await submitLead(new FormData(form));
      form.reset();
      setStatus({ kind: "done", delivered: result.delivered });
      onDelivered?.();
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof LeadError
            ? error.message
            : `Sorry, something went wrong. Please try again or email us at ${CONTACT_EMAIL}.`,
      });
    }
  };

  const clearError = (name: string) => {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  if (status.kind === "done") {
    return (
      <div className={cn("text-center py-12", className)} role="status">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          {status.delivered
            ? "We received your message and will contact you shortly."
            : `Your email app should have opened with your message ready to send to ${CONTACT_EMAIL}. Once you send it, we'll get back to you within 24 hours.`}
        </p>
        <Button
          onClick={() => setStatus({ kind: "idle" })}
          variant="outline"
          data-testid="button-send-another"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  const field = (
    name: string,
    label: string,
    props: React.ComponentProps<"input"> = {},
    wrapperClass = "",
  ) => (
    <div className={cn("space-y-2", wrapperClass)}>
      <Label htmlFor={id(name)}>
        {label}
        {REQUIRED[name] && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={id(name)}
        name={name}
        required={Boolean(REQUIRED[name])}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? id(`${name}-error`) : undefined}
        onInput={() => clearError(name)}
        data-testid={`input-${name}`}
        {...props}
        className={cn(props.className, errors[name] && "border-destructive")}
      />
      {errors[name] && (
        <p id={id(`${name}-error`)} className="text-sm text-destructive">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const sending = status.kind === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      encType="multipart/form-data"
      noValidate
      data-testid="form-lead"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {field("first_name", "First Name", { autoComplete: "given-name", placeholder: "John" })}
        {field("last_name", "Last Name", { autoComplete: "family-name", placeholder: "Doe" })}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "john@example.com" })}
        {field("phone1", "Phone", { type: "tel", autoComplete: "tel", placeholder: "(555) 123-4567" })}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {field("phone2", "Alternate Phone", { type: "tel", autoComplete: "tel", placeholder: "Optional" })}
        {field("zip_code", "ZIP Code", { inputMode: "numeric", autoComplete: "postal-code", placeholder: "19104" })}
      </div>

      {field("address", "Address", { autoComplete: "street-address", placeholder: "Street, city, state" })}

      {vehicle ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {field("brand", "Brand", { readOnly: true, defaultValue: vehicle.brand, className: "bg-muted" })}
          {field("model", "Model", { readOnly: true, defaultValue: vehicle.model, className: "bg-muted" })}
          {vehicle.color !== undefined && (
            <input type="hidden" name="color" value={vehicle.color} />
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={id("brand")}>Brand</Label>
            <select
              id={id("brand")}
              name="brand"
              defaultValue={BRAND_OPTIONS[0]}
              className={selectClass}
              data-testid="select-brand"
            >
              {BRAND_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("model")}>Interested In</Label>
            <select
              id={id("model")}
              name="model"
              defaultValue=""
              className={selectClass}
              data-testid="select-model"
            >
              <option value="">Select a model</option>
              {MODEL_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {vehicle?.vin
          ? field("vin_number", "VIN", { readOnly: true, defaultValue: vehicle.vin, className: "bg-muted" })
          : field("vin_number", "VIN (optional)", { autoComplete: "off" })}
        {vehicle?.sku
          ? field("sku_number", "Stock # / SKU", { readOnly: true, defaultValue: vehicle.sku, className: "bg-muted" })
          : field("sku_number", "Stock # / SKU (optional)", { autoComplete: "off" })}
      </div>

      <div className="space-y-2">
        <Label htmlFor={id("comments")}>Message</Label>
        <Textarea
          id={id("comments")}
          name="comments"
          placeholder="Tell us about your needs, questions, or schedule a test drive..."
          className="min-h-[120px] resize-none"
          data-testid="textarea-comments"
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium leading-none mb-2">
          Photos (optional)
        </legend>
        <p className="text-sm text-muted-foreground">
          Up to 3 photos, {MAX_IMAGE_MB} MB each: JPG, PNG, GIF, WEBP or HEIC.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {IMAGE_FIELDS.map((name, index) =>
            field(name, `Photo ${index + 1}`, {
              type: "file",
              accept: IMAGE_ACCEPT,
              className: "h-auto cursor-pointer py-1.5",
              onChange: () => clearError(name),
            }),
          )}
        </div>
      </fieldset>

      {/* Spam trap: real visitors never see this field. It must be sent empty. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor={id(HONEYPOT_FIELD)}>Leave this field empty</label>
        <input
          type="text"
          id={id(HONEYPOT_FIELD)}
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Filled in by lib/leads.ts right before sending. */}
      <input type="hidden" name="form_name" value={FORM_NAME} />
      <input type="hidden" name="form_location" value={location} />
      {TRACKING_FIELDS.map((name) => (
        <input key={name} type="hidden" name={name} defaultValue="" />
      ))}

      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={sending}
        data-testid="button-submit-lead"
      >
        {sending ? (
          <>Sending...</>
        ) : (
          <>
            {submitLabel}
            <Send className="w-5 h-5" />
          </>
        )}
      </Button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm font-medium",
          status.kind === "error" ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {status.kind === "error"
          ? status.message
          : !hasLeadEndpoint
            ? `Sending opens your email app with a message to ${CONTACT_EMAIL}.`
            : ""}
      </p>
    </form>
  );
}
