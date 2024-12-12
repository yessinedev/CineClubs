import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import apiClient from "@/services/apiClient";

export function useUserSync() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncUserToDatabase = async () => {
      if (isSignedIn && user) {
        try {
          await apiClient.post("/users", {
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            username:
              user.username ||
              user.firstName ||
              user.primaryEmailAddress?.emailAddress,
          });
        } catch (error) {
          console.error("Error syncing user to database:", error);
        }
      }
    };
    syncUserToDatabase();
  }, [isSignedIn, user]);
}
