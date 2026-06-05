import { Crown, FileCheck } from "lucide-react"
import type { CaseAnswer } from "../cases/types"

type Props = {
  results: CaseAnswer[]
}

function FinalSummary({ results }: Props) {
  const total = results.length
  const cardCorrect = results.filter((r) => r.cardCorrect).length
  const calloutCorrect = results.filter((r) => r.calloutCorrect).length
  const mitigationCorrect = results.filter((r) => r.mitigationCorrect).length

  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink-950 text-paper-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 50% -10%, rgba(184,145,57,0.22), transparent 60%), radial-gradient(80% 60% at 50% 110%, rgba(120,80,200,0.18), transparent 60%), linear-gradient(180deg, #0a0f24 0%, #060919 100%)",
        }}
      />
      <div aria-hidden="true" className="tex-noise pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-3xl px-10 pt-24 pb-24">
        <p className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.32em] text-brass-400 uppercase">
          <span className="h-px w-8 bg-brass-400/60" />
          Revisjon fullført
        </p>

        <div className="anim-rise mt-6 flex items-center gap-4">
          <Crown className="anim-flicker size-12 text-brass-400" strokeWidth={1.6} aria-hidden="true" />
          <h1 className="font-display text-6xl leading-[0.95] font-semibold tracking-tight">
            <span className="text-gold-shimmer">Saken er lukket.</span>
          </h1>
        </div>

        <p
          className="anim-rise mt-6 max-w-xl font-display text-xl leading-snug text-paper-100/85 italic"
          style={{ animationDelay: "120ms" }}
        >
          Hele revisjonen er ferdig. Du har sett hvordan små designvalg endrer hvem som klarer å bruke en tjeneste — og
          hva som skjer når kognitiv tilgjengelighet ikke står øverst på listen.
        </p>

        <div className="anim-rise mt-12 grid grid-cols-3 gap-4" style={{ animationDelay: "240ms" }}>
          <StatTile label="Mønsterkort" value={cardCorrect} total={total} />
          <StatTile label="Markører" value={calloutCorrect} total={total} />
          <StatTile label="Tiltak" value={mitigationCorrect} total={total} />
        </div>

        <div
          className="anim-rise mt-10 flex items-start gap-3 rounded-lg border border-brass-400/30 bg-brass-400/6 p-5 text-paper-100/85"
          style={{ animationDelay: "360ms" }}
        >
          <FileCheck className="size-5 shrink-0 text-brass-300" strokeWidth={1.8} />
          <p className="text-sm leading-relaxed">
            Rapporten din ligger på pulten til ledergruppen i Kronkrøll. De vet hva de skal endre før neste lansering.
          </p>
        </div>
      </div>
    </main>
  )
}

function StatTile({ label, value, total }: { label: string; value: number; total: number }) {
  return (
    <div className="rounded-lg border border-paper-50/10 bg-white/3 p-5 backdrop-blur">
      <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-brass-300 uppercase">{label}</p>
      <p className="mt-2 font-display text-4xl leading-none font-semibold text-paper-50">
        {value}
        <span className="text-2xl text-paper-100/40"> / {total}</span>
      </p>
    </div>
  )
}

export default FinalSummary
