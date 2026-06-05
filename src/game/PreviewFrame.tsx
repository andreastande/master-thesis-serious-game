import { Lock } from "lucide-react"
import type { ReactNode } from "react"

type Props = {
  previewPath: string
  children: ReactNode
  className?: string
}

function PreviewFrame({ previewPath, children, className = "" }: Props) {
  return (
    <div
      className={`relative mx-auto max-w-[860px] rounded-[22px] border border-paper-50/10 bg-linear-to-b from-ink-700/70 to-ink-900/80 p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-paper-300/30">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-linear-to-b from-slate-50 to-slate-100 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-rose-300/80 ring-1 ring-rose-400/50" />
            <span className="size-3 rounded-full bg-amber-300/80 ring-1 ring-amber-400/50" />
            <span className="size-3 rounded-full bg-emerald-300/80 ring-1 ring-emerald-400/50" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-xs ring-1 ring-slate-200">
            <Lock className="size-3 text-slate-400" />
            <span className="text-slate-400">https://</span>
            <span className="font-medium text-slate-700">kronkroll.no</span>
            <span className="text-slate-400">/{previewPath}</span>
          </div>
          <span className="rounded-sm border border-amber-200 bg-amber-100 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.28em] text-amber-800 uppercase">
            Forhåndsvisning
          </span>
        </div>
        <div className="relative bg-white">{children}</div>
      </div>
    </div>
  )
}

export default PreviewFrame
