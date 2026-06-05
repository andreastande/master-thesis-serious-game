import type { ReactNode } from "react"

type Tone = "violet" | "amber" | "emerald" | "rose" | "slate"

type Props = {
  tone: Tone
  label: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const toneStyles: Record<Tone, { tab: string; accent: string; ribbon: string }> = {
  violet: {
    tab: "bg-linear-to-b from-[#8b5cf6] to-[#6d28d9] text-white",
    accent: "before:bg-[#8b5cf6]",
    ribbon: "from-violet-300/40 to-transparent",
  },
  amber: {
    tab: "bg-linear-to-b from-brass-300 to-brass-500 text-ink-950",
    accent: "before:bg-brass-500",
    ribbon: "from-brass-300/40 to-transparent",
  },
  emerald: {
    tab: "bg-linear-to-b from-emerald-400 to-emerald-600 text-white",
    accent: "before:bg-emerald-500",
    ribbon: "from-emerald-300/40 to-transparent",
  },
  rose: {
    tab: "bg-linear-to-b from-rose-400 to-rose-600 text-white",
    accent: "before:bg-rose-500",
    ribbon: "from-rose-300/40 to-transparent",
  },
  slate: {
    tab: "bg-linear-to-b from-ink-700 to-ink-900 text-paper-50",
    accent: "before:bg-ink-700",
    ribbon: "from-ink-500/40 to-transparent",
  },
}

function CasePanel({ tone, label, icon, children, className = "" }: Props) {
  const { tab, accent, ribbon } = toneStyles[tone]
  return (
    <section
      className={`tex-paper relative overflow-hidden rounded-lg border border-paper-200 bg-paper-50 px-7 pt-8 pb-7 text-ink-900 shadow-[0_18px_36px_-22px_rgba(0,0,0,0.6),0_2px_0_rgba(255,255,255,0.6)_inset] before:absolute before:top-0 before:left-0 before:h-full before:w-1 ${accent} ${className}`}
    >
      {/* paper ribbon glint */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-10 -right-10 size-44 rounded-full bg-linear-to-br ${ribbon} blur-2xl`}
      />

      {/* tab label */}
      <div
        className={`absolute top-0 left-7 inline-flex items-center gap-1.5 rounded-b-md px-3 py-1 font-mono text-[10px] font-bold tracking-[0.28em] uppercase shadow-md ${tab}`}
      >
        {icon}
        {label}
      </div>

      <div className="relative">{children}</div>
    </section>
  )
}

export default CasePanel
