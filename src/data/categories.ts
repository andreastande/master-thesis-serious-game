import { cases } from "../cases"
import type { Case } from "../cases/types"

export type CategoryId = "oppmerksomhet" | "forstaelse" | "hukommelse"

export type CategoryRecap = {
  takeaway: string
  contrast: string
  rule: string
}

export type CategoryMeta = {
  id: CategoryId
  title: string
  expectedCases: number
  recap: CategoryRecap
}

export const categories: CategoryMeta[] = [
  {
    id: "oppmerksomhet",
    title: "Oppmerksomhet og fokus",
    expectedCases: 2,
    recap: {
      takeaway: "Oppmerksomhetsbarrierer oppstår når grensesnittet ikke hjelper brukeren å se hva som er viktigst.",
      contrast:
        "Skjult viktig info handler om informasjon som finnes, men er lett å overse. Konkurrerende handlinger handler om valg som kjemper om å være viktigst. Visuell støy handler om at hele grensesnittet er flatt – ingenting trer fram som viktigere enn noe annet.",
      rule: "Før du sier deg ferdig med et grensesnitt, spør: hva er det viktigste brukeren må se eller gjøre her – og kommer det tydelig frem i designet?",
    },
  },
  {
    id: "forstaelse",
    title: "Forståelse og språk",
    expectedCases: 2,
    recap: {
      takeaway: "Språkbarrierer oppstår når brukeren må tolke uklare ord eller forstå fagbegreper uten hjelp.",
      contrast:
        "Uklare etiketter gjør handlingens konsekvens usikker. Uforklart fagspråk gjør selve innholdet vanskelig å forstå. Tung tekstmasse gjør innholdet uoverkommelig å lese, selv når ordene i seg selv er enkle.",
      rule: "Sjekk om en førstegangsbruker kan forstå både handlingen og begrepene uten å spørre noen.",
    },
  },
  {
    id: "hukommelse",
    title: "Hukommelse og kontekst",
    expectedCases: 2,
    recap: {
      takeaway:
        "Hukommelsesbarrierer oppstår når grensesnittet skjuler status eller tvinger brukeren til å huske tidligere informasjon.",
      contrast:
        "Skjult systemstatus gjør nåsituasjonen uklar. Tapt kontekst gjør tidligere valg usynlige når de trengs. Ingen vei tilbake fjerner muligheten til å rette opp et valg etter at det er tatt.",
      rule: "Etter hver handling og før hver bekreftelse, vis brukeren hvor de er, hva som skjedde, og hvilke valg som gjelder.",
    },
  },
]

export const getCategory = (id: CategoryId): CategoryMeta => {
  const meta = categories.find((c) => c.id === id)
  if (!meta) throw new Error(`Unknown category: ${id}`)
  return meta
}

export const casesForCategory = (id: CategoryId): Case[] =>
  cases.filter((c) => c.categoryId === id).sort((a, b) => a.number - b.number)
