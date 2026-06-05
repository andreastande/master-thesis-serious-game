import { BadgeCheck, ChevronRight, Crown, HelpCircle, Landmark, ShieldCheck, User } from "lucide-react"
import { useState } from "react"
import type { InterfaceProps } from "../types"

function Interface({ mode, onTaskComplete }: InterfaceProps) {
  const interactive = mode === "brukermodus"
  const [accepted, setAccepted] = useState(false)

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
            ["Lån", true],
            ["Sparing", false],
            ["Forsikring", false],
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
            <span>Lån</span>
            <span aria-hidden="true">›</span>
            <span>Refinansiering</span>
            <span aria-hidden="true">›</span>
            <span>Bekreftelse</span>
          </div>

          <div className="mt-3 flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div
                  className="flex size-8 items-center justify-center rounded-md bg-emerald-100 ring-1 ring-emerald-300/50"
                  aria-hidden="true"
                >
                  <Landmark className="size-4 text-emerald-700" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bekreft og signer lånesøknad</h2>
              </div>
              <p className="mt-1.5 text-sm text-slate-600">Refinansiering · Søknad LS-7714 · Steg 4 av 4</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-300/50">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              Klar til signering
            </span>
          </div>

          <ol className="mt-5 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
            <li className="flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                ✓
              </span>
              Beløp
            </li>
            <ChevronRight className="size-3 text-slate-300" aria-hidden="true" />
            <li className="flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                ✓
              </span>
              Vilkår
            </li>
            <ChevronRight className="size-3 text-slate-300" aria-hidden="true" />
            <li className="flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                ✓
              </span>
              Nedbetaling
            </li>
            <ChevronRight className="size-3 text-slate-300" aria-hidden="true" />
            <li className="flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white ring-2 ring-emerald-200">
                4
              </span>
              <span className="font-semibold text-emerald-900">Bekreftelse</span>
            </li>
          </ol>

          <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
              <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Sammendrag</p>
              <span className="text-[11px] text-slate-500">Søker: Kari Nordmann</span>
            </header>
            <div className="px-5 py-6">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">Lånebeløp</p>
              <p className="mt-1 font-serif text-4xl font-bold tracking-tight text-slate-900 tabular-nums">
                250 000 kr
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Beløpet overføres til oppgitt konto innen 2 virkedager etter signering.
              </p>
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3.5">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                disabled={!interactive}
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 size-4 cursor-pointer accent-emerald-700 disabled:cursor-not-allowed"
              />
              <span>
                Jeg bekrefter at jeg har lest{" "}
                <span className="font-semibold text-emerald-800 underline-offset-2 hover:underline">
                  låneavtalen og vilkårene
                </span>{" "}
                og signerer søknaden elektronisk.
              </span>
            </label>
          </section>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={!interactive}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline disabled:cursor-not-allowed disabled:no-underline"
            >
              <HelpCircle className="size-3.5" aria-hidden="true" />
              Snakk med rådgiver om søknaden
            </button>
            <button
              type="button"
              disabled={!interactive}
              onClick={onTaskComplete}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-linear-to-b from-emerald-700 to-emerald-800 px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-md ring-1 ring-emerald-900/30 transition-colors hover:from-emerald-700 hover:to-emerald-900 disabled:cursor-not-allowed disabled:from-emerald-700/70 disabled:to-emerald-800/70"
            >
              <ShieldCheck className="size-4" aria-hidden="true" />
              Signer med BankID
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interface
