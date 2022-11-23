import Text, { TextProps } from "../../atoms/Text/Text"
import React from "react"
import { IconBaseProps, IconType } from "react-icons"
import { WithDefaultProps } from "../../types"


type TextWithIconProps = WithDefaultProps<{
  icon: IconType
  textProps: TextProps
  iconProps?: (React.Attributes & IconBaseProps)
}>

export default function TextWithIcon({ icon, textProps, children }: TextWithIconProps) {

  const iconProps: IconBaseProps = {
    size: 24,
    className: 'mr-2'
  }

  const iconToRender = React.createElement(icon, iconProps)

  return (
  <span className="flex align-middle">
    {iconToRender}
    <Text {...textProps}>{children}</Text>
  </span>
  )
}