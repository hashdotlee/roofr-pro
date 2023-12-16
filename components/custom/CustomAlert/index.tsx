import { AlertCircle, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export default function CustomAlert({
  variant = "default",
  icon,
  title,
  description,
}: {
  variant: "destructive" | "default";
  icon?: any;
  title?: string;
  description?: string;
}) {
  const Icon =
    icon ||
    {
      destructive: AlertCircle,
      default: Terminal,
      success: Terminal,
    }[variant];

  return (
    <Alert
      variant={variant}
      className={cn({
        "border-red-600 text-red-600": variant === "destructive",
      })}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
