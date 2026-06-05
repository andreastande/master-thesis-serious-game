import type { Case } from "../types"
import Interface from "./Interface"

const case1Bankkort: Case = {
  id: "case1-bankkort",
  categoryId: "oppmerksomhet",
  number: 1,
  title: "Nytt bankkort før reisen",
  patternCardId: "skjult-viktig-info",
  previewPath: "kort/bestill",
  dispatch: {
    ticketId: "#4831",
    receivedLabel: "11.04",
    quote:
      "Jeg bestilte nytt kort før jeg skulle besøke barnebarna. Jeg gikk gjennom skjemaet, bekreftet, og tenkte ikke mer på det. Men kortet kom ikke før jeg var hjemme igjen. Jeg skjønner ikke hvor det glapp — jeg klikket jo på det som sto der.",
    outcome: "Kortet ble levert dag 9. Maria reiste på dag 5.",
  },
  taskBrief:
    "Gå gjennom det samme skjemaet Maria brukte. Du flyr på ferie om 5 dager og trenger nytt bankkort før avreise — velg leveringsmetode og bestill kortet.",
  Interface,
  callouts: [
    { n: 1, position: { top: "50%", left: "44%" }, label: "Valg av leveringsmetode" },
    { n: 2, position: { top: "68%", left: "85%" }, label: "Valg av kortdesign" },
    { n: 3, position: { top: "82%", left: "60%" }, label: "Bekreft bestilling-knappen" },
    { n: 4, position: { top: "91%", left: "36%" }, label: "Leveringstid i småtrykk" },
  ],
  correctCallout: 4,
  mitigationOptions: [
    "Legg leveringstid-informasjonen på en hjelpeside om bankkort.",
    "Gjør bekreftelsesknappen større slik at neste steg blir tydeligere.",
    "Plasser leveringstid-informasjonen ved siden av leveringsmetoden, og gjenta den rett over bekreftelsesknappen.",
  ],
  correctMitigation: 2,
  userImpact: {
    user: {
      name: "Maria, 68",
      firstName: "Maria",
      context:
        "Bruker Kronkrøll til å håndtere hverdagsbank etter at samboeren døde. Setter pris på tydelige frister og forutsigbare flyter.",
    },
  },
}

export default case1Bankkort
