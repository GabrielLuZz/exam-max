import { ReactNode } from "react";
import { Footer, Header } from "@/components/templates";
import { TemplateClient } from "./TemplateClient";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <TemplateClient>
      <Header />
      {children}
      <Footer />
    </TemplateClient>
  );
}
