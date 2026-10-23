import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/ui/Accordion";
import { homeFaq } from "@/content/faq";

export function FaqSection() {
  return (
    <Section tone="mist" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            index="07"
            label="Questions fréquentes"
            title="Les vraies questions, des réponses franches."
            intro={
              <>
                Production en Normandie, batteries, démarches, aides.{" "}
                <Link href="/faq/" className="text-ink underline underline-offset-4">
                  Toutes les questions
                </Link>
              </>
            }
          />
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={homeFaq} />
        </div>
      </div>
    </Section>
  );
}
