import { Button as BaseButton } from "@base-ui/react/button"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof BaseButton>

const baseClasses =
  "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:cursor-not-allowed"

function Button({ className, ...props }: Props) {
  return <BaseButton {...props} className={className ? `${baseClasses} ${className}` : baseClasses} />
}

export default Button
