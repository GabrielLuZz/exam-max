import bg_blue_deco from "@/assets/img/bg-blue-deco.svg";
import Image from "next/image";
import Link from "next/link";

export default function PageExames() {
  return (
    <>
      <div className="absolute right-0 top-[-3rem] z-[-1] h-full overflow-hidden flex items-end">
        <Image
          src={bg_blue_deco}
          alt=""
          className="rotate-[64deg] translate-x-[256px] translate-y-[75px]"
        />
      </div>

      <main>
        <div className="wrapper">
          <h1
            className="relative font-poppins font-bold after:block after:absolute after:bottom-0 after:left-[-1rem] after:w-[13rem] after:h-3 after:bg-underline-deco after:bg-no-repeat after:bg-contain after:scale-y-[1.8] after:z-[-1] "
            style={{
              fontSize: "clamp(2rem, 2.375cqi, 2.375rem)",
              marginBottom: "clamp(2rem ,3.375cqi, 3.375rem)",
            }}
          >
            Exames
          </h1>

          <section
            className="grid w-full grid-cols-1 justify-center min-[380px]:grid-cols-exam-cards-list"
            style={{
              gap: "clamp(1.6rem, 3.625cqi, 3.625rem)",
              marginBottom: "clamp(1rem ,1.875cqi, 1.875rem)",
            }}
          >
            <Link
              href=""
              className="block aspect-[320/220] rounded-[1.375rem] bg-back-exam-card bg-no-repeat bg-cover shadow-app-shadow-primary relative flex items-center px-[1.875rem] py-5 transition-opacity duration-200 hover:opacity-80"
            >
              <h2 className="font-volkhov font-bold text-3xl text-black">
                Raio X
              </h2>
              <span className="absolute right-5 bottom-5 text-[1.25rem] font-poppins font-medium">
                Dermatologia
              </span>
            </Link>
            <Link
              href=""
              className="block aspect-[320/220] rounded-[1.375rem] bg-back-exam-card bg-no-repeat bg-cover shadow-app-shadow-primary relative flex items-center px-[1.875rem] py-5 transition-opacity duration-200 hover:opacity-80"
            >
              <h2 className="font-volkhov font-bold text-3xl text-black">
                Raio X
              </h2>
              <span className="absolute right-5 bottom-5 text-[1.25rem] font-poppins font-medium">
                Dermatologia
              </span>
            </Link>
            <Link
              href=""
              className="block aspect-[320/220] rounded-[1.375rem] bg-back-exam-card bg-no-repeat bg-cover shadow-app-shadow-primary relative flex items-center px-[1.875rem] py-5 transition-opacity duration-200 hover:opacity-80"
            >
              <h2 className="font-volkhov font-bold text-3xl text-black">
                Raio X
              </h2>
              <span className="absolute right-5 bottom-5 text-[1.25rem] font-poppins font-medium">
                Dermatologia
              </span>
            </Link>
            <Link
              href=""
              className="block aspect-[320/220] rounded-[1.375rem] bg-back-exam-card bg-no-repeat bg-cover shadow-app-shadow-primary relative flex items-center px-[1.875rem] py-5 transition-opacity duration-200 hover:opacity-80"
            >
              <h2 className="font-volkhov font-bold text-3xl text-black">
                Raio X
              </h2>
              <span className="absolute right-5 bottom-5 text-[1.25rem] font-poppins font-medium">
                Dermatologia
              </span>
            </Link>
            <Link
              href=""
              className="block aspect-[320/220] rounded-[1.375rem] bg-back-exam-card bg-no-repeat bg-cover shadow-app-shadow-primary relative flex items-center px-[1.875rem] py-5 transition-opacity duration-200 hover:opacity-80"
            >
              <h2 className="font-volkhov font-bold text-3xl text-black">
                Raio X
              </h2>
              <span className="absolute right-5 bottom-5 text-[1.25rem] font-poppins font-medium">
                Dermatologia
              </span>
            </Link>
            <Link
              href=""
              className="block aspect-[320/220] rounded-[1.375rem] bg-back-exam-card bg-no-repeat bg-cover shadow-app-shadow-primary relative flex items-center px-[1.875rem] py-5 transition-opacity duration-200 hover:opacity-80"
            >
              <h2 className="font-volkhov font-bold text-3xl text-black">
                Raio X
              </h2>
              <span className="absolute right-5 bottom-5 text-[1.25rem] font-poppins font-medium">
                Dermatologia
              </span>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
