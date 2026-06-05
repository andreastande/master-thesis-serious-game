import { ArrowRight, Check, HelpCircle, Lock } from "lucide-react"
import { cases } from "../cases"
import type { Case, CaseAnswer } from "../cases/types"
import Button from "../components/ui/Button"
import { casesForCategory, categories } from "../data/categories"
import type { CategoryMeta } from "../data/categories"
import OnboardingTutorial from "../game/OnboardingTutorial"

// Dev-only flag. Set VITE_UNLOCK_ALL_CASES=true in .env.local to make every
// implemented case selectable regardless of progress while building.
const UNLOCK_ALL_CASES = import.meta.env.VITE_UNLOCK_ALL_CASES === "true"

type Props = {
  results: CaseAnswer[]
  onStartCase: (caseId: string) => void
  tutorialOpen: boolean
  onTutorialOpenChange: (open: boolean) => void
}

function CaseHub({ results, onStartCase, tutorialOpen, onTutorialOpenChange }: Props) {
  const completedIds = new Set(results.map((r) => r.caseId))
  const totalCases = categories.reduce((sum, c) => sum + c.expectedCases, 0)
  const completedCount = completedIds.size
  const progressPct = totalCases > 0 ? (completedCount / totalCases) * 100 : 0

  return (
    <div className="relative min-h-dvh overflow-hidden bg-ink-950 text-paper-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(80% 60% at 10% -10%, rgba(120,80,200,0.18), transparent 60%), radial-gradient(60% 40% at 110% 10%, rgba(184,145,57,0.10), transparent 60%), linear-gradient(180deg, #0a0f24 0%, #060919 100%)",
        }}
      />
      <div aria-hidden="true" className="tex-noise pointer-events-none absolute inset-0 opacity-50" />

      <header className="relative z-10 border-b border-paper-50/10 bg-ink-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-10 py-4">
          <div className="flex items-center gap-3">
            <Sigil />
            <div className="leading-none">
              <p className="font-display text-base font-semibold tracking-tight text-paper-50">
                Tilgjengelighetsjakten
              </p>
              <p className="mt-1 font-mono text-[9px] font-bold tracking-[0.28em] text-brass-400 uppercase">
                Kronkrøll · Intern revisjon
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onTutorialOpenChange(true)}
              aria-label="Vis briefingen igjen"
              className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 bg-white/3 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-paper-100/80 uppercase transition-colors hover:border-paper-50/25 hover:bg-white/8 hover:text-paper-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
            >
              <HelpCircle className="size-3" strokeWidth={2} />
              Briefing
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-10 pt-16 pb-24">
        <div className="flex items-end justify-between gap-10">
          <div>
            <p className="font-mono text-[11px] font-bold tracking-[0.32em] text-brass-400 uppercase">Sakshub</p>
            <h1 className="mt-3 font-display text-5xl leading-[0.95] font-semibold tracking-tight text-paper-50">
              Velg din neste sak.
            </h1>
            <p className="mt-3 max-w-md text-paper-100/70">
              Hver sak inneholder en forhåndsvisning Kronkrøll vil lansere. Finn friksjonen.
            </p>
          </div>

          <ProgressMedallion completed={completedCount} total={totalCases} pct={progressPct} />
        </div>

        <div className="mt-16 space-y-14">
          {categories.map((meta, idx) => (
            <CategorySection
              key={meta.id}
              meta={meta}
              completedIds={completedIds}
              onStartCase={onStartCase}
              actNumber={idx + 1}
            />
          ))}
        </div>
      </main>

      <OnboardingTutorial open={tutorialOpen} onOpenChange={onTutorialOpenChange} />
    </div>
  )
}

function Sigil() {
  return (
    <div className="relative flex size-9 items-center justify-center rounded-md border border-brass-400/40 bg-linear-to-b from-ink-700 to-ink-900">
      <span className="font-display text-base font-semibold text-brass-300">K</span>
    </div>
  )
}

