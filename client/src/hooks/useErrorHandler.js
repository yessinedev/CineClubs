import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useErrorHandler() {
  const navigate = useNavigate();

  const handleError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return false; // Let the component handle 404s
        case 401:
          toast.error("Please sign in to continue");
          navigate("/login");
          break;
        case 403:
          toast.error("You don't have permission to perform this action");
          break;
        case 429:
          toast.error("Too many requests. Please try again later");
          break;
        default:
          toast.error("Something went wrong. Please try again later");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection");
    } else {
      toast.error("An unexpected error occurred");
    }
    return true;
  };

  return { handleError };
}
