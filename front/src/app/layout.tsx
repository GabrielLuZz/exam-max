import type { Metadata } from "next";
import "./globals.css";
import { Volkhov, Poppins } from "next/font/google";
import { Footer, Header } from "@/components/templates";

const volkhov = Volkhov({
  display: "fallback",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  display: "fallback",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Exam Max",
  description:
    "aplicação web para gerenciamento de agendamentos de exames hospitalares",
  icons: [
    { rel: "icon", sizes: "96x96", url: "/favicon-96x96.png" },
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "100x100",
      url: "/apple-touch-icon.png",
    },
    { rel: "manifest", url: "/site.webmanifest" },
  ],
  robots: {
    index: process.env.APP_ENV !== "production",
    follow: process.env.APP_ENV !== "production",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${volkhov.className} ${poppins.className}`}>
        <div className="relative flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
