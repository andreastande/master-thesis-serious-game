import { Crown, Home, ShieldCheck, User } from "lucide-react"
import { useState } from "react"
import type { InterfaceProps } from "../types"

type PlanId = "mini" | "standard" | "pluss"

type Plan = {
  id: PlanId
  name: string
  price: string
}

type CoverageRow = {
  term: string
  mini: string
  standard: string
  pluss: string
}

const plans: Plan[] = [
  { id: "mini", name: "Innbo Mini", price: "129 kr" },
  { id: "standard", name: "Innbo Standard", price: "189 kr" },
  { id: "pluss", name: "Innbo Pluss", price: "279 kr" },
]

const coverage: CoverageRow[] = [
  { term: "Egenandel", mini: "8 000 kr", standard: "6 000 kr", pluss: "4 000 kr" },
  { term: "Sumbegrensning innbo", mini: "750 000 kr", standard: "1 500 000 kr", pluss: "3 000 000 kr" },
  { term: "Underforsikring", mini: "Standard vurdering", standard: "Standard vurdering", pluss: "Utvidet vurdering" },
  { term: "Rettshjelp", mini: "Begrenset", standard: "Inkludert", pluss: "Inkludert · utvidet" },
]

function Interface({ mode, onTaskComplete }: InterfaceProps) {
  const [chosen, setChosen] = useState<PlanId | null>(null)
  const [postnr, setPostnr] = useState("")
  const interactive = mode === "brukermodus"

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
            <span>Velg dekning</span>
          </div>

          <div className="mt-2 flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div
                  className="flex size-8 items-center justify-center rounded-md bg-emerald-100 ring-1 ring-emerald-300/50"
                  aria-hidden="true"
                >
                  <Home className="size-4 text-emerald-700" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Velg innboforsikring</h2>
              </div>
              <p className="mt-1.5 text-sm text-slate-600">Sammenlign dekning og velg pakke for ny leilighet</p>
            </div>
          </div>

          <section className="mt-6 flex items-end justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3.5">
            <div className="flex-1">
              <label htmlFor="postnr" className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                Postnummer for leiligheten
              </label>
              <input
                id="postnr"
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={postnr}
                disabled={!interactive}
                onChange={(e) => setPostnr(e.target.value.replaceAll(/\D/g, ""))}
                placeholder="0184"
                className="mt-1 block w-32 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-inner placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>
            <p className="max-w-sm text-right text-xs leading-relaxed text-slate-500">
              Pris justeres etter postnummer og boligtype. Prisene under er veiledende for leilighet.
            </p>
          </section>

          <section className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] divide-x divide-slate-200 border-b border-slate-200 bg-slate-50/70">
              <div className="px-4 py-3 text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                Pakke
              </div>
              {plans.map((p) => (
                <div key={p.id} className="px-4 py-3">
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] divide-x divide-slate-200 border-b border-slate-200">
              <div className="px-4 py-3.5">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">Pris per måned</p>
              </div>
              {plans.map((p) => (
                <div key={p.id} className="flex items-baseline gap-1 px-4 py-3.5">
                  <span className="text-base font-bold text-slate-900">{p.price}</span>
                  <span className="text-[11px] text-slate-500">/mnd</span>
                </div>
              ))}
            </div>

            {coverage.map((row, i) => (
              <div
                key={row.term}
                className={`grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] divide-x divide-slate-200 ${
                  i === coverage.length - 1 ? "" : "border-b border-slate-200"
                }`}
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-700">{row.term}</p>
                </div>
                <div className="px-4 py-3 text-sm text-slate-700">{row.mini}</div>
                <div className="px-4 py-3 text-sm text-slate-700">{row.standard}</div>
                <div className="px-4 py-3 text-sm text-slate-700">{row.pluss}</div>
              </div>
            ))}

            <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] divide-x divide-slate-200 border-t border-slate-200 bg-slate-50/50">
              <div className="px-4 py-3 text-xs text-slate-500">Velg pakke</div>
              {plans.map((p) => {
                const selected = chosen === p.id
                return (
                  <div key={p.id} className="px-3 py-3">
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={() => setChosen(p.id)}
                      className={`w-full cursor-pointer rounded-md border px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed ${
                        selected
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200"
                          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {selected ? "Valgt" : "Velg"}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3.5">
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="size-4 text-slate-400" aria-hidden="true" />
              Avtalen kan endres eller sies opp når som helst i nettbanken.
            </p>
            <button
              type="button"
              disabled={!interactive}
              onClick={onTaskComplete}
              className="cursor-pointer rounded-lg bg-linear-to-b from-emerald-700 to-emerald-800 px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-md ring-1 ring-emerald-900/30 transition-colors hover:from-emerald-700 hover:to-emerald-900 disabled:cursor-not-allowed disabled:from-emerald-700/70 disabled:to-emerald-800/70"
            >
              Fortsett til bekreftelse
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interface
