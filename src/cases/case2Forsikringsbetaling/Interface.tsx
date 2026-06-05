import { CalendarClock, CreditCard, Crown, FileText, Headset, Phone, RefreshCw, ShieldAlert, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"
import type { InterfaceProps } from "../types"

type ActionId = "prov-igjen" | "bytt-kort" | "utsett" | "kontakt" | "se-avtale"

const actions: { id: ActionId; label: string; icon: LucideIcon }[] = [
  { id: "prov-igjen", label: "Prøv igjen", icon: RefreshCw },
  { id: "bytt-kort", label: "Bytt kort", icon: CreditCard },
  { id: "utsett", label: "Utsett", icon: CalendarClock },
  { id: "kontakt", label: "Kontakt oss", icon: Headset },
  { id: "se-avtale", label: "Se avtale", icon: FileText },
]

function Interface({ mode, onTaskComplete }: InterfaceProps) {
  const [chosen, setChosen] = useState<ActionId | null>(null)
  const interactive = mode === "brukermodus"

  const handleAction = (id: ActionId) => {
    setChosen(id)
    onTaskComplete?.()
  }

  return (
    <div className="bg-white font-[ui-sans-serif,system-ui]">
      <div className="flex h-14 items-center gap-3 border-b border-emerald-900/10 bg-linear-to-b from-emerald-50/40 to-white px-6">
        <div className="flex size-8 items-center justify-center rounded-md bg-linear-to-br from-emerald-700 to-emerald-900 shadow-sm ring-1 ring-emerald-900/30">
          <Crown className="size-4 text-amber-300" strokeWidth={2.5} />
        </div>
        <span className="font-serif text-lg leading-none font-semibold tracking-tight text-emerald-950">
          Kron<span className="text-emerald-700">krøll</span>
        </span>
        <span className="mt-0.5 ml-1 hidden text-[9px] font-bold tracking-[0.28em] text-emerald-700/80 uppercase sm:inline">
          Bank · Forsikring
        </span>
        <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
          <User className="size-4 text-slate-500" aria-hidden="true" />
          Kari Nordmann
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr]">
        <aside className="space-y-0.5 border-r border-emerald-900/10 bg-emerald-100/60 px-3 py-5 text-[13px] text-emerald-950/75">
          {[
            ["Oversikt", false],
            ["Betalinger", false],
            ["Kort", false],
            ["Lån", false],
            ["Sparing", false],
            ["Forsikring", true],
            ["Innstillinger", false],
          ].map(([label, active]) => (
            <div
              key={label as string}
              className={`rounded-md px-3 py-2 ${active ? "bg-white font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-900/10" : "hover:bg-white/60"}`}
            >
              {label as string}
            </div>
          ))}
        </aside>

        <div className="px-8 py-7">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Forsikring</span>
            <span aria-hidden="true">›</span>
            <span>Innboforsikring</span>
            <span aria-hidden="true">›</span>
            <span>Betaling</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Betalingen mislyktes</h2>
          <p className="mt-1 text-sm text-slate-600">Innboforsikring · Kari Nordmann</p>

          <div className="mt-7 space-y-6">
            <div className="flex gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-4">
              <ShieldAlert className="mt-0.5 size-5 shrink-0 text-rose-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-rose-900">
                  Betalingen for innboforsikringen gikk ikke gjennom
                </p>
                <p className="mt-1 text-xs leading-relaxed text-rose-700/90">
                  Trekket på 189 kr den 28.04 ble avvist av kortutsteder. Hvis beløpet ikke blir betalt, kan dekningen
                  på avtalen falle bort.
                </p>
              </div>
            </div>

            <section className="overflow-hidden rounded-lg border border-slate-200">
              <DetailRow label="Forsikring" value="Innbo Standard" />
              <DetailRow label="Avtalenummer" value="INB-20455" />
              <DetailRow label="Månedsbeløp" value="189 kr" last />
            </section>

            <section>
              <p className="text-sm font-semibold text-slate-900">Hva vil du gjøre?</p>
              <div className="mt-3 grid grid-cols-5 gap-3">
                {actions.map((a) => {
                  const Icon = a.icon
                  const selected = chosen === a.id
                  return (
                    <button
                      key={a.id}
                      type="button"
                      disabled={!interactive}
                      onClick={() => handleAction(a.id)}
                      className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border px-2 py-4 text-xs font-medium transition-colors disabled:cursor-not-allowed ${
                        selected
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Icon
                        className={`size-5 ${selected ? "text-emerald-700" : "text-slate-500"}`}
                        aria-hidden="true"
                      />
                      {a.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Phone className="size-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span>
                Spørsmål om saken? Ring Kronkrøll kundeservice på{" "}
                <button
                  type="button"
                  disabled={!interactive}
                  className="cursor-pointer font-semibold text-emerald-800 hover:underline disabled:cursor-not-allowed disabled:no-underline"
                >
                  04999
                </button>
                .
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between bg-slate-50 px-4 py-2.5 text-sm ${last ? "" : "border-b border-slate-200"}`}
    >
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  )
}

export default Interface
