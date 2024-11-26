import { formatDistanceToNow, format, isThisYear } from "date-fns";

export const formatCreatedAt = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMinutes = Math.floor((now - postDate) / 1000 / 60);

  if (diffInMinutes < 1) {
    return "just now";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  if (diffInMinutes < 24 * 60) {
    return formatDistanceToNow(postDate, { addSuffix: false });
  }

  if (isThisYear(postDate)) {
    return format(postDate, "MMMM d 'at' h:mm a");
  }

  return format(postDate, "MMMM d, yyyy 'at' h:mm a");
};
