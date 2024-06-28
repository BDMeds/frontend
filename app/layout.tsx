import type { Metadata } from "next";
import "../public/globals.css";
import { dmSans } from "@/lib/utils/fonts";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: {
    default: "BDMeds",
    template: `%s | BDMeds`,
  },
  description: "BDMeds is a healthcare application that manages ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} dark:bg-black dark:text-gray-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
