import { Dialog } from "@base-ui/react/dialog"
import { ArrowRight, ChevronLeft, FileSearch, Fingerprint, Inbox, Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { ReactNode, TransitionEvent } from "react"
import Button from "../components/ui/Button"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = {
  eyebrow: string
  title: string
  body: ReactNode
  highlights?: { icon: typeof Fingerprint; label: string; detail: string }[]
  illustration?: ReactNode
}

const welcomeIllustration = (
  <div className="relative mt-6 h-28 overflow-hidden rounded-lg border border-paper-50/10 bg-ink-950/40">
    <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-2.5 px-7">
      <div className="h-1.5 w-2/5 rounded-full bg-paper-100/12" />
      <div className="h-1.5 w-3/5 rounded-full bg-paper-100/12" />
      <div className="h-1.5 w-1/2 rounded-full bg-paper-100/12" />
      <div className="h-1.5 w-2/3 rounded-full bg-paper-100/12" />
    </div>
    <Fingerprint aria-hidden="true" className="absolute -right-3 -bottom-4 size-24 text-brass-300/10" strokeWidth={1} />
    <div aria-hidden="true" className="anim-sweep absolute top-1/2 -translate-y-1/2">
      <div className="absolute -inset-8 rounded-full bg-brass-300/20 blur-2xl" />
      <div className="relative flex size-14 items-center justify-center rounded-full border border-brass-300/40 bg-ink-900/70 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        <Search className="size-6 text-brass-300" strokeWidth={1.8} />
      </div>
    </div>
  </div>
)

const stackIllustration = (
  <div className="relative mt-6 h-28 rounded-lg border border-paper-50/10 bg-ink-950/40 px-8">
    <div
      aria-hidden="true"
      className="absolute top-1/2 right-16 left-12 -translate-y-1/2 border-t border-dashed border-brass-400/25"
    />
    <div className="relative flex h-full items-center justify-between">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={`anim-act-pulse-${n} flex size-10 items-center justify-center rounded-md border border-brass-400/40 bg-ink-900/85 font-mono text-xs font-bold text-brass-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`}
          aria-hidden="true"
        >
          {String(n).padStart(2, "0")}
        </div>
      ))}
    </div>
  </div>
)

const steps: Step[] = [
  {
    eyebrow: "Memo · Internt",
    title: "Velkommen, designrevisor.",
    body: (
      <>
        Du har akkurat begynt hos <span className="font-semibold text-brass-300">Kronkrøll Bank &amp; Forsikring</span>.
        Hver sak på pulten er en klage som kom inn — og friksjonen som utløste den er din å finne.
      </>
    ),
    illustration: welcomeIllustration,
  },
  {
    eyebrow: "Slik jobber du i en sak",
    title: "Først som kunde. Så som revisor.",
    body: "Hver sak åpner med kundens klage. Du prøver flyten først, så slår revisjonsblikket inn.",
    highlights: [
      { icon: Inbox, label: "Klagenotat", detail: "Les kundens egen beskrivelse av det som glapp." },
      { icon: Fingerprint, label: "Brukermodus", detail: "Løs oppgaven som om du var kunden." },
      { icon: Search, label: "Revisjonsmodus", detail: "Pek på friksjonen og velg et mønsterkort." },
      { icon: FileSearch, label: "Tiltak", detail: "Foreslå én konkret endring før du sender." },
    ],
  },
  {
    eyebrow: "Slik er bunken bygget",
    title: "Tre akter. Seks saker.",
    body: "Seks saker i tre akter åpner seg én etter én. Etter hver akt får du en kort oppsummering før neste bunke låses opp.",
    illustration: stackIllustration,
  },
]

