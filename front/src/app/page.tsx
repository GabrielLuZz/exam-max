import { buttonVariants } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import bg_blue_deco from "@/assets/img/bg-blue-deco.svg";
import circle_orange_deco from "@/assets/img/circle-orange-deco.svg";
import little_doctor from "@/assets/img/little-doctor.png";

export default function Home() {
  return (
    <>
      <div className="absolute right-0 top-[-3rem] z-[-1] h-full overflow-hidden">
        <Image src={bg_blue_deco} alt="" className="" />
      </div>

      <Image
        src={circle_orange_deco}
        alt=""
        className="absolute left-[-1rem] top-[-3rem]"
      />

      <main className="flex">
        <div className="wrapper relative flex flex-col justify-center">
          <Image
            width={468}
            height={626}
            src={little_doctor}
            alt=""
            className="absolute right-0 bottom-[-0rem] z-[-1] w-full max-w-[21.5rem] sm:max-w-[25rem] lg:w-auto lg:max-w-[none]"
          />
          <span
            className="font-poppins font-bold text-app-secondary mb-6 uppercase "
            style={{ fontSize: "clamp(.875rem, 1.25cqi, 1.25rem)" }}
          >
            Best Destinations around the world
          </span>
          <h1
            className="font-volkhov font-bold text-app-heading-primary max-w-[34rem] mb-7 relative after:hidden after:absolute after:top-0 after:w-[20rem] after:h-3 after:bg-underline-deco after:bg-no-repeat after:right-[-3rem] after:top-[4.2rem] after:z-[-1] sm:after:block"
            style={{
              fontSize: "clamp(2.5rem, 5.25cqi, 5.25rem)",
              lineHeight: "clamp(3.75rem, 5.5cqi, 5.5rem)",
            }}
          >
            Travel, enjoy and live a new and full life
          </h1>
          <p
            className="font-poppins font-medium text-app-text-blue-gray max-w-[30rem] mb-8"
            style={{
              fontSize: "clamp(.75rem, 1cqi, 1rem)",
              lineHeight: "clamp(1.5rem, 2cqi, 2rem)",
            }}
          >
            Built Wicket longer admire do barton vanity itself do in it.
            Preferred to sportsmen it engrossed listening. Park gate sell they
            west hard for the.
          </p>
          <Link
            href="/exames"
            className={`${buttonVariants({
              variant: "big",
            })} px-6 py-4 h-auto shadow-app-shadow-secondary mb-5`}
          >
            Find out more
          </Link>
        </div>
      </main>
    </>
  );
}
