import { Toast } from "@base-ui/react/toast"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import CtaToastViewport from "./game/CtaToastViewport"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toast.Provider>
      <App />
      <CtaToastViewport />
    </Toast.Provider>
  </StrictMode>,
)
