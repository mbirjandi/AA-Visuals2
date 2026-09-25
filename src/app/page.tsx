import { ViewTransition } from "react";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Collaborations } from "@/components/home/Collaborations";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>
        <Hero />
        <SelectedWork />
        <Collaborations />
        <Services />
        <About />
        <Contact />
      </div>
    </ViewTransition>
  );
}
