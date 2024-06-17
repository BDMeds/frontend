import { signOut } from "next-auth/react";

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

export const getBase64 = (file: File) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    reader.onload = () => {
      // @ts-ignore
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
