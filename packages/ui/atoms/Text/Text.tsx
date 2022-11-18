import React from "react"
import { WithDefaultProps } from "../../types"

type TextProps = WithDefaultProps<{
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
}>

export default function Text({ type = 'p', className = '', children }: TextProps) {

  return React.createElement(type, { className }, children)
}