import case1Bankkort from "./case1Bankkort"
import case2Forsikringsbetaling from "./case2Forsikringsbetaling"
import case3Efaktura from "./case3Efaktura"
import case4Innboforsikring from "./case4Innboforsikring"
import case5Skadedokumentasjon from "./case5Skadedokumentasjon"
import case6Lanesoknad from "./case6Lanesoknad"
import type { Case } from "./types"

export const cases: Case[] = [
  case1Bankkort,
  case2Forsikringsbetaling,
  case3Efaktura,
  case4Innboforsikring,
  case5Skadedokumentasjon,
  case6Lanesoknad,
]
