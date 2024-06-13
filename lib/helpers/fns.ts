import { signOut } from "next-auth/react";
import React from "react";

export const logout = async () => {
  await signOut();
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let result = "";
  if (days > 0) {
    result += days + " day" + (days === 1 ? "" : "s") + ", ";
  }
  if (hours > 0) {
    result += hours + " hour" + (hours === 1 ? "" : "s");
  }

  return result + " ago";
};

export const minus = (setter: React.Dispatch<React.SetStateAction<number>>) =>
  setter((prev) => (prev <= 1 ? 1 : prev - 1));
export const plus = (setter: React.Dispatch<React.SetStateAction<number>>) => setter((prev) => prev + 1);
