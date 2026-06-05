import type { Case } from "../types"
import Interface from "./Interface"

const case5Skadedokumentasjon: Case = {
  id: "case5-skadedokumentasjon",
  categoryId: "hukommelse",
  number: 5,
  title: "Laste opp skadedokumentasjon",
  patternCardId: "skjult-systemstatus",
  previewPath: "forsikring/reise/skade",
  dispatch: {
    ticketId: "#5261",
    receivedLabel: "24.06",
    quote:
      "Jeg lastet opp bilder og kvittering til reiseforsikringssaken. Ingenting endret seg på skjermen, så jeg lastet opp på nytt for å være sikker. Sendte flere ganger. To uker senere kom det melding om at saken manglet dokumentasjon — jeg trodde jeg hadde sendt det fem ganger.",
    outcome: "Saken til Sara ble forsinket med 17 dager fordi dokumentene aldri ble registrert.",
  },
  taskBrief:
    "Gå gjennom den samme opplastingen Sara gjorde. Du skal laste opp bilder og kvittering til en reiseforsikringssak — finn ut om dokumentene faktisk er sendt inn.",
  Interface,
  callouts: [
    { n: 1, position: { top: "46%", left: "62%" }, label: "Listen over påkrevd dokumentasjon" },
    { n: 2, position: { top: "70%", left: "59%" }, label: "Knappen for filopplasting" },
    { n: 3, position: { top: "18%", left: "83%" }, label: "Saksstatusen" },
    { n: 4, position: { top: "92%", left: "76%" }, label: "Innsendingsknappen" },
  ],
  correctCallout: 2,
  mitigationOptions: [
    "Legg til en generell FAQ-lenke om skadedokumenter.",
    "Vis en tydelig statusmelding, en liste over opplastede filer og hva som skjer videre etter opplasting.",
    "Endre fargen på opplastingsknappen etter at den er trykket.",
  ],
  correctMitigation: 1,
  userImpact: {
    user: {
      name: "Sara, 29",
      firstName: "Sara",
      context: "Kom hjem fra ferie der ryggsekken ble stjålet og melder skade på reiseforsikringen.",
    },
  },
}

export default case5Skadedokumentasjon