function OnboardingTutorial({ open, onOpenChange }: Props) {
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")
  const pendingRef = useRef<number | null>(null)

  useEffect(() => {
    if (open) {
      setStepIndex(0)
      setPhase("in")
      pendingRef.current = null
    }
  }, [open])

  const goTo = (next: number) => {
    if (next === stepIndex || pendingRef.current !== null || next < 0 || next >= steps.length) return
    pendingRef.current = next
    setPhase("out")
  }

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "opacity" || phase !== "out" || pendingRef.current === null) return
    const next = pendingRef.current
    pendingRef.current = null
    setStepIndex(next)
    // Two rAFs: let the browser paint the new content at opacity-0 before transitioning in
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("in")))
  }

  const step = steps[stepIndex]
  const isLast = stepIndex === steps.length - 1
  const isTransitioning = pendingRef.current !== null || phase === "out"

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(560px,calc(100vw-3rem))] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0">
          <div className="relative overflow-hidden rounded-2xl border border-brass-400/30 bg-linear-to-br from-ink-700/95 via-ink-800/95 to-ink-900/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(210,173,87,0.08)] backdrop-blur">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(210,173,87,0.55), transparent 70%)" }}
            />
            <div aria-hidden="true" className="tex-noise pointer-events-none absolute inset-0 opacity-40" />

            <Dialog.Close
              aria-label="Lukk briefingen"
              className="absolute top-4 right-4 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-paper-100/60 transition-colors hover:bg-white/5 hover:text-paper-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
            >
              <X className="size-4" strokeWidth={2.2} />
            </Dialog.Close>

            <div className="relative px-9 pt-9 pb-7">
              <div
                onTransitionEnd={handleTransitionEnd}
                className={`min-h-[400px] transition-[opacity,filter] duration-200 ease-out ${
                  phase === "out" ? "pointer-events-none opacity-0 blur-sm" : "blur-0 opacity-100"
                }`}
              >
                <div key={stepIndex}>
                  <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.32em] text-brass-400 uppercase">
                    <FileSearch className="size-3" />
                    {step.eyebrow}
                  </p>

                  <Dialog.Title className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight text-paper-50">
                    {step.title}
                  </Dialog.Title>

                  <Dialog.Description className="mt-3 max-w-md text-[15px] leading-relaxed text-paper-100/80">
                    {step.body}
                  </Dialog.Description>

                  {step.illustration}

                  {step.highlights && (
                    <ul className="mt-5 space-y-2">
                      {step.highlights.map((h, i) => (
                        <li
                          key={h.label}
                          className="anim-rise flex items-center gap-3 rounded-lg border border-paper-50/10 bg-white/3 px-3 py-2.5"
                          style={{ animationDelay: `${0.25 + i * 0.13}s` }}
                        >
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brass-500/15 font-mono text-[10px] font-bold text-brass-300 ring-1 ring-brass-400/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h.icon className="size-4 shrink-0 text-brass-300/80" strokeWidth={1.8} aria-hidden="true" />
                          <span className="text-sm text-paper-100/90">
                            <span className="font-semibold text-paper-50">{h.label}.</span>{" "}
                            <span className="text-paper-100/70">{h.detail}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between gap-4">
                <ol className="flex items-center gap-2" aria-label={`Steg ${stepIndex + 1} av ${steps.length}`}>
                  {steps.map((_, i) => (
                    <li
                      key={i}
                      aria-current={i === stepIndex ? "step" : undefined}
                      className={`h-1.5 rounded-full transition-all ${
                        i === stepIndex ? "w-8 bg-brass-400" : "w-1.5 bg-paper-50/20"
                      }`}
                    />
                  ))}
                </ol>

                <div className="flex items-center gap-2">
                  {stepIndex > 0 && (
                    <Button
                      onClick={() => goTo(stepIndex - 1)}
                      disabled={isTransitioning}
                      className="inline-flex items-center gap-1.5 rounded-md border border-paper-50/15 bg-white/5 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.28em] text-paper-100/80 uppercase transition-colors hover:bg-white/10 hover:text-paper-50 disabled:opacity-60"
                    >
                      <ChevronLeft className="size-3" strokeWidth={2.6} />
                      Tilbake
                    </Button>
                  )}
                  {isLast ? (
                    <Button
                      onClick={() => onOpenChange(false)}
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-brass-300/60 bg-linear-to-b from-brass-400 to-brass-500 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.3em] text-ink-950 uppercase shadow-[0_6px_18px_-8px_rgba(184,145,57,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform hover:-translate-y-0.5"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                      <span className="relative">Til pulten</span>
                      <ArrowRight className="relative size-3" strokeWidth={2.6} />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => goTo(stepIndex + 1)}
                      disabled={isTransitioning}
                      className="inline-flex items-center gap-2 rounded-md border border-brass-300/60 bg-linear-to-b from-brass-400 to-brass-500 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.3em] text-ink-950 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      Videre
                      <ArrowRight className="size-3" strokeWidth={2.6} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default OnboardingTutorial
