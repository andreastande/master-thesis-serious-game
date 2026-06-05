import { ChevronDown, Search, Wrench, type LucideIcon } from "lucide-react"
import type { PatternCard } from "../data/patternCards"

export type PatternCardMode = "revisjon" | "tiltak"

type Props = {
  card: PatternCard
  mode: PatternCardMode
  selected: boolean
  expanded: boolean
  onSelect?: () => void
  onToggleExpand?: () => void
}

function PatternCardView({ card, mode, selected, expanded, onSelect, onToggleExpand }: Props) {
  const Icon = card.icon
  const isOpen = expanded
  const isInteractive = onSelect !== undefined

  const foreground =
    mode === "tiltak"
      ? { label: "Slik kan det fikses", text: card.howToFix, icon: Wrench }
      : { label: "Slik oppdager du det", text: card.howToSpot, icon: Search }

  const hiddenFields =
    mode === "tiltak"
      ? [{ term: "Slik oppdager du det", def: card.howToSpot, icon: Search }]
      : [{ term: "Slik kan det fikses", def: card.howToFix, icon: Wrench }]

  const headerContent = (
    <>
      {/* category banner */}
      <div className="-mx-5 -mt-5 mb-4 flex items-center justify-between border-b border-paper-200/70 bg-linear-to-b from-paper-100 to-paper-50 px-5 py-2">
        <p className="font-mono text-[9px] font-bold tracking-[0.28em] text-ink-700/70 uppercase">{card.category}</p>
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full transition-colors ${selected ? "bg-brass-500" : "bg-ink-300"}`}
        />
      </div>

      {/* gilded icon medallion */}
      <div className="flex justify-center">
        <div className="relative">
          <div
            aria-hidden="true"
            className={`absolute -inset-1 rounded-full transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
            style={{
              background: "radial-gradient(closest-side, rgba(210,173,87,0.55), transparent 70%)",
            }}
          />
          <div
            className={`relative flex size-10 items-center justify-center rounded-full border-2 ${
              selected
                ? "border-brass-400 bg-linear-to-b from-brass-300 to-brass-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_12px_-4px_rgba(184,145,57,0.6)]"
                : "border-ink-300/60 bg-paper-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] group-hover/card:border-brass-400/70 group-hover/card:bg-brass-300/25"
            }`}
          >
            <Icon
              className={`size-4 ${selected ? "text-ink-900" : "text-ink-700 group-hover/card:text-ink-900"}`}
              aria-hidden="true"
              strokeWidth={selected ? 2.2 : 1.8}
            />
          </div>
        </div>
      </div>

      <h4 className="mt-3 text-center font-display text-xl font-semibold tracking-tight text-ink-950">{card.name}</h4>
      <p className="mt-2 text-center font-display text-sm leading-snug text-ink-600 italic">{card.tagline}</p>
    </>
  )

  return (
    <div
      className={`group/card relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-brass-400 bg-paper-50 shadow-[0_16px_32px_-14px_rgba(184,145,57,0.7),0_0_0_3px_rgba(210,173,87,0.22)]"
          : isInteractive
            ? "border-ink-300/40 bg-paper-50 shadow-[0_6px_18px_-12px_rgba(10,15,36,0.5)] hover:border-brass-400 hover:shadow-[0_16px_32px_-14px_rgba(184,145,57,0.7),0_0_0_3px_rgba(210,173,87,0.22)]"
            : "border-ink-300/40 bg-paper-50 shadow-[0_6px_18px_-12px_rgba(10,15,36,0.5)]"
      }`}
    >
      {/* corner ornaments */}
      <CardCorner className="top-1.5 left-1.5" />
      <CardCorner className="top-1.5 right-1.5 rotate-90" />
      <CardCorner className="bottom-1.5 left-1.5 -rotate-90" />
      <CardCorner className="right-1.5 bottom-1.5 rotate-180" />

      {isInteractive ? (
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          className="block w-full cursor-pointer text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
        >
          <div className="px-5 pt-5 pb-4">{headerContent}</div>
          <div className="border-t border-ink-200/40 bg-paper-100/60 px-5 py-3">
            <SectionLabel icon={foreground.icon}>{foreground.label}</SectionLabel>
            <p className="mt-1 text-xs leading-relaxed text-ink-800">{foreground.text}</p>
          </div>
        </button>
      ) : (
        <>
          <div className="px-5 pt-5 pb-4">{headerContent}</div>
          <div className="border-t border-ink-200/40 bg-paper-100/60 px-5 py-3">
            <SectionLabel icon={foreground.icon}>{foreground.label}</SectionLabel>
            <p className="mt-1 text-xs leading-relaxed text-ink-800">{foreground.text}</p>
          </div>
        </>
      )}

      {isOpen && (
        <dl className="space-y-3 border-t border-ink-200/40 bg-paper-100/60 px-5 py-3 text-xs">
          {hiddenFields.map((f) => (
            <Field key={f.term} term={f.term} def={f.def} icon={f.icon} />
          ))}
        </dl>
      )}

      {isInteractive && onToggleExpand && (
        <button
          type="button"
          onClick={onToggleExpand}
          aria-expanded={expanded}
          className="flex w-full cursor-pointer items-center justify-between border-t border-ink-200/40 px-5 py-2 font-mono text-[10px] font-bold tracking-[0.22em] text-ink-600 uppercase transition-colors hover:bg-paper-100/60 hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
        >
          <span>{expanded ? "Skjul detaljer" : "Vis mer"}</span>
          <ChevronDown className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

function CardCorner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute size-3 ${className}`}
      style={{
        borderTop: "1px solid rgba(184,145,57,0.55)",
        borderLeft: "1px solid rgba(184,145,57,0.55)",
      }}
    />
  )
}

function SectionLabel({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.24em] text-ink-600 uppercase">
      <Icon className="size-3" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function Field({ term, def, icon }: { term: string; def: string; icon: LucideIcon }) {
  return (
    <div>
      <dt>
        <SectionLabel icon={icon}>{term}</SectionLabel>
      </dt>
      <dd className="mt-0.5 leading-relaxed text-ink-800">{def}</dd>
    </div>
  )
}

export default PatternCardView
