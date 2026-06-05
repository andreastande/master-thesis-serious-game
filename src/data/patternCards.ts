import { Activity, AlignJustify, CircleHelp, EyeOff, History, Languages, Layers, Lock, Split } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { CategoryId } from "./categories"

export type PatternCardId =
  | "konkurrerende-handlinger"
  | "visuell-stoy"
  | "skjult-viktig-info"
  | "tung-tekstmasse"
  | "uklare-etiketter"
  | "uforklart-fagsprak"
  | "tapt-kontekst"
  | "skjult-systemstatus"
  | "ingen-vei-tilbake"

export type PatternCard = {
  id: PatternCardId
  categoryId: CategoryId
  category: string
  name: string
  icon: LucideIcon
  tagline: string
  howToSpot: string
  howToFix: string
}

// In-act display order is intentionally chosen so the correct card's position
// does not equal the case's position within its act. Each act uses a distinct
// valid permutation so no cross-act position pattern emerges either.
export const patternCards: PatternCard[] = [
  {
    id: "konkurrerende-handlinger",
    categoryId: "oppmerksomhet",
    category: "Oppmerksomhet og fokus",
    name: "Konkurrerende handlinger",
    icon: Split,
    tagline: "Flere handlinger med lik vekt – uklart hva som er trygt neste steg.",
    howToSpot:
      "Tell handlingsknappene på skjermen og vurder om én av dem tydelig er hovedhandlingen. Hvis flere knapper roper like høyt, konkurrerer de om oppmerksomheten.",
    howToFix:
      "Prioriter én primær handling visuelt. Gjør sekundære valg roligere, grupper relaterte handlinger, og bruk tydelige etiketter som forklarer forskjellen mellom valgene.",
  },
  {
    id: "visuell-stoy",
    categoryId: "oppmerksomhet",
    category: "Oppmerksomhet og fokus",
    name: "Visuell støy",
    icon: Layers,
    tagline: "Mange likestilte elementer kjemper om oppmerksomheten – blikket finner ikke et tydelig startpunkt.",
    howToSpot:
      "Skum grensesnittet i tre sekunder og spør: peker noen elementer seg klart ut, eller virker alt likestilt? Hvis flere ting roper like høyt samtidig, er det visuelle hierarkiet flatt.",
    howToFix:
      "Reduser antall samtidige elementer, etabler tydelig hierarki gjennom størrelse, plassering og luft, og la ett element være det åpenbare visuelle ankeret på siden.",
  },
  {
    id: "skjult-viktig-info",
    categoryId: "oppmerksomhet",
    category: "Oppmerksomhet og fokus",
    name: "Skjult viktig info",
    icon: EyeOff,
    tagline: "Viktig informasjon finnes, men er liten, lavt plassert eller svakt markert.",
    howToSpot:
      "Se etter informasjon brukeren må få med seg før de handler. Spør: ville en bruker raskt lagt merke til dette uten å lete?",
    howToFix:
      "Gi viktig informasjon tydelig plassering og visuell vekt nær handlingen den påvirker. Ikke gjem kritisk informasjon i liten tekst, langt ned på siden eller etter bekreftelsesknappen.",
  },
  {
    id: "tung-tekstmasse",
    categoryId: "forstaelse",
    category: "Forståelse og språk",
    name: "Tung tekstmasse",
    icon: AlignJustify,
    tagline: "Lange, formelle setninger og tette avsnitt gjør det vanskelig å fange opp det viktige.",
    howToSpot:
      "Skum teksten i ti sekunder og spør: kan du raskt peke ut hva brukeren skal forstå eller gjøre? Se etter lange setninger, byråkratisk tone og avsnitt uten luft mellom seg.",
    howToFix:
      "Bruk kortere setninger, del innholdet med overskrifter og punktlister, og løft det viktigste først. Skriv klarspråk og fjern juridisk eller byråkratisk fyll som ikke trengs for å forstå valget.",
  },
  {
    id: "uklare-etiketter",
    categoryId: "forstaelse",
    category: "Forståelse og språk",
    name: "Uklare etiketter",
    icon: CircleHelp,
    tagline: "Knappetekst eller etiketter som kan tolkes på flere måter.",
    howToSpot:
      "Spør om en førstegangsbruker ville forstå konsekvensen av handlingen uten ekstra forklaring. Ord som «Avbryt», «Send» og «Fortsett» kan være uklare når konteksten er tvetydig.",
    howToFix:
      "Bruk spesifikke etiketter som beskriver handlingen og konsekvensen, for eksempel «Stopp sparetrekk» eller «Forkast endringer» i stedet for bare «Avbryt».",
  },
  {
    id: "uforklart-fagsprak",
    categoryId: "forstaelse",
    category: "Forståelse og språk",
    name: "Uforklart fagspråk",
    icon: Languages,
    tagline: "Fagord eller forkortelser brukes uten forklaring.",
    howToSpot:
      "Se etter begreper som kan være vanlige for utviklere, banker eller forsikringsselskaper, men ikke for kunden. Spør: kan brukeren ta et trygt valg uten å slå opp ordet?",
    howToFix:
      "Bruk klarspråk der det er mulig. Når fagbegreper er nødvendige, forklar dem kort i kontekst med hjelpetekst, eksempler eller en enkel definisjon.",
  },
  {
    id: "tapt-kontekst",
    categoryId: "hukommelse",
    category: "Hukommelse og kontekst",
    name: "Tapt kontekst",
    icon: History,
    tagline: "Tidligere valg eller info er ikke synlig når brukeren trenger den.",
    howToSpot:
      "Følg med på informasjon som presenteres tidlig i flyten. Sjekk om den fortsatt er synlig når brukeren skal bekrefte, sammenligne eller velge.",
    howToFix:
      "Bær viktig informasjon videre med oppsummeringer, faste referanser eller synlige valg i senere steg. Ikke tving brukeren til å stole på hukommelsen.",
  },
  {
    id: "skjult-systemstatus",
    categoryId: "hukommelse",
    category: "Hukommelse og kontekst",
    name: "Skjult systemstatus",
    icon: Activity,
    tagline: "Brukeren ser ikke hva som skjedde, hvor de er, eller om noe ble lagret.",
    howToSpot:
      "Etter en handling, spør: vet brukeren hva som nettopp skjedde og hva status er nå? Hvis svaret ikke står tydelig på skjermen, er systemstatusen skjult.",
    howToFix:
      "Vis tydelige statusmeldinger, fremdriftsindikatorer, bekreftelser og synlige endringer etter brukerhandlinger.",
  },
  {
    id: "ingen-vei-tilbake",
    categoryId: "hukommelse",
    category: "Hukommelse og kontekst",
    name: "Ingen vei tilbake",
    icon: Lock,
    tagline: "Brukeren kan ikke angre, redigere eller gå tilbake – valget må sitte på første forsøk.",
    howToSpot:
      "Spør etter hver handling: kan brukeren komme tilbake hit og rette opp uten å starte på nytt? Hvis svaret er nei, eller hvis veien tilbake er skjult, mangler det en vei tilbake.",
    howToFix:
      "Tilby tydelig mulighet for å angre eller redigere der det er trygt, vis forhåndsvisning og bekreftelse før irreversible handlinger, og la brukeren navigere mellom steg uten å miste fremgang.",
  },
]

export const cardsForCategory = (id: CategoryId): PatternCard[] => patternCards.filter((c) => c.categoryId === id)

export const getPatternCard = (id: PatternCardId): PatternCard => {
  const card = patternCards.find((c) => c.id === id)
  if (!card) throw new Error(`Unknown pattern card: ${id}`)
  return card
}
