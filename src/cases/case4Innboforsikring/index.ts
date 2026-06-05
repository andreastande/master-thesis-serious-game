import type { Case } from "../types"
import Interface from "./Interface"

const case4Innboforsikring: Case = {
  id: "case4-innboforsikring",
  categoryId: "forstaelse",
  number: 4,
  title: "Velge innboforsikring",
  patternCardId: "uforklart-fagsprak",
  previewPath: "forsikring/innbo/velg",
  dispatch: {
    ticketId: "#5187",
    receivedLabel: "03.06",
    quote:
      "Jeg skulle velge innboforsikring til ny leilighet — første gang jeg har gjort sånt helt selv. Jeg klikket meg gjennom så godt jeg kunne og tok det som så fornuftig ut for prisen. Da vannskaden kom, dekket forsikringen mye mindre enn jeg trodde.",
    outcome: "Bjørn satt igjen med 18 000 kr i egne kostnader etter vannskaden.",
  },
  taskBrief:
    "Gå gjennom det samme valget Bjørn sto i. Du skal velge innboforsikring for en ny leilighet — finn alternativet som passer uten å betale for mer enn du trenger.",
  Interface,
  callouts: [
    { n: 3, position: { top: "33%", left: "30%" }, label: "Postnummerfeltet" },
    { n: 1, position: { top: "57%", left: "63%" }, label: "Månedspris for Standard" },
    { n: 2, position: { top: "73%", left: "32%" }, label: "Forsikringsbegrepene i venstre kolonne" },
    { n: 4, position: { top: "94%", left: "80%" }, label: "«Fortsett»-knappen" },
  ],
  correctCallout: 2,
  mitigationOptions: [
    "Legg definisjonene i en PDF som kan lastes ned.",
    "Bytt ut alle forsikringsbegrepene med ikoner.",
    "Forklar nødvendige forsikringsbegreper kort i kontekst, med eksempler.",
  ],
  correctMitigation: 2,
  userImpact: {
    user: {
      name: "Bjørn, 56",
      firstName: "Bjørn",
      context: "Skilte seg nylig og flyttet til mindre leilighet. Tok aldri særlig del i forsikringene før.",
    },
  },
}

export default case4Innboforsikring
