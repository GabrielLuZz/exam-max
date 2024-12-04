import bg_blue_deco from "@/assets/img/bg-blue-deco.svg";
import Image from "next/image";
import circle_orange_deco_little from "@/assets/img/circle-orange-deco-little.svg";
import clipboard from "@/assets/img/clipboard.svg";
import { MakeAppointmentForm } from "./MakeAppointmentForm";
import { AppointmentCard } from "./AppointmentCard";

export default function PageExame() {
  return (
    <>
      <div className="absolute left-0 top-[-3rem] z-[-1] w-full h-full overflow-hidden flex items-end">
        <Image
          src={bg_blue_deco}
          alt=""
          className="rotate-[175deg] translate-x-[-180px] translate-y-[140px] max-w-[31.25rem]"
        />
      </div>

      <div className="absolute right-0 bottom-[3.5rem] z-[-1] w-full h-full overflow-hidden flex items-end justify-end">
        <Image src={circle_orange_deco_little} alt="" className="" />
      </div>

      <main>
        <div className="wrapper">
          <span className="block text-end font-poppins font-extrabold text-[1.125rem] text-app-secondary leading-6 mb-8">
            Cardiologia
          </span>
          <h1
            className="flex items-center font-volkhov font-normal text-app-primary mb-20"
            style={{
              fontSize: "clamp(2.6rem, 4cqi, 4rem)",
              marginBottom: "clamp(2rem,5cqi, 5rem)",
            }}
          >
            <Image src={clipboard} alt="ícone de uma prancheta" />
            Raio X
          </h1>
          <MakeAppointmentForm />
          <hr className="h-[0.125rem] bg-gray-200 my-[2.875rem] rounded-md" />
          <h2
            className="font-volkhov font-normal text-app-heading-primary mb-8"
            style={{ fontSize: "clamp(1.5rem,2cqi, 2rem)" }}
          >
            Agendados
          </h2>
          <div
            className="responsive-grid mb-8"
            style={{
              gap: "clamp(1.6rem, 3.625cqi, 3.625rem)",
              marginBottom: "clamp(1rem ,1.875cqi, 1.875rem)",
            }}
          >
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
          </div>
        </div>
      </main>
    </>
  );
}
