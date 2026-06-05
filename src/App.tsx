import { useState } from "react"
import { cases } from "./cases"
import type { CaseAnswer } from "./cases/types"
import { casesForCategory } from "./data/categories"
import type { CategoryId } from "./data/categories"
import CaseFlow from "./game/CaseFlow"
import CaseHub from "./screens/CaseHub"
import FinalSummary from "./screens/FinalSummary"
import Recap from "./screens/Recap"
import Welcome from "./screens/Welcome"

type Screen = "welcome" | "hub" | "case" | "recap" | "final"

const TOTAL_CASES = cases.length

function App() {
  const [screen, setScreen] = useState<Screen>("welcome")
  const [caseId, setCaseId] = useState<string | null>(null)
  const [recapCategoryId, setRecapCategoryId] = useState<CategoryId | null>(null)
  const [results, setResults] = useState<CaseAnswer[]>([])
  const [showHubTutorial, setShowHubTutorial] = useState(false)

  if (screen === "welcome") {
    return (
      <Welcome
        onStart={() => {
          setShowHubTutorial(true)
          setScreen("hub")
        }}
      />
    )
  }

  if (screen === "hub") {
    return (
      <CaseHub
        results={results}
        onStartCase={(id) => {
          setCaseId(id)
          setScreen("case")
        }}
        tutorialOpen={showHubTutorial}
        onTutorialOpenChange={setShowHubTutorial}
      />
    )
  }

  if (screen === "case") {
    const currentCase = cases.find((c) => c.id === caseId)
    if (!currentCase) {
      setScreen("hub")
      return null
    }
    return (
      <CaseFlow
        key={currentCase.id}
        case_={currentCase}
        totalCases={TOTAL_CASES}
        onCaseComplete={(answer) => {
          const nextResults = [...results, answer]
          setResults(nextResults)
          setCaseId(null)

          const categoryCases = casesForCategory(currentCase.categoryId)
          const isLastInCategory = categoryCases.at(-1)?.id === currentCase.id
          if (isLastInCategory) {
            setRecapCategoryId(currentCase.categoryId)
            setScreen("recap")
            return
          }

          setScreen("hub")
        }}
      />
    )
  }

  if (screen === "recap") {
    if (!recapCategoryId) {
      setScreen("hub")
      return null
    }
    const allCasesComplete = cases.every((case_) => results.some((result) => result.caseId === case_.id))
    return (
      <Recap
        key={recapCategoryId}
        categoryId={recapCategoryId}
        continueLabel={allCasesComplete ? "Til sluttrapporten" : "Tilbake til sakshuben"}
        onContinue={() => {
          setCaseId(null)
          setRecapCategoryId(null)
          setScreen(allCasesComplete ? "final" : "hub")
        }}
      />
    )
  }

  return <FinalSummary results={results} />
}

export default App
