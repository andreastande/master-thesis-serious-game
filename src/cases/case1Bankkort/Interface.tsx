import { CreditCard, Crown, MapPin, Truck, User, Zap } from "lucide-react"
import { useState } from "react"
import Button from "../../components/ui/Button"
import type { InterfaceProps } from "../types"

type DeliveryMethod = "standard" | "ekspress"
type CardDesign = "klassisk" | "natur" | "minimal" | "neon"

const designs: { id: CardDesign; label: string; gradient: string }[] = [
  { id: "klassisk", label: "Klassisk", gradient: "from-slate-700 to-slate-900" },
  { id: "natur", label: "Natur", gradient: "from-emerald-800 to-teal-900" },
  { id: "minimal", label: "Minimal", gradient: "from-stone-200 to-stone-400" },
  { id: "neon", label: "Neon", gradient: "from-violet-700 to-fuchsia-900" },
]

function Interface({ mode, onTaskComplete }: InterfaceProps) {
  const [delivery, setDelivery] = useState<DeliveryMethod>("standard")
  const [design, setDesign] = useState<CardDesign>("klassisk")
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
            ["Kort", true],
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
            <span>Kort</span>
            <span aria-hidden="true">›</span>
            <span>Bestill nytt kort</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Bestill nytt bankkort</h2>
          <p className="mt-1 text-sm text-slate-600">Erstatningskort for Kari Nordmann · Brukskonto 1234 56 78901</p>

          <div className="mt-7 space-y-6">
            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <MapPin className="size-4 text-slate-500" /> Leveringsadresse
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span>Storgata 14, 0184 Oslo</span>
                <button
                  type="button"
                  disabled={!interactive}
                  className="cursor-pointer text-xs font-semibold text-emerald-800 hover:underline disabled:cursor-not-allowed disabled:no-underline"
                >
                  Endre
                </button>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Truck className="size-4 text-slate-500" /> Leveringsmetode
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <DeliveryOption
                  selected={delivery === "standard"}
                  onSelect={() => setDelivery("standard")}
                  disabled={!interactive}
                  icon={<Truck className="size-4" />}
                  title="Standard"
                  price="Gratis"
                />
                <DeliveryOption
                  selected={delivery === "ekspress"}
                  onSelect={() => setDelivery("ekspress")}
                  disabled={!interactive}
                  icon={<Zap className="size-4" />}
                  title="Ekspress"
                  price="+99 kr"
                />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <CreditCard className="size-4 text-slate-500" /> Kortdesign
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {designs.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    disabled={!interactive}
                    onClick={() => setDesign(d.id)}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-2 text-xs transition-colors disabled:cursor-not-allowed ${
                      design === d.id
                        ? "border-emerald-600 ring-2 ring-emerald-200"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className={`h-12 w-full rounded-md bg-linear-to-br ${d.gradient}`} aria-hidden="true" />
                    <span className="font-medium text-slate-700">{d.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="pt-2">
              <Button
                disabled={!interactive}
                onClick={onTaskComplete}
                className="w-full rounded-xl bg-linear-to-b from-emerald-700 to-emerald-800 px-6 py-4 text-sm font-bold tracking-[0.14em] text-white uppercase shadow-md ring-1 ring-emerald-900/30 transition-colors hover:from-emerald-700 hover:to-emerald-900 disabled:from-emerald-700/70 disabled:to-emerald-800/70"
              >
                Bekreft bestilling
              </Button>
              <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
                Bestillingen er bindende ved bekreftelse og kan ikke endres etter produksjon. Produksjonsgebyr på 49 kr
                belastes brukskonto. Kortet sendes til folkeregisteradresse med Posten Norge; leveringstid standard 7–10
                virkedager, ekspress 2–3 virkedager regnet fra produksjonsstart. Aktivering skjer første gang kortet
                brukes i minibank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DeliveryOption({
  selected,
  onSelect,
  disabled,
  icon,
  title,
  price,
}: {
  selected: boolean
  onSelect: () => void
  disabled?: boolean
  icon: React.ReactNode
  title: string
  price: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed ${
        selected
          ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-200"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <span className="flex items-center gap-2 font-medium text-slate-900">
        {icon}
        {title}
      </span>
      <span className="text-xs text-slate-500">{price}</span>
    </button>
  )
}

export default Interface
