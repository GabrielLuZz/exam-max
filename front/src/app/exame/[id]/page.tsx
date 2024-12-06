import bg_blue_deco from "@/assets/img/bg-blue-deco.svg";
import Image from "next/image";
import circle_orange_deco_little from "@/assets/img/circle-orange-deco-little.svg";
import clipboard from "@/assets/img/clipboard.svg";
import { MakeAppointmentForm } from "./MakeAppointmentForm";
import { ExamType } from "@/utils/types";
import { baseUrlForServer } from "@/services/back";
import { notFound } from "next/navigation";
import { SchedulesList } from "./SchedulesList";
import ExamProvider from "./ExamContext";
import * as motion from "motion/react-client";

const getExam = async (id: string): Promise<ExamType> => {
  const headers = new Headers();

  const examOptions = {
    headers: headers,
  };

  const examResponse = await fetch(`${baseUrlForServer}/exam/${id}`, {
    cache: "no-cache",
    ...examOptions,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Erro durante a requisição para pegar um exame:", error);
    });

  if (examResponse?.error && examResponse?.statusCode === 404) {
    notFound();
  }

  return examResponse;
};

export async function generateStaticParams() {
  const headers = new Headers();

  const examsOptions = {
    headers: headers,
  };

  const examsResponse: ExamType[] = await fetch(
    `${baseUrlForServer}/exam`,
    examsOptions
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Erro durante a requisição para pegar os exames:", error);
    });

  return examsResponse?.map((exam) => ({
    id: exam.id,
  }));
}

export default async function PageExame({
  params,
}: {
  params: { id: string };
}) {
  const exam = await getExam(params.id);

  return (
    <>
      <div className="absolute left-0 top-[-3rem] z-[-1] w-full h-full overflow-hidden flex items-end">
        <motion.div
          layout
          initial={{ width: "0" }}
          animate={{ width: "542px" }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <Image
            src={bg_blue_deco}
            alt=""
            className="rotate-[175deg] translate-x-[-180px] translate-y-[140px] max-w-[31.25rem] w-full"
          />
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-[3.5rem] z-[-1] w-full h-full overflow-hidden flex items-end justify-end">
        <Image src={circle_orange_deco_little} alt="" className="" />
      </div>

      <motion.main
        key="exame"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <div className="wrapper">
          {exam?.specialty && (
            <span className="block text-end font-poppins font-extrabold text-[1.125rem] text-app-secondary leading-6 mb-8">
              {exam?.specialty}
            </span>
          )}
          <h1
            className="flex items-center font-volkhov font-normal text-app-primary mb-20"
            style={{
              fontSize: "clamp(1.4rem, 4cqi, 4rem)",
              marginBottom: "clamp(2rem,5cqi, 5rem)",
            }}
          >
            <Image src={clipboard} alt="ícone de uma prancheta" />
            {exam?.name}
          </h1>
          <ExamProvider initalExamValue={exam}>
            <MakeAppointmentForm />
            <hr className="h-[0.125rem] bg-gray-200 my-[2.875rem] rounded-md" />
            <h2
              className="font-volkhov font-normal text-app-heading-primary mb-8"
              style={{ fontSize: "clamp(1.5rem,2cqi, 2rem)" }}
            >
              Agendados
            </h2>
            <SchedulesList />
          </ExamProvider>
        </div>
      </motion.main>
    </>
  );
}
