import { CalendarDays, Crown, FileText, Receipt, Repeat, ShieldCheck, User, Zap } from "lucide-react"
import type { InterfaceProps } from "../types"

function Interface({ mode, onTaskComplete }: InterfaceProps) {
  const interactive = mode === "brukermodus"

  const handleAction = () => {
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
            ["Betalinger", true],
            ["Kort", false],
            ["Lån", false],
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
            <span>Betalinger</span>
            <span aria-hidden="true">›</span>
            <span>eFaktura</span>
            <span aria-hidden="true">›</span>
            <span>Fjordkraft</span>
          </div>

          <div className="mt-2 flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div
                  className="flex size-8 items-center justify-center rounded-md bg-amber-100 ring-1 ring-amber-300/50"
                  aria-hidden="true"
                >
                  <Zap className="size-4 text-amber-700" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">eFakturaavtale · Fjordkraft</h2>
              </div>
              <p className="mt-1.5 text-sm text-slate-600">Avtale-ID EFA-7321 · Aktiv siden 03.2023</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-300/40">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Aktiv
            </span>
          </div>

          <div className="mt-6 space-y-5">
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <header className="flex items-center gap-2 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
                <Receipt className="size-4 text-slate-500" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Ny eFaktura mottatt</p>
                <span className="ml-auto rounded-sm bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-800 uppercase">
                  Venter på handling
                </span>
              </header>
              <div className="grid grid-cols-3 divide-x divide-slate-200">
                <DetailCell label="Beløp" value="1 245,50 kr" emphasize />
                <DetailCell label="Forfallsdato" value="28.10.2026" />
                <DetailCell label="KID" value="1234 5678 9012 3" mono />
              </div>
            </section>

            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <header className="flex items-center gap-2 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
                <FileText className="size-4 text-slate-500" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Avtaledetaljer</p>
              </header>
              <div className="grid grid-cols-3 divide-x divide-slate-200">
                <DetailCell
                  label="Forfall"
                  value="Månedlig"
                  hint={
                    <span className="flex items-center gap-1">
                      <Repeat className="size-3" aria-hidden="true" />
                      Auto-fornyes
                    </span>
                  }
                />
                <DetailCell
                  label="Varsling"
                  value="E-post + app"
                  hint={
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3" aria-hidden="true" />2 dager før forfall
                    </span>
                  }
                />
                <DetailCell label="Etablert" value="14.03.2023" hint="Vilkår per 01.01.2026" />
              </div>
            </section>

            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3.5">
              <p className="max-w-md text-xs leading-relaxed text-slate-500">
                eFaktura erstatter papirfaktura fra Fjordkraft. Avtalen videreføres automatisk inntil den avslås.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!interactive}
                  onClick={handleAction}
                  className="cursor-pointer rounded-lg border border-rose-300 bg-rose-50 px-5 py-2.5 text-sm font-bold tracking-wide text-rose-800 shadow-sm transition-colors hover:border-rose-400 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Avslå
                </button>
                <button
                  type="button"
                  disabled={!interactive}
                  onClick={handleAction}
                  className="cursor-pointer rounded-lg bg-linear-to-b from-emerald-700 to-emerald-800 px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-md ring-1 ring-emerald-900/30 transition-colors hover:from-emerald-700 hover:to-emerald-900 disabled:cursor-not-allowed disabled:from-emerald-700/70 disabled:to-emerald-800/70"
                >
                  Betal nå
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCell({
  label,
  value,
  hint,
  emphasize,
  mono,
}: {
  label: string
  value: string
  hint?: React.ReactNode
  emphasize?: boolean
  mono?: boolean
}) {
  return (
    <div className="px-4 py-3.5">
      <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">{label}</p>
      <p
        className={`mt-1 ${emphasize ? "text-base font-bold text-slate-900" : "text-sm font-semibold text-slate-800"} ${mono ? "font-mono tracking-tight" : ""}`}
      >
        {value}
      </p>
      {hint && <div className="mt-1 text-[11px] text-slate-500">{hint}</div>}
    </div>
  )
}

export default Interface
