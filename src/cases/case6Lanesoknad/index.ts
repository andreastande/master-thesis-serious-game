import type { Case } from "../types"
import Interface from "./Interface"

const case6Lanesoknad: Case = {
  id: "case6-lanesoknad",
  categoryId: "hukommelse",
  number: 6,
  title: "Fullføre lånesøknad",
  patternCardId: "tapt-kontekst",
  previewPath: "lan/refinansiering/bekreftelse",
  dispatch: {
    ticketId: "#5342",
    receivedLabel: "12.07",
    quote:
      "Jeg fylte ut lånesøknaden og gjorde valg underveis — beløp, rentetype, nedbetalingstid. Da jeg kom til siste side, sto bare lånebeløpet der. Jeg trykket send. Da papirene kom hjem, viste det seg at det jeg hadde signert på, ikke var det jeg trodde jeg hadde valgt.",
    outcome: "Mikkel signerte fastrente på 5 år da han egentlig ville ha flytende. Endringen krevde ny søknad.",
  },
  taskBrief:
    "Gå gjennom den samme søknaden Mikkel sendte. Du skal fullføre en lånesøknad — sjekk at vilkårene du valgte tidligere fortsatt stemmer før du sender inn.",
  Interface,
  callouts: [
    { n: 4, position: { top: "23%", left: "40%" }, label: "Sideoverskriften" },
    { n: 1, position: { top: "55%", left: "50%" }, label: "Sammendraget av lånevilkårene" },
    { n: 3, position: { top: "92%", left: "32%" }, label: "Lenken til rådgiver" },
    { n: 2, position: { top: "92%", left: "82%" }, label: "Signeringsknappen" },
  ],
  correctCallout: 1,
  mitigationOptions: [
    "Vis et sammendrag med beløp, rentetype, nedbetalingstid og estimert månedlig kostnad før signering.",
    "La brukeren signere først og se vilkårene i meldinger etterpå.",
    "Legg til en setning «Kontroller vilkårene dine» uten å vise selve verdiene.",
  ],
  correctMitigation: 0,
  userImpact: {
    user: {
      name: "Mikkel, 36",
      firstName: "Mikkel",
      context: "Søker om refinansieringslån for å samle smålån. Vil ha forutsigbare månedlige kostnader.",
    },
  },
}

export default case6Lanesoknad
