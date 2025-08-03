import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

export const useToast = () => {
  const toast = ({ title, description, variant = "default" }: ToastOptions) => {
    const message = title && description ? `${title}: ${description}` : title || description || "";
    
    switch (variant) {
      case "destructive":
        sonnerToast.error(message);
        break;
      case "success":
        sonnerToast.success(message);
        break;
      default:
        sonnerToast(message);
        break;
    }
  };

  return { toast };
}; 