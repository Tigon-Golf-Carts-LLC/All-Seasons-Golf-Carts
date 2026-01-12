import { Card } from "@/components/ui/card";
import { 
  Battery, 
  Gauge, 
  Ruler, 
  Weight, 
  Users, 
  Cog, 
  Zap, 
  Navigation
} from "lucide-react";

interface Spec {
  label: string;
  value: string;
  icon: "battery" | "gauge" | "ruler" | "weight" | "users" | "cog" | "zap" | "navigation";
}

interface SpecTableProps {
  title: string;
  specs: Spec[];
}

const iconMap = {
  battery: Battery,
  gauge: Gauge,
  ruler: Ruler,
  weight: Weight,
  users: Users,
  cog: Cog,
  zap: Zap,
  navigation: Navigation,
};

export function SpecTable({ title, specs }: SpecTableProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {specs.map((spec, index) => {
          const Icon = iconMap[spec.icon];
          return (
            <Card key={index} className="p-4 flex items-start gap-4 hover-elevate">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{spec.label}</p>
                <p className="font-semibold text-sm mt-0.5 truncate">{spec.value}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
