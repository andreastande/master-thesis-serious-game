import { Target } from "lucide-react"
import type { Case } from "../cases/types"
import CasePanel from "./CasePanel"
import PreviewFrame from "./PreviewFrame"
import Typewriter from "./Typewriter"

type Props = {
  case_: Case
  onTaskComplete: () => void
}

function Brukermodus({ case_, onTaskComplete }: Props) {
  const Interface = case_.Interface

  return (
    <div className="space-y-8">
      <CasePanel tone="amber" label="Oppgave" icon={<Target className="size-3.5" />}>
        <p className="font-display text-lg leading-snug text-ink-800 italic">
          <Typewriter>{case_.taskBrief}</Typewriter>
        </p>
      </CasePanel>

      <PreviewFrame previewPath={case_.previewPath}>
        <Interface mode="brukermodus" onTaskComplete={onTaskComplete} />
      </PreviewFrame>
    </div>
  )
}

export default Brukermodus
