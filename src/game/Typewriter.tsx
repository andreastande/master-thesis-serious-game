import { Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react"

type Props = {
  children: ReactNode
  msPerChar?: number
  startDelay?: number
}

function Typewriter({ children, msPerChar = 20, startDelay = 70 }: Props) {
  let charIndex = 0

  const render = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return Array.from(node).map((ch) => {
        const delay = startDelay + charIndex * msPerChar
        const key = charIndex
        charIndex++
        return (
          <span key={key} aria-hidden="true" className="anim-typewriter" style={{ animationDelay: `${delay}ms` }}>
            {ch}
          </span>
        )
      })
    }
    if (typeof node === "number") return render(String(node))
    if (Array.isArray(node)) {
      return node.map((n, i) => <Fragment key={`f-${i}`}>{render(n)}</Fragment>)
    }
    if (isValidElement(node)) {
      const el = node as ReactElement<{ children?: ReactNode }>
      return cloneElement(el, undefined, render(el.props.children))
    }
    return node
  }

  return (
    <>
      <span className="sr-only">{extractText(children)}</span>
      <span aria-hidden="true">{render(children)}</span>
    </>
  )
}

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (isValidElement(node)) {
    return extractText((node as ReactElement<{ children?: ReactNode }>).props.children ?? "")
  }
  return ""
}

export default Typewriter
