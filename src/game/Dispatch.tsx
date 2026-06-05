import { Inbox } from "lucide-react"
import type { Case } from "../cases/types"
import CasePanel from "./CasePanel"
import Typewriter from "./Typewriter"

type Props = {
  case_: Case
  typewriter?: boolean
}

function Dispatch({ case_, typewriter = false }: Props) {
  const { dispatch, userImpact } = case_
  const quote = `“${dispatch.quote}”`

  return (
    <CasePanel tone="slate" label="Klagenotat" icon={<Inbox className="size-3.5" />}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.22em] uppercase">
        <span className="text-ink-500">
          <span className="font-bold text-ink-800">{userImpact.user.name}</span>
          <span className="mx-2 text-ink-400">·</span>
          Sak {dispatch.ticketId}
        </span>
        <span className="text-ink-500">
          Mottatt {dispatch.receivedLabel}
          <span className="mx-2 text-ink-400">·</span>
          Videresendt fra kundeservice
        </span>
      </div>

      <p className="mt-4 font-display text-lg leading-snug text-ink-800 italic">
        {typewriter ? <Typewriter>{quote}</Typewriter> : quote}
      </p>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-ink-600 uppercase">Utfall</span>
        <span className="text-xs text-ink-600">{dispatch.outcome}</span>
      </div>
    </CasePanel>
  )
}

export default Dispatch
