import type { Metadata } from "next";
import "./globals.css";
import { Volkhov, Poppins } from "next/font/google";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${volkhov.className} ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
