export function formatTimePast(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // approximate months
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years === 1 ? "" : "s"} ago`;
  } else if (months > 0) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  } else if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (diff > 0) {
    return "<1 minute ago";
  } else {
    return "just now";
  }
}

export function getGreetingTime(): string {
  const currentTime = new Date().getHours();

  if (currentTime < 12) {
    return "Morning";
  } else if (currentTime < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}
