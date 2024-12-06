import { ReactNode } from "react";
import { TemplateClient } from "./TemplateClient";

export default function Template({ children }: { children: ReactNode }) {
  return <TemplateClient>{children}</TemplateClient>;
}
