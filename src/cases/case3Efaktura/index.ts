import type { Case } from "../types"
import Interface from "./Interface"

const case3Efaktura: Case = {
  id: "case3-efaktura",
  categoryId: "forstaelse",
  number: 3,
  title: "Avslå dobbel eFaktura",
  patternCardId: "uklare-etiketter",
  previewPath: "betalinger/efaktura/hafslund",
  dispatch: {
    ticketId: "#5104",
    receivedLabel: "17.05",
    quote:
      "Jeg fikk en eFaktura fra Fjordkraft som jeg allerede hadde betalt manuelt. Jeg ville bare avslå den ene fakturaen så jeg ikke betalte dobbelt, og trykket på en knapp. Tre uker senere kom en purring i posten — jeg fikk visst ikke regningen min på eFaktura lenger.",
    outcome: "Fjordkraft-regningen i oktober kom som papirpurring. Tone betalte 250 kr i purregebyr.",
  },
  taskBrief:
    "Gå gjennom siden Tone så. Du har fått en eFaktura fra Fjordkraft som du allerede har betalt manuelt. Du må avslå denne ene fakturaen — men ikke avslå eFakturaavtalen, ellers slutter du å få regningene i nettbanken.",
  Interface,
  callouts: [
    { n: 1, position: { top: "47%", left: "33%" }, label: "Beløp på den nye fakturaen" },
    { n: 2, position: { top: "47%", left: "70%" }, label: "Forfallsdato" },
    { n: 3, position: { top: "92%", left: "76%" }, label: "«Avslå»-knappen" },
    { n: 4, position: { top: "92%", left: "89%" }, label: "«Betal nå»-knappen" },
  ],
  correctCallout: 3,
  mitigationOptions: [
    "Behold «Avslå», men legg til en bekreftelsesdialog «Er du sikker?» før handlingen utføres.",
    "Bytt ut «Avslå» med to spesifikke handlinger: «Avslå denne fakturaen» og «Avslutt eFakturaavtale».",
    "Flytt «Avslå» inn i en nedtrekksmeny så knappen er mindre fremtredende, uten å endre teksten.",
  ],
  correctMitigation: 1,
  userImpact: {
    user: {
      name: "Tone, 45",
      firstName: "Tone",
      context: "Alenemor som lar regningene gå på autopilot. Bruker eFaktura så hun aldri glemmer en forfallsdato.",
    },
  },
}

export default case3Efaktura
