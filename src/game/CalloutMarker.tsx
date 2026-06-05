import type { CalloutPosition } from "../cases/types"

type Props = {
  n: number
  position: CalloutPosition
  label: string
  selected: boolean
  onSelect?: () => void
}

function CalloutMarker({ n, position, label, selected, onSelect }: Props) {
  if (!onSelect) {
    return (
      <div
        aria-hidden="true"
        style={position}
        className="absolute z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass-500 text-base font-bold text-ink-950 shadow-lg ring-4 ring-brass-300 ring-offset-2 ring-offset-white"
      >
        {n}
      </div>
    )
  }

  return (
    <button
      type="button"
      aria-label={`Marker ${n}: ${label}`}
      aria-pressed={selected}
      onClick={onSelect}
      style={position}
      className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full font-bold shadow-lg transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 ${
        selected
          ? "size-12 bg-brass-500 text-base text-ink-950 ring-4 ring-brass-300 ring-offset-2 ring-offset-white"
          : "size-10 bg-brass-400 text-sm text-ink-950 ring-4 ring-white"
      }`}
    >
      {n}
    </button>
  )
}

export default CalloutMarker
