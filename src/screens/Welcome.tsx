import { Clock, Play, Search } from "lucide-react"
import Button from "../components/ui/Button"
import PreviewMock from "./welcome/PreviewMock"

type Props = {
  onStart: () => void
}

function Welcome({ onStart }: Props) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-ink-950 text-paper-50">
      {/* atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 12% 0%, rgba(120,80,200,0.22), transparent 55%), radial-gradient(80% 60% at 90% 110%, rgba(184,145,57,0.18), transparent 60%), linear-gradient(180deg, #0a0f24 0%, #060919 100%)",
        }}
      />
      <div aria-hidden="true" className="tex-noise pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 240px 40px rgba(0,0,0,0.55)" }}
      />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-10 pt-7">
        <div className="flex items-center gap-3">
          <Sigil />
          <div className="leading-none">
            <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-brass-400 uppercase">
              Kronkrøll · Intern revisjon
            </p>
            <p className="mt-1 text-xs text-ink-200">Sak 01 — Konfidensielt</p>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-10 pt-16 pb-24">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-start gap-32">
          <div className="anim-rise">
            <p className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.32em] text-brass-400 uppercase">
              <span className="h-px w-8 bg-brass-400/60" />
              Et spill om designrevisjon
            </p>

            <h1 className="mt-6 font-display text-[5.5rem] leading-[1.08] font-semibold tracking-tight text-paper-50">
              <span className="block whitespace-nowrap">Tilgjengelighets-</span>
              <span className="text-gold-shimmer relative block w-fit px-2 pb-3 leading-[1.12] italic">
                jakten
                <Search
                  className="absolute top-3 -right-14 size-12 -rotate-12 text-brass-400/80"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="mt-8 max-w-md font-display text-xl leading-snug text-paper-100/90 italic">
              Du er ny designrevisor. Når en klage lander, skal du finne friksjonen ingen andre så.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <Button
                onClick={onStart}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md border border-brass-300/60 bg-linear-to-b from-brass-400 to-brass-500 px-8 py-4 font-mono text-xs font-bold tracking-[0.3em] text-ink-950 uppercase shadow-[0_8px_24px_-8px_rgba(184,145,57,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <Play className="relative size-3" strokeWidth={2.6} />
                <span className="relative">Start spillet</span>
              </Button>

              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-ink-200 uppercase">
                <Clock className="size-3.5 text-brass-300/70" strokeWidth={2} />
                <span>20-30 min</span>
                <span className="text-ink-400">·</span>
                <span>6 saker</span>
              </div>
            </div>
          </div>

          <div className="relative origin-top scale-[0.88]">
            <FolderMock />
          </div>
        </div>
      </section>
    </div>
  )
}

function Sigil() {
  return (
    <div className="relative flex size-10 items-center justify-center rounded-md border border-brass-400/40 bg-linear-to-b from-ink-700 to-ink-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span className="font-display text-lg font-semibold text-brass-300">K</span>
      <span
        aria-hidden="true"
        className="absolute -inset-px rounded-md ring-1 ring-brass-400/20"
        style={{ boxShadow: "0 0 0 1px rgba(210,173,87,0.08), 0 0 24px -8px rgba(210,173,87,0.5)" }}
      />
    </div>
  )
}

function FolderMock() {
  return (
    <div className="relative">
      {/* glow behind folder */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 -z-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(184,145,57,0.35), transparent 70%), radial-gradient(closest-side, rgba(140,90,210,0.35), transparent 70%)",
        }}
      />

      {/* paper layers — stacked manila folders */}
      <div className="absolute top-8 -right-4 h-[460px] w-[88%] rotate-[4deg] rounded-2xl bg-paper-200/90 shadow-2xl" />
      <div className="absolute -top-2 -left-6 h-[460px] w-[90%] -rotate-[3.5deg] rounded-2xl bg-paper-100 shadow-2xl" />

      {/* top folder */}
      <div className="relative rotate-[1.5deg] rounded-2xl bg-paper-50 shadow-2xl ring-1 ring-paper-300/60">
        {/* folder tab */}
        <div className="absolute -top-3 left-10 rounded-t-md bg-brass-500 px-4 py-1 font-mono text-[10px] font-bold tracking-[0.28em] text-ink-950 uppercase shadow">
          Sak 01
        </div>

        <div className="px-7 pt-9 pb-5">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-700 uppercase">Sak · Kronkrøll</p>
            <p className="font-mono text-[10px] tracking-[0.22em] text-ink-500 uppercase">Forhåndsvisning</p>
          </div>

          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-950">
            Bankkort &middot; lansering
          </h3>

          {/* mini preview behind glass */}
          <div className="relative mt-4 overflow-hidden rounded-lg ring-1 ring-ink-200/70">
            <div className="origin-top scale-[0.84]">
              <PreviewMock />
            </div>
            <div className="tex-scanlines pointer-events-none absolute inset-0" />
          </div>

          {/* stamps */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-sm border border-rose-700/40 bg-rose-50 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.22em] text-rose-700 uppercase">
                Ikke godkjent ennå
              </span>
              <span className="rounded-sm border border-ink-300 bg-paper-100 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.22em] text-ink-700 uppercase">
                Krever revisjon
              </span>
            </div>
            <p className="font-display text-xs text-ink-500 italic">— signert ledelsen</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
