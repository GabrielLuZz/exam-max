import Image from "next/image";
import logo from "@/assets/img/logo.svg";

export function Header() {
  return (
    <header
      className="pt-14"
      style={{ marginBottom: "clamp(2rem, 8.375cqi, 8.375rem)" }}
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
