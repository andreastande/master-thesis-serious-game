import { Check, ClipboardCheck, X } from "lucide-react"
import type { Case, CaseAnswer } from "../cases/types"
import { getPatternCard } from "../data/patternCards"
import CasePanel from "./CasePanel"

type Props = {
  case_: Case
  answer: CaseAnswer
}

function Feedback({ case_, answer }: Props) {
  const correctCard = getPatternCard(case_.patternCardId)
  const chosenCard = answer.patternCardId ? getPatternCard(answer.patternCardId) : null
  const score = (answer.cardCorrect ? 1 : 0) + (answer.calloutCorrect ? 1 : 0) + (answer.mitigationCorrect ? 1 : 0)
  const verdict = verdictForScore(score, 3)

  return (
    <CasePanel tone="amber" label="Funn" icon={<ClipboardCheck className="size-3.5" />}>
      <div className="flex items-start justify-between gap-8">
        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight text-ink-950">Saken er lukket</h3>
          <p className="mt-1 font-display text-base text-ink-700 italic">{verdictHeadline(verdict)}</p>
        </div>
        <VerdictStamp verdict={verdict} />
      </div>

      <dl className="mt-7 grid grid-cols-3 gap-6 border-t border-paper-200/80 pt-6">
        <Result
          label="Mønsterkort"
          chosen={chosenCard?.name ?? "—"}
          correct={correctCard.name}
          isCorrect={answer.cardCorrect}
        />
        <Result
          label="Markør"
          chosen={answer.callout !== null ? `Punkt ${answer.callout}` : "—"}
          correct={`Punkt ${case_.correctCallout}`}
          isCorrect={answer.calloutCorrect}
        />
        <Result
          label="Tiltak"
          chosen={answer.mitigation !== null ? letter(answer.mitigation) : "—"}
          correct={letter(case_.correctMitigation)}
          isCorrect={answer.mitigationCorrect}
        />
      </dl>
    </CasePanel>
  )
}

function verdictForScore(score: number, maxScore: number): Verdict {
  const ratio = maxScore > 0 ? score / maxScore : 0
  if (ratio === 1) return "perfect"
  if (ratio >= 2 / 3) return "good"
  if (ratio > 0) return "partial"
  return "miss"
}

function verdictHeadline(v: Verdict): string {
  switch (v) {
    case "perfect":
      return "Tre treff. Ren revisjon."
    case "good":
      return "Solid lesning. Saken er klar for arkivet."
    case "partial":
      return "Du er på sporet, men noe gled forbi."
    case "miss":
      return "Saken trenger et nytt blikk neste gang."
  }
}

type Verdict = "perfect" | "good" | "partial" | "miss"

function VerdictStamp({ verdict }: { verdict: Verdict }) {
  const config: Record<Verdict, { label: string; tone: string; ring: string; rot: string }> = {
    perfect: {
      label: "Eksemplarisk",
      tone: "text-emerald-700",
      ring: "border-emerald-700/50",
      rot: "rotate-[-6deg]",
    },
    good: {
      label: "Godkjent",
      tone: "text-emerald-700",
      ring: "border-emerald-700/50",
      rot: "rotate-[-4deg]",
    },
    partial: {
      label: "Delvis",
      tone: "text-brass-600",
      ring: "border-brass-600/60",
      rot: "rotate-[3deg]",
    },
    miss: {
      label: "Revidert",
      tone: "text-rose-700",
      ring: "border-rose-700/50",
      rot: "rotate-[-7deg]",
    },
  }
  const c = config[verdict]
  return (
    <div
      className={`relative shrink-0 rounded-md border-2 px-4 py-2 font-mono text-xs font-bold tracking-[0.3em] uppercase ${c.tone} ${c.ring} ${c.rot}`}
      style={{
        textShadow: "0 0 1px rgba(0,0,0,0.05)",
        boxShadow: "inset 0 0 0 4px transparent",
      }}
    >
      <span>{c.label}</span>
      <span aria-hidden="true" className="absolute -top-1 -right-1 size-2 rounded-full bg-current opacity-50" />
    </div>
  )
}

function Result({
  label,
  chosen,
  correct,
  isCorrect,
}: {
  label: string
  chosen: string
  correct: string
  isCorrect: boolean
}) {
  return (
    <div>
      <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-ink-600 uppercase">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`flex size-6 items-center justify-center rounded-full ${
            isCorrect
              ? "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/40"
              : "bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/40"
          }`}
        >
          {isCorrect ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} />}
        </span>
        <span className="font-display text-base font-semibold text-ink-950">{chosen}</span>
      </div>
      {!isCorrect && <p className="mt-1 text-xs text-ink-600">Riktig: {correct}</p>}
    </div>
  )
}

function letter(n: number) {
  return String.fromCharCode(65 + n)
}

export default Feedback
