import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";

export const metadata: Metadata = {
  title: "Neumorphic Movie App",
  description: "Premium cinematic movie discovery experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 80px)' }}>
            {children}
          </main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
