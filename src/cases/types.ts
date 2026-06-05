import type { ComponentType } from "react"
import type { CategoryId } from "../data/categories"
import type { PatternCardId } from "../data/patternCards"

export type Mode = "brukermodus" | "revisjonsmodus" | "mitigation" | "feedback"

export type CalloutPosition = {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export type Callout = {
  n: number
  position: CalloutPosition
  label: string
}

export type InterfaceProps = {
  mode: Mode
  // Fired once when the player finishes the customer task in brukermodus
  // (typically the click of the primary in-preview CTA). Used to surface the
  // mode-handoff bar.
  onTaskComplete?: () => void
}

export type RecurringUser = {
  name: string
  firstName: string
  context: string
}

export type Dispatch = {
  ticketId: string
  receivedLabel: string
  quote: string
  outcome: string
}

export type Case = {
  id: string
  categoryId: CategoryId
  number: number
  title: string
  patternCardId: PatternCardId
  previewPath: string
  dispatch: Dispatch
  taskBrief: string
  Interface: ComponentType<InterfaceProps>
  callouts: Callout[]
  correctCallout: number
  mitigationOptions: string[]
  correctMitigation: number
  userImpact: {
    user: RecurringUser
  }
}

export type CaseAnswer = {
  caseId: string
  patternCardId: PatternCardId | null
  callout: number | null
  mitigation: number | null
  cardCorrect: boolean
  calloutCorrect: boolean
  mitigationCorrect: boolean
}
