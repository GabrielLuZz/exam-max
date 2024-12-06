"use client";
import Image from "next/image";
import logo from "@/assets/img/logo.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const path = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`py-8 sticky top-0 transition-all duration-200 z-[1] ${
        isScrolled ? "backdrop-blur-xl" : ""
      }`}
      style={{ marginBottom: "clamp(2rem, 6.375cqi, 6.375rem)" }}
    >
      <div className="wrapper flex justify-between gap-3 items-end">
        <Link href="/" className="hover-opacity inline-block">
          <Image
            src={logo}
            alt="logo escrita Exam Max, da cor preta e azul e com uma prancheta pequena em cima da letra m."
            priority
          />
        </Link>
        <nav className="flex items-center">
          <Link
            href="/exames"
            className={`font-inter font-medium  ${
              path === "/exames"
                ? "text-app-secondary"
                : "font-inter font-medium text-gray-800"
            }`}
          >
            Exames
          </Link>
        </nav>
      </div>
    </header>
  );
}
