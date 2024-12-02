import Image from "next/image";
import logo from "@/assets/img/logo.svg";

export function Header() {
  return (
    <header className="pt-14">
      <div className="wrapper">
        <Image
          src={logo}
          alt="logo escrita Exam Max, da cor preta e azul e com uma prancheta pequena em cima da letra m."
        />
      </div>
    </header>
  );
}
