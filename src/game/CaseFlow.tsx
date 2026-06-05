import { Dialog } from "@base-ui/react/dialog"
import { Toast } from "@base-ui/react/toast"
import { ArrowRight, Inbox, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { Case, CaseAnswer, Mode } from "../cases/types"
import Button from "../components/ui/Button"
import { casesForCategory } from "../data/categories"
import type { PatternCardId } from "../data/patternCards"
import Brukermodus from "./Brukermodus"
import Dispatch from "./Dispatch"
import Feedback from "./Feedback"
import Mitigation from "./Mitigation"
import ModeStepper from "./ModeStepper"
import Revisjonsmodus from "./Revisjonsmodus"

type Props = {
  case_: Case
  totalCases: number
  onCaseComplete: (answer: CaseAnswer) => void
}

const CTA_TOAST_ID = "mode-cta"

function CaseFlow({ case_, totalCases, onCaseComplete }: Props) {
  const [caseOpened, setCaseOpened] = useState(false)
  const [klagenotatOpen, setKlagenotatOpen] = useState(false)
  const [mode, setMode] = useState<Mode>("brukermodus")
  const [selectedCardId, setSelectedCardId] = useState<PatternCardId | null>(null)
  const [taskCompleted, setTaskCompleted] = useState(false)
  const [selectedCallout, setSelectedCallout] = useState<number | null>(null)
  const [selectedMitigation, setSelectedMitigation] = useState<number | null>(null)
  const toastManager = Toast.useToastManager()
  const isLastInCategory = casesForCategory(case_.categoryId).at(-1)?.id === case_.id

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [mode, caseOpened])

  const ctaVisible =
    caseOpened &&
    ((mode === "brukermodus" && taskCompleted) ||
      (mode === "revisjonsmodus" && selectedCardId !== null && selectedCallout !== null) ||
      (mode === "mitigation" && selectedMitigation !== null) ||
      mode === "feedback")

  const answer: CaseAnswer = {
    caseId: case_.id,
    patternCardId: selectedCardId,
    callout: selectedCallout,
    mitigation: selectedMitigation,
    cardCorrect: selectedCardId === case_.patternCardId,
    calloutCorrect: selectedCallout === case_.correctCallout,
    mitigationCorrect: selectedMitigation === case_.correctMitigation,
  }

  useEffect(() => {
    let cta: { title: string; label: string; onAdvance: () => void } | null = null

    if (!caseOpened) {
      cta = null
    } else if (mode === "brukermodus" && taskCompleted) {
      cta = {
        title: "Oppgaven er utført som kunde",
        label: "Til revisjon",
        onAdvance: () => setMode("revisjonsmodus"),
      }
    } else if (mode === "revisjonsmodus" && selectedCardId !== null && selectedCallout !== null) {
      cta = {
        title: "Funn klart",
        label: "Bekreft funn",
        onAdvance: () => setMode("mitigation"),
      }
    } else if (mode === "mitigation" && selectedMitigation !== null) {
      cta = {
        title: "Tiltak valgt",
        label: "Bekreft tiltak",
        onAdvance: () => setMode("feedback"),
      }
    } else if (mode === "feedback") {
      cta = {
        title: "Sak fullført",
        label: isLastInCategory ? "Til aktoppsummeringen" : "Tilbake til sakshuben",
        onAdvance: () => onCaseComplete(answer),
      }
    }

    if (cta) {
      toastManager.add({
        id: CTA_TOAST_ID,
        title: cta.title,
        timeout: 0,
        priority: "low",
        actionProps: {
          onClick: cta.onAdvance,
          children: (
            <>
              {cta.label}
              <ArrowRight className="size-3.5" />
            </>
          ),
        },
      })
    } else {
      toastManager.close(CTA_TOAST_ID)
    }
    // toastManager / onCaseComplete / case_ are stable for this CaseFlow instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseOpened, mode, taskCompleted, selectedCardId, selectedCallout, selectedMitigation])

  useEffect(() => {
    return () => toastManager.close(CTA_TOAST_ID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="relative min-h-dvh text-paper-50"
      style={{
        backgroundColor: "#080d1f",
        backgroundImage:
          "radial-gradient(80% 60% at 50% -10%, rgba(120,80,200,0.15), transparent 60%), radial-gradient(60% 40% at 100% 110%, rgba(184,145,57,0.08), transparent 60%), linear-gradient(180deg, #0a0f24 0%, #060919 100%)",
      }}
    >
      <div aria-hidden="true" className="tex-noise pointer-events-none fixed inset-0 opacity-40" />

      <header className="sticky top-0 z-30 border-b border-paper-50/10 bg-ink-900/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-10 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center gap-2 rounded-md border border-brass-400/40 bg-ink-800/80 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <span className="font-mono text-[10px] tracking-[0.28em] text-brass-300 uppercase">Sak</span>
                <span className="font-display text-base leading-none font-semibold tracking-tight text-paper-50">
                  #{String(case_.number).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] text-paper-100/40">
                  / {String(totalCases).padStart(2, "0")}
                </span>
              </div>
              <div className="leading-tight">
                <p className="font-mono text-[9px] font-bold tracking-[0.28em] text-brass-400 uppercase">Kronkrøll</p>
                <h1 className="mt-0.5 font-display text-lg leading-tight font-semibold tracking-tight text-paper-50">
                  {case_.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {caseOpened && (
                <button
                  type="button"
                  onClick={() => setKlagenotatOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-paper-50/15 bg-white/3 px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-paper-100/80 uppercase transition-colors hover:border-paper-50/25 hover:bg-white/8 hover:text-paper-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
                >
                  <Inbox className="size-3" strokeWidth={2} />
                  Klagenotat
                </button>
              )}
            </div>
          </div>

          {caseOpened && (
            <div className="mt-4 flex items-center">
              <ModeStepper mode={mode} />
            </div>
          )}
        </div>
      </header>

      {caseOpened ? (
        <main className={`relative mx-auto max-w-7xl px-10 pt-10 ${ctaVisible ? "pb-32" : "pb-10"}`}>
          {mode === "brukermodus" && <Brukermodus case_={case_} onTaskComplete={() => setTaskCompleted(true)} />}

          {mode === "revisjonsmodus" && (
            <Revisjonsmodus
              case_={case_}
              selectedCardId={selectedCardId}
              selectedCallout={selectedCallout}
              onSelectCard={setSelectedCardId}
              onSelectCallout={setSelectedCallout}
            />
          )}

          {mode === "mitigation" && (
            <Mitigation
              case_={case_}
              selected={selectedMitigation}
              selectedCardId={selectedCardId}
              selectedCallout={selectedCallout}
              onSelect={setSelectedMitigation}
              onBackToRevisjon={() => {
                setSelectedMitigation(null)
                setMode("revisjonsmodus")
              }}
            />
          )}

          {mode === "feedback" && <Feedback case_={case_} answer={answer} />}
        </main>
      ) : (
        <main className="relative mx-auto max-w-3xl px-10 pt-14 pb-20">
          <div className="anim-rise">
            <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.32em] text-brass-400 uppercase">
              <span className="h-px w-8 bg-brass-400/60" />
              Ny sak · Klage videresendt
            </p>
            <h2 className="mt-3 font-display text-2xl leading-tight font-semibold tracking-tight text-paper-50">
              Les klagen før du tar saken.
            </h2>
          </div>

          <div className="anim-rise mt-7">
            <Dispatch case_={case_} typewriter />
          </div>

          <div className="anim-rise mt-8 flex justify-center" style={{ animationDelay: "0.15s" }}>
            <Button
              onClick={() => setCaseOpened(true)}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md border border-brass-300/60 bg-linear-to-b from-brass-400 to-brass-500 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.3em] text-ink-950 uppercase shadow-[0_8px_24px_-8px_rgba(184,145,57,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform hover:-translate-y-0.5"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <span className="relative">Ta saken</span>
              <ArrowRight className="relative size-3.5" strokeWidth={2.6} />
            </Button>
          </div>
        </main>
      )}

      <Dialog.Root open={klagenotatOpen} onOpenChange={setKlagenotatOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(640px,calc(100vw-3rem))] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0">
            <Dialog.Title className="sr-only">Klagenotat</Dialog.Title>
            <div className="relative">
              <Dialog.Close
                aria-label="Lukk klagenotat"
                className="absolute -top-3 -right-3 z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-ink-900 text-paper-100/80 ring-1 ring-paper-50/20 transition-colors hover:bg-ink-800 hover:text-paper-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
              >
                <X className="size-4" strokeWidth={2.2} />
              </Dialog.Close>
              <Dispatch case_={case_} />
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default CaseFlow
