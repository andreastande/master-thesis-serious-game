import { ArrowRight, BookOpen } from "lucide-react"
import Button from "../components/ui/Button"
import { getCategory } from "../data/categories"
import type { CategoryId } from "../data/categories"

type Props = {
  categoryId: CategoryId
  onContinue: () => void
  continueLabel?: string
}

function Recap({ categoryId, onContinue, continueLabel = "Tilbake til sakshuben" }: Props) {
  const meta = getCategory(categoryId)

  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink-950 text-paper-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 50% -10%, rgba(120,80,200,0.18), transparent 60%), linear-gradient(180deg, #0a0f24 0%, #060919 100%)",
        }}
      />
      <div aria-hidden="true" className="tex-noise pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-3xl px-10 pt-24 pb-24">
        <p className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.32em] text-brass-400 uppercase">
          <span className="h-px w-8 bg-brass-400/60" />
          Akt fullført · {meta.title}
        </p>

        <h1 className="anim-rise mt-6 font-display text-6xl leading-[0.95] font-semibold tracking-tight text-paper-50">
          Akten er ferdig.
        </h1>

        <div className="anim-rise mt-10 space-y-6" style={{ animationDelay: "120ms" }}>
          <p className="text-lg leading-relaxed text-paper-100/85">{meta.recap.takeaway}</p>
          <p className="text-base leading-relaxed text-paper-100/70">{meta.recap.contrast}</p>

          <blockquote className="relative rounded-lg border border-brass-400/30 bg-brass-400/6 px-7 py-6 text-paper-50">
            <BookOpen
              className="absolute top-5 right-5 size-5 text-brass-400/60"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-brass-300 uppercase">Regelen</p>
            <p className="mt-2 pr-8 font-display text-lg leading-snug italic">{meta.recap.rule}</p>
          </blockquote>
        </div>

        <Button
          onClick={onContinue}
          className="anim-rise mt-12 inline-flex items-center gap-3 rounded-md border border-brass-300/60 bg-linear-to-b from-brass-400 to-brass-500 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.3em] text-ink-950 uppercase shadow-[0_8px_24px_-8px_rgba(184,145,57,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform hover:-translate-y-0.5"
          style={{ animationDelay: "240ms" }}
        >
          {continueLabel}
          <ArrowRight className="size-3.5" strokeWidth={2.6} />
        </Button>
      </div>
    </main>
  )
}

export default Recap
