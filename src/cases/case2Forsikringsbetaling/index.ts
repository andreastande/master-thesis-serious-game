import type { Case } from "../types"
import Interface from "./Interface"

const case2Forsikringsbetaling: Case = {
  id: "case2-forsikringsbetaling",
  categoryId: "oppmerksomhet",
  number: 2,
  title: "Forsikringsbetaling som feilet",
  patternCardId: "konkurrerende-handlinger",
  previewPath: "forsikring/innbo/betaling",
  dispatch: {
    ticketId: "#4977",
    receivedLabel: "29.04",
    quote:
      "Betalingen for innboforsikringen min gikk ikke gjennom. Jeg gikk inn for å rette det opp med en gang, gjorde det jeg trodde var riktig, og tenkte ikke mer på det. Noen uker senere fikk jeg brev om at jeg hadde stått uten forsikring i den perioden. Jeg skjønte ikke at noe fortsatt var ugjort.",
    outcome: "Innboforsikringen var uten dekning i 24 dager. Jonas oppdaget det da brevet kom.",
  },
  taskBrief:
    "Du står der Jonas sto. En betaling for innboforsikringen feilet — finn ut hva du bør gjøre for å beholde dekningen.",
  Interface,
  callouts: [
    { n: 3, position: { top: "34%", left: "54%" }, label: "Tittel i feilmeldingen" },
    { n: 2, position: { top: "59%", left: "85%" }, label: "Avtalenummeret" },
    { n: 1, position: { top: "83%", left: "61.5%" }, label: "Raden med handlingsknapper" },
    { n: 4, position: { top: "94%", left: "33%" }, label: "Kontaktlenken nederst" },
  ],
  correctCallout: 1,
  mitigationOptions: [
    "Gjør «Betal nå med nytt kort» til tydelig primærhandling og samle de øvrige valgene under den.",
    "Legg til enda en handlingsknapp, «Mer informasjon», ved siden av de andre valgene i handlingsraden.",
    "Vis alle betalings- og kontaktvalgene side om side i et større og mer oversiktlig rutenett.",
  ],
  correctMitigation: 0,
  userImpact: {
    user: {
      name: "Jonas, 22",
      firstName: "Jonas",
      context: "Førstegangsleietaker som setter opp forsikring og budsjett på egen hånd for første gang.",
    },
  },
}

export default case2Forsikringsbetaling
