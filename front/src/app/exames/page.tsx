import bg_blue_deco from "@/assets/img/bg-blue-deco.svg";
import { baseUrlForServer } from "@/services/back";
import { ExamType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";

const getExams = async (): Promise<ExamType[]> => {
  const headers = new Headers();

  const examsOptions = {
    headers: headers,
  };

  const examsResponse = await fetch(`${baseUrlForServer}/exam`, {
    cache: "no-cache",
    ...examsOptions,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Erro durante a requisição para pegar os exames:", error);
    });

  return examsResponse;
};

export default async function PageExames() {
  const exams = await getExams();
  return (
    <>
      <div className="absolute right-0 top-[-3rem] z-[-1] h-full overflow-hidden flex items-end">
        <motion.div
          layout
          initial={{ width: "0" }}
          animate={{ width: "542px" }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <Image
            src={bg_blue_deco}
            alt=""
            className="rotate-[64deg] translate-x-[256px] translate-y-[75px] w-full"
          />
        </motion.div>
      </div>

      <motion.main
        key="exames"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
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
            className="responsive-grid"
            style={{
              gap: "clamp(1.6rem, 3.625cqi, 3.625rem)",
              marginBottom: "clamp(1rem ,1.875cqi, 1.875rem)",
            }}
          >
            {exams?.map((exam) => (
              <Link
                key={exam?.id}
                href={`/exame/${exam?.id}`}
                className="block aspect-[320/220] rounded-[1.375rem] bg-back-exam-card bg-no-repeat bg-cover shadow-app-shadow-primary relative flex items-center px-[1.875rem] py-5 hover-opacity"
              >
                <h2 className="font-volkhov font-bold text-3xl text-black">
                  {exam?.name}
                </h2>
                <span className="absolute right-5 bottom-5 text-[1.25rem] font-poppins font-medium">
                  {exam?.specialty}
                </span>
              </Link>
            ))}
          </section>
        </div>
      </motion.main>
    </>
  );
}
