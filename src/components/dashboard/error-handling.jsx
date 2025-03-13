"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const ErrorHandling = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]); // Runs only when 'error' changes

  return null; // No UI needed, just triggering toast
};

export default ErrorHandling;
