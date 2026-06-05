import { Toast } from "@base-ui/react/toast"
import { Check } from "lucide-react"

function CtaToastViewport() {
  const { toasts } = Toast.useToastManager()

  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed bottom-6 left-1/2 z-50 flex w-[min(480px,calc(100vw-3rem))] -translate-x-1/2 flex-col gap-2">
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            swipeDirection={[]}
            className="flex items-center gap-4 rounded-xl border border-brass-400/30 bg-ink-800/95 px-5 py-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(210,173,87,0.1)] backdrop-blur transition-all duration-200 data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0"
          >
            <div className="flex flex-1 items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brass-400/15 text-brass-300 ring-1 ring-brass-400/40">
                <Check className="size-4" strokeWidth={2.8} />
              </div>
              <Toast.Title className="text-sm font-semibold text-paper-50">{toast.title}</Toast.Title>
            </div>
            {toast.actionProps && (
              <Toast.Action className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md border border-brass-300/60 bg-linear-to-b from-brass-400 to-brass-500 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.28em] text-ink-950 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500" />
            )}
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

export default CtaToastViewport
