import { buttonVariants } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import bg_blue_deco from "@/assets/img/bg-blue-deco.svg";
import circle_orange_deco from "@/assets/img/circle-orange-deco.svg";
import * as motion from "motion/react-client";

export default function Home() {
  return (
    <>
      <div className="absolute right-0 top-[-3rem] z-[-1] h-full overflow-hidden">
        <motion.div
          layout
          initial={{ width: "0" }}
          animate={{ width: "542px" }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <Image src={bg_blue_deco} alt="" className="w-full" />
        </motion.div>
      </div>

      <Image
        src={circle_orange_deco}
        alt=""
        className="absolute left-[-1rem] top-[-3rem]"
      />

      <motion.main
        key="not-found"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="min-h-screen flex items-center"
      >
        <div className="wrapper flex flex-col">
          <span
            className="text-app-secondary"
            style={{
              fontSize: "clamp(3.2rem, 5.5cqi, 5.5rem)",
              lineHeight: "clamp(3.4rem, 5.8cqi, 5.8rem)",
            }}
          >
            404!
          </span>
          <h1
            className="mb-3"
            style={{ fontSize: "clamp(1.6rem, 2cqi, 2rem)" }}
          >
            Página não encontrada
          </h1>
          <p className="mb-3 max-w-[28rem]">
            Essa página não existe ou foi removida. Sugerimos que volte para
            Home!
          </p>
          <Link href={"/"} className={`${buttonVariants({ variant: "big" })}`}>
            Voltar para Home
          </Link>
        </div>
      </motion.main>
    </>
  );
}
