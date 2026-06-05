import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { Case } from "../cases/types"
import { cardsForCategory, type PatternCardId } from "../data/patternCards"
import CalloutMarker from "./CalloutMarker"
import CasePanel from "./CasePanel"
import PatternCardView from "./PatternCardView"
import PreviewFrame from "./PreviewFrame"
import Typewriter from "./Typewriter"

type Props = {
  case_: Case
  selectedCardId: PatternCardId | null
  selectedCallout: number | null
  onSelectCard: (id: PatternCardId) => void
  onSelectCallout: (n: number) => void
}

function Revisjonsmodus({ case_, selectedCardId, selectedCallout, onSelectCard, onSelectCallout }: Props) {
  const Interface = case_.Interface
  const cards = cardsForCategory(case_.categoryId)
  const [expandedCardId, setExpandedCardId] = useState<PatternCardId | null>(null)
  const firstName = case_.userImpact.user.firstName

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [topShadow, setTopShadow] = useState(0)
  const [bottomShadow, setBottomShadow] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const RAMP = 64
    const update = () => {
      const distanceFromTop = el.scrollTop
      const distanceFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop
      setTopShadow(Math.max(0, Math.min(1, distanceFromTop / RAMP)))
      setBottomShadow(Math.max(0, Math.min(1, distanceFromBottom / RAMP)))
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    for (const child of el.children) ro.observe(child)
    return () => {
      el.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [cards, expandedCardId])

  return (
    <div className="space-y-8">
      <CasePanel tone="amber" label="Revisjon" icon={<Search className="size-3.5" />}>
        <p className="font-display text-lg leading-snug text-ink-800 italic">
          <Typewriter>
            Du gikk samme vei som {firstName} – hvor stoppet det opp? Velg{" "}
            <strong className="font-semibold not-italic">ett Mønsterkort</strong> for hva, og{" "}
            <strong className="font-semibold not-italic">ett punkt</strong> for hvor.
          </Typewriter>
        </p>
      </CasePanel>

      <div className="grid grid-cols-[minmax(0,1fr)_360px] items-stretch gap-8">
        <PreviewFrame previewPath={case_.previewPath}>
          <Interface mode="revisjonsmodus" />
          {case_.callouts.map((c) => (
            <CalloutMarker
              key={c.n}
              n={c.n}
              position={c.position}
              label={c.label}
              selected={selectedCallout === c.n}
              onSelect={() => onSelectCallout(c.n)}
            />
          ))}
        </PreviewFrame>

        <aside className="relative">
          <div className="absolute inset-0 flex flex-col">
            <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-brass-300 uppercase">Mønsterkort</p>
            <div className="relative mt-4 min-h-0 flex-1">
              <div
                ref={scrollRef}
                className="absolute inset-0 space-y-4 overflow-y-auto pr-1 [scrollbar-color:var(--color-brass-300)_transparent] [scrollbar-width:thin]"
              >
                {cards.map((card) => (
                  <PatternCardView
                    key={card.id}
                    card={card}
                    mode="revisjon"
                    selected={selectedCardId === card.id}
                    expanded={expandedCardId === card.id}
                    onSelect={() => onSelectCard(card.id)}
                    onToggleExpand={() => setExpandedCardId((prev) => (prev === card.id ? null : card.id))}
                  />
                ))}
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-ink-950 to-transparent"
                style={{ opacity: topShadow }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-ink-950 to-transparent"
                style={{ opacity: bottomShadow }}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Revisjonsmodus
