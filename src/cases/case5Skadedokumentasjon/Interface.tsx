import { ArrowLeft, Camera, ChevronRight, Crown, FileText, Loader2, ShieldCheck, UploadCloud, User } from "lucide-react"
import { useState } from "react"
import type { InterfaceProps } from "../types"

function Interface({ mode, onTaskComplete }: InterfaceProps) {
  const interactive = mode === "brukermodus"
  const [uploading, setUploading] = useState(false)

  const handleUploadAttempt = () => {
    setUploading(true)
    setTimeout(() => setUploading(false), 700)
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
            <span>Reiseforsikring</span>
            <span aria-hidden="true">›</span>
            <span>Skade SK-3041</span>
          </div>

          <button
            type="button"
            disabled={!interactive}
            className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline disabled:cursor-not-allowed disabled:no-underline"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Tilbake til skadeoversikten
          </button>

          <div className="mt-3 flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div
                  className="flex size-8 items-center justify-center rounded-md bg-amber-100 ring-1 ring-amber-300/50"
                  aria-hidden="true"
                >
                  <FileText className="size-4 text-amber-700" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Last opp dokumentasjon</h2>
              </div>
              <p className="mt-1.5 text-sm text-slate-600">Reiseforsikring · Skade SK-3041 · Innmeldt 18.06</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-300/50">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Pågående
            </span>
          </div>

          <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <header className="flex items-center gap-2 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
              <Camera className="size-4 text-slate-500" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Skadedetaljer</p>
            </header>
            <div className="grid grid-cols-3 divide-x divide-slate-200">
              <DetailCell label="Type" value="Tyveri på reise" />
              <DetailCell label="Sted" value="Lisboa, Portugal" />
              <DetailCell label="Beløp meldt" value="4 200 kr" />
            </div>
          </section>

          <section className="mt-5">
            <p className="text-sm font-semibold text-slate-900">Påkrevd dokumentasjon</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600">
              {[
                "Bilder av bortkomne eiendeler",
                "Politirapport eller anmeldelsesnummer",
                "Originalkvittering der mulig",
                "Reisedokumentasjon (billett, hotell)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <ChevronRight className="mt-0.5 size-3 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-5">
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/40 px-6 py-10 text-center">
              <UploadCloud className="size-9 text-slate-400" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-700">Dra filer hit, eller velg fra datamaskinen</p>
              <button
                type="button"
                disabled={!interactive || uploading}
                onClick={handleUploadAttempt}
                className="inline-flex min-w-[130px] cursor-pointer items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {uploading ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                    Laster opp…
                  </>
                ) : (
                  "Last opp filer"
                )}
              </button>
              <p className="text-[11px] text-slate-500">PDF, JPG, PNG · maks 10 MB per fil</p>
            </div>
          </section>

          <div className="h-16" aria-hidden="true" />

          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3.5">
            <p className="max-w-md text-xs leading-relaxed text-slate-500">
              Skadesaken behandles innen 14 dager etter at all dokumentasjon er mottatt.
            </p>
            <button
              type="button"
              disabled={!interactive}
              onClick={onTaskComplete}
              className="cursor-pointer rounded-lg bg-linear-to-b from-emerald-700 to-emerald-800 px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-md ring-1 ring-emerald-900/30 transition-colors hover:from-emerald-700 hover:to-emerald-900 disabled:cursor-not-allowed disabled:from-emerald-700/70 disabled:to-emerald-800/70"
            >
              Send inn til saken
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3.5">
      <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  )
}

export default Interface