function ProgressMedallion({ completed, total, pct }: { completed: number; total: number; pct: number }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const dash = (pct / 100) * circumference
  return (
    <div
      className="relative flex flex-col items-center"
      role="progressbar"
      aria-valuenow={completed}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div className="relative">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          <circle cx="48" cy="48" r={radius} className="fill-none stroke-paper-50/10" strokeWidth="6" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="fill-none stroke-brass-400 transition-[stroke-dashoffset] duration-700 ease-out"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            style={{ filter: "drop-shadow(0 0 8px rgba(210,173,87,0.45))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl leading-none font-semibold text-paper-50">{completed}</span>
          <span className="mt-0.5 font-mono text-[9px] tracking-[0.22em] text-paper-100/60 uppercase">av {total}</span>
        </div>
      </div>
      <p className="mt-2 font-mono text-[9px] tracking-[0.28em] text-paper-100/60 uppercase">Saker lukket</p>
    </div>
  )
}

type Row =
  | { kind: "ready"; position: number; case_: Case }
  | { kind: "completed"; position: number; case_: Case }
  | { kind: "locked"; position: number; case_: Case }
  | { kind: "missing"; position: number }

function buildRows(expected: number, sectionCases: Case[], completedIds: Set<string>): Row[] {
  const rows: Row[] = []
  for (let position = 1; position <= expected; position++) {
    const case_ = sectionCases[position - 1]
    if (!case_) {
      rows.push({ kind: "missing", position })
      continue
    }
    if (completedIds.has(case_.id)) {
      rows.push({ kind: "completed", position, case_ })
      continue
    }
    if (isCaseUnlocked(case_, completedIds)) {
      rows.push({ kind: "ready", position, case_ })
    } else {
      rows.push({ kind: "locked", position, case_ })
    }
  }
  return rows
}

function isCaseUnlocked(case_: Case, completedIds: Set<string>): boolean {
  if (UNLOCK_ALL_CASES) return true
  if (case_.number === 1) return true
  const prev = cases.find((c) => c.number === case_.number - 1)
  if (!prev) return false
  return completedIds.has(prev.id)
}

function CategorySection({
  meta,
  completedIds,
  onStartCase,
  actNumber,
}: {
  meta: CategoryMeta
  completedIds: Set<string>
  onStartCase: (caseId: string) => void
  actNumber: number
}) {
  const sectionCases = casesForCategory(meta.id)
  const rows = buildRows(meta.expectedCases, sectionCases, completedIds)
  const sectionDone = rows.every((r) => r.kind === "completed")

  return (
    <section>
      <div className="flex items-center gap-5">
        <span className="font-mono text-[10px] font-bold tracking-[0.32em] text-brass-400 uppercase">
          Akt {String(actNumber).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-paper-50/10" />
        {sectionDone && (
          <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.28em] text-emerald-300 uppercase">
            <Check className="size-3" strokeWidth={3} />
            Lukket
          </span>
        )}
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper-50">{meta.title}</h2>

      <ol className="mt-6 grid grid-cols-2 gap-4">
        {rows.map((row) => (
          <CaseRow key={row.position} row={row} onStart={onStartCase} />
        ))}
      </ol>
    </section>
  )
}

function CaseRow({ row, onStart }: { row: Row; onStart: (caseId: string) => void }) {
  if (row.kind === "missing") {
    return (
      <li className="flex h-full min-h-40 flex-col rounded-xl border border-dashed border-paper-50/10 bg-white/2 px-5 py-6">
        <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-paper-100/35 uppercase">
          Sak {String(row.position).padStart(2, "0")}
        </p>
        <p className="mt-2 text-paper-100/40">Kommer snart</p>
        <div className="mt-auto flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-paper-100/40 uppercase">
          <Lock className="size-3" />
          Ikke klar
        </div>
      </li>
    )
  }

  if (row.kind === "locked") {
    return (
      <li className="flex h-full min-h-40 flex-col rounded-xl border border-paper-50/10 bg-white/2 px-5 py-6">
        <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-paper-100/35 uppercase">
          Sak {String(row.case_.number).padStart(2, "0")}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-paper-100/45">{row.case_.title}</h3>
        <div className="mt-auto flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-paper-100/40 uppercase">
          <Lock className="size-3" />
          Låst
        </div>
      </li>
    )
  }

  if (row.kind === "completed") {
    return (
      <li className="relative flex h-full min-h-40 flex-col overflow-hidden rounded-xl border border-emerald-400/25 bg-emerald-400/4 px-5 py-6">
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 rotate-12 rounded-sm border border-emerald-400/40 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.28em] text-emerald-300/80 uppercase"
        >
          Lukket
        </span>
        <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-emerald-300/70 uppercase">
          Sak {String(row.case_.number).padStart(2, "0")}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-paper-100/70">{row.case_.title}</h3>
        <div className="mt-auto flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.22em] text-emerald-300 uppercase">
          <Check className="size-3" strokeWidth={3} />
          Fullført
        </div>
      </li>
    )
  }

  return (
    <li className="group relative flex h-full min-h-40 flex-col overflow-hidden rounded-xl border border-brass-400/30 bg-linear-to-br from-ink-700/70 via-ink-800/70 to-ink-900/70 px-5 py-6 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04)] transition-transform hover:-translate-y-0.5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          backgroundImage: "radial-gradient(60% 50% at 0% 0%, rgba(210,173,87,0.14), transparent 60%)",
        }}
      />
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-brass-300 uppercase">
          Sak {String(row.case_.number).padStart(2, "0")}
        </p>
        <span className="rounded-sm border border-brass-400/40 bg-brass-400/10 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.28em] text-brass-300 uppercase">
          Klar
        </span>
      </div>
      <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-paper-50">{row.case_.title}</h3>
      <Button
        onClick={() => onStart(row.case_.id)}
        className="relative mt-auto inline-flex w-fit items-center gap-2 self-start overflow-hidden rounded-md border border-brass-300/60 bg-linear-to-b from-brass-400 to-brass-500 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.28em] text-ink-950 uppercase shadow-[0_6px_18px_-8px_rgba(184,145,57,0.7),inset_0_1px_0_rgba(255,255,255,0.5)] transition-colors hover:from-brass-300 hover:to-brass-400"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        <span className="relative">Åpne sak</span>
        <ArrowRight className="relative size-3" strokeWidth={2.6} />
      </Button>
    </li>
  )
}

export default CaseHub
