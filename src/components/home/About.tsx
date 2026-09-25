import Image from "next/image";
import { Reveal } from "../Reveal";
import { StepTitle } from "../StepTitle";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" data-nav="paper" data-theme="paper" className="frame pb-[clamp(140px,26vh,280px)]">
      <div className="grid-12 gap-y-12">
        <div className="col-span-4 lg:col-span-5">
          <Reveal kind="media" className="chamfer-tl [--ch:clamp(90px,16vw,280px)]">
            <div className="relative aspect-[2/3] w-full bg-ink-2">
              <Image
                src="/about/arman-on-set.jpg"
                alt="Arman Asadi checking a shot on his camera rig at a Gunna show"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={80}
                className="object-cover"
                style={{ objectPosition: "50% 35%" }}
              />
            </div>
          </Reveal>
          <p className="meta mt-3 text-[var(--fg-mute)]">On the rig, Gunna show.</p>
        </div>

        <div className="col-span-4 flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
          <div>
            <h2 id="about-title" className="meta mb-8">About</h2>
            <StepTitle as="p" lines={["Arman", "Asadi"]} className="text-[clamp(84px,12.4vw,230px)]" />
          </div>
          <div className="grid gap-8">
            <p className="lead max-w-[22ch]">
              I shoot and edit for artists, brands and creators who care how their work looks.
            </p>
            <div className="grid gap-6 text-[17px] leading-snug sm:grid-cols-2 sm:gap-x-[var(--col-gap)]">
              <p className="max-w-[34ch]">
                Music videos for Gunna. Branded content for Manchester United and Pop Mart. YouTube with Harry Pinero,
                Darkest Man and Max Khadar.
              </p>
              <p className="max-w-[30ch]">
                Camera, edit and colour, start to finish.
              </p>
            </div>
            <p className="meta">Based in London. Available worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
