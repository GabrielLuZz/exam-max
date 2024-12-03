"use client";
import Image from "next/image";
import logo from "@/assets/img/logo.svg";
import { UIEvent, useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

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
      <div className="wrapper">
        <Image
          src={logo}
          alt="logo escrita Exam Max, da cor preta e azul e com uma prancheta pequena em cima da letra m."
        />
      </div>
    </header>
  );
}
