import { ArrowLeft, Wrench } from "lucide-react"
import type { Case } from "../cases/types"
import { getPatternCard, type PatternCardId } from "../data/patternCards"
import CalloutMarker from "./CalloutMarker"
import CasePanel from "./CasePanel"
import PatternCardView from "./PatternCardView"
import PreviewFrame from "./PreviewFrame"
import Typewriter from "./Typewriter"

type Props = {
  case_: Case
  selected: number | null
  selectedCardId: PatternCardId | null
  selectedCallout: number | null
  onSelect: (n: number) => void
  onBackToRevisjon: () => void
}

function Mitigation({ case_, selected, selectedCardId, selectedCallout, onSelect, onBackToRevisjon }: Props) {
  const Interface = case_.Interface
  const chosenCard = selectedCardId ? getPatternCard(selectedCardId) : null
  const chosenCallout = selectedCallout !== null ? case_.callouts.find((c) => c.n === selectedCallout) : null
  const firstName = case_.userImpact.user.firstName

  return (
    <div className="space-y-8">
      <CasePanel tone="amber" label="Tiltak" icon={<Wrench className="size-3.5" />}>
        <p className="font-display text-lg leading-snug text-ink-800 italic">
          <Typewriter>
            Hvilken designendring ville hjulpet {firstName}? Bruk mønsterkortet du fant til å vurdere hvilket tiltak som
            faktisk reduserer barrieren.
          </Typewriter>
        </p>
      </CasePanel>

      <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-8">
        <PreviewFrame previewPath={case_.previewPath} className="self-start">
          <Interface mode="mitigation" />
          {chosenCallout && (
            <CalloutMarker n={chosenCallout.n} position={chosenCallout.position} label={chosenCallout.label} selected />
          )}
        </PreviewFrame>

        <aside className="space-y-6">
          {chosenCard && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-brass-300 uppercase">Ditt funn</p>
                {selectedCallout !== null && (
                  <span className="rounded-sm border border-brass-400/40 bg-brass-400/15 px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.22em] text-brass-300 uppercase">
                    Punkt {selectedCallout}
                  </span>
                )}
              </div>
              <PatternCardView card={chosenCard} mode="tiltak" selected expanded={false} />
              <button
                type="button"
                onClick={onBackToRevisjon}
                className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.22em] text-paper-100/55 uppercase transition-colors hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
              >
                <ArrowLeft className="size-3" strokeWidth={2.2} />
                Tilbake til revisjon
              </button>
            </div>
          )}

          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-paper-100/70 uppercase">Velg tiltak</p>
            <div className="mt-3 space-y-3">
              {case_.mitigationOptions.map((option, index) => {
                const isSelected = selected === index
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onSelect(index)}
                    aria-pressed={isSelected}
                    className={`flex w-full cursor-pointer items-start gap-3 rounded-lg border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 ${
                      isSelected
                        ? "border-brass-400 bg-paper-50 text-ink-900 shadow-[0_8px_20px_-10px_rgba(184,145,57,0.6)]"
                        : "border-paper-50/15 bg-white/3 text-paper-100/85 hover:border-paper-50/25 hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold ${
                        isSelected
                          ? "bg-linear-to-b from-brass-300 to-brass-500 text-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                          : "border border-paper-50/15 bg-white/4 text-paper-100/70"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm leading-relaxed">{option}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Mitigation
