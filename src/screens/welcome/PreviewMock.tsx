import { Crown, User } from "lucide-react"

function Callout({ n, className }: { n: number; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute flex size-9 items-center justify-center rounded-full bg-brass-500 text-sm font-bold text-ink-950 shadow-lg ring-4 ring-paper-50 ${className}`}
    >
      {n}
    </span>
  )
}

function PreviewMock() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-violet-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 -z-10 size-64 rounded-full bg-violet-300/40 blur-3xl"
      />

      <div className="mt-10 rotate-[2.5deg] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5">
        <div className="text-[11px]">
          <div className="flex h-10 items-center gap-2 border-b border-emerald-900/10 bg-linear-to-b from-emerald-50/40 to-white px-4">
            <div className="flex size-6 items-center justify-center rounded-md bg-linear-to-br from-emerald-700 to-emerald-900 shadow-sm ring-1 ring-emerald-900/30">
              <Crown className="size-3 text-amber-300" strokeWidth={2.5} />
            </div>
            <span className="font-serif text-sm leading-none font-semibold tracking-tight text-emerald-950">
              Kron<span className="text-emerald-700">krøll</span>
            </span>
            <div className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-500">
              <User className="size-3 text-slate-500" aria-hidden="true" />
              Kari Nordmann
            </div>
          </div>

          <div className="flex h-95">
            <aside className="w-36 shrink-0 space-y-0.5 border-r border-emerald-900/10 bg-emerald-100/60 px-2 py-3 text-emerald-950/75">
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
                  className={`rounded-md px-2.5 py-1.5 ${active ? "bg-white font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-900/10" : ""}`}
                >
                  {label as string}
                </div>
              ))}
            </aside>

            <div className="flex-1 px-5 py-4">
              <h3 className="text-base font-semibold text-slate-900">Betalinger</h3>

              <div className="mt-4 grid grid-cols-[1fr_150px] gap-4">
                <div className="space-y-2.5">
                  <p className="font-semibold text-slate-900">Betal ny regning</p>
                  <div>
                    <p className="text-[9px] text-slate-500">Fra konto</p>
                    <div className="mt-0.5 rounded-md border border-slate-200 px-2 py-1.5 text-slate-700">
                      Brukskonto · 12 345,-
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500">Til</p>
                    <div className="mt-0.5 rounded-md border border-slate-200 px-2 py-1.5 text-slate-400">
                      Søk mottaker
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[9px] text-slate-500">Beløp</p>
                      <div className="mt-0.5 rounded-md border border-slate-200 px-2 py-1.5 text-slate-700">
                        2 345,-
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500">Forfallsdato</p>
                      <div className="mt-0.5 rounded-md border border-slate-200 px-2 py-1.5 text-slate-700">I dag</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500">Legg til melding (valgfritt)</p>
                  <div className="rounded-md bg-linear-to-b from-emerald-700 to-emerald-800 py-2 text-center text-[11px] font-semibold text-white shadow ring-1 ring-emerald-900/30">
                    Neste
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="rounded-md border border-slate-200 p-2.5">
                    <p className="font-semibold text-slate-900">Hurtighandlinger</p>
                    <ul className="mt-1.5 space-y-1 text-[10px] text-slate-600">
                      <li>Overfør mellom kontoer</li>
                      <li>Avtalebetaling</li>
                      <li>eFaktura</li>
                      <li>Utlandsoverføring</li>
                    </ul>
                  </div>
                  <div className="rounded-md border border-slate-200 p-2.5">
                    <p className="font-semibold text-slate-900">Varsler</p>
                    <p className="mt-1 text-[10px] text-slate-600">Det er endringer i vilkårene dine.</p>
                  </div>
                  <div className="rounded-md border border-amber-300 bg-amber-50 p-2.5">
                    <p className="text-[10px] font-semibold text-amber-900">Viktig informasjon om betalingsgrenser.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Callout n={1} className="top-30 left-40" />
      <Callout n={2} className="top-25 right-10" />
      <Callout n={3} className="right-45 bottom-35" />
    </div>
  )
}

export default PreviewMock
