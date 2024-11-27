import { toast } from "sonner";

export const showToast = {
  success: (message) => {
    toast.success(message, {
      duration: 4000,
      className: "bg-gray-900 text-white border-gray-800",
    });
  },
  error: (error) => {
    toast.error(error?.message || "An error occurred", {
      duration: 5000,
      className: "bg-gray-900 text-white border-gray-800",
    });
  },
  loading: (message) => {
    toast.loading(message, {
      className: "bg-gray-900 text-white border-gray-800",
    });
  },
  promise: async (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || "Loading...",
      success: messages.success || "Success!",
      error: (err) => messages.error || err?.message || "An error occurred",
      className: "bg-gray-900 text-white border-gray-800",
    });
  },
};
