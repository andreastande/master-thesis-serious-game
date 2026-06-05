import { Check } from "lucide-react"
import { Fragment } from "react"
import type { Mode } from "../cases/types"

type Step = { key: Mode; label: string; hint: string }

const steps: Step[] = [
  { key: "brukermodus", label: "Brukermodus", hint: "Spill rollen" },
  { key: "revisjonsmodus", label: "Revisjonsmodus", hint: "Funn" },
  { key: "mitigation", label: "Tiltak", hint: "Velg endring" },
  { key: "feedback", label: "Resultat", hint: "Lukk saken" },
]

function ModeStepper({ mode }: { mode: Mode }) {
  const currentIndex = steps.findIndex((s) => s.key === mode)

  return (
    <div className="relative flex w-full items-center justify-between gap-3">
      {steps.map((step, i) => (
        <Fragment key={step.key}>
          <StepNode
            n={i + 1}
            label={step.label}
            hint={step.hint}
            state={i < currentIndex ? "past" : i === currentIndex ? "active" : "future"}
          />
          {i < steps.length - 1 && <Connector active={i < currentIndex} />}
        </Fragment>
      ))}
    </div>
  )
}

function StepNode({
  n,
  label,
  hint,
  state,
}: {
  n: number
  label: string
  hint: string
  state: "past" | "active" | "future"
}) {
  const isActive = state === "active"
  const isPast = state === "past"

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {isActive && (
          <span
            aria-hidden="true"
            className="anim-pulse-ring absolute inset-0 rounded-full text-brass-400/70"
            style={{ pointerEvents: "none" }}
          />
        )}
        <div
          className={`relative flex size-8 items-center justify-center overflow-hidden rounded-full border font-mono text-[11px] font-bold transition-all duration-500 ${
            isActive
              ? "border-brass-300 text-ink-950 shadow-[0_0_14px_-2px_rgba(210,173,87,0.7),inset_0_1px_0_rgba(255,255,255,0.5)]"
              : isPast
                ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-200"
                : "border-paper-50/15 bg-white/2 text-paper-100/40"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 bg-linear-to-b from-brass-400 to-brass-500 transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
          <span className="relative">
            {isPast ? <Check className="size-4" strokeWidth={3} /> : String(n).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="leading-tight">
        <p
          className={`font-mono text-[10px] font-bold tracking-[0.22em] uppercase transition-colors ${
            isActive ? "text-brass-300" : isPast ? "text-emerald-300/80" : "text-paper-100/40"
          }`}
        >
          {label}
        </p>
        <p
          className={`mt-0.5 text-[11px] transition-colors ${
            isActive ? "text-paper-50" : isPast ? "text-paper-100/45" : "text-paper-100/30"
          }`}
        >
          {hint}
        </p>
      </div>
    </div>
  )
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="relative h-px flex-1 overflow-hidden rounded-full bg-paper-50/10">
      <div
        className={`absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-emerald-400/40 via-emerald-400/70 to-emerald-400/40 transition-[width] duration-700 ease-out ${
          active ? "w-full" : "w-0"
        }`}
      />
    </div>
  )
}

export default ModeStepper
