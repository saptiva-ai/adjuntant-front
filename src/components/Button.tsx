"use client"

import {
  Button as NextUiButton,
  ButtonProps as NextUiButtonProps,
} from "@nextui-org/react"
import React, { Fragment, useState } from "react"
import clsx from "clsx"

type ButtonProps = {
  className?: string
  isPressedClasses?: {
    true: string
    false: string
  }
  isHoveredChildren: () => React.ReactNode
  children: React.ReactNode
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
} & Pick<NextUiButtonProps, "variant" | "size" | "isIconOnly">

/**
 * @link https://heroicons.com/outline
 */
export default function Button({
  className,
  isPressedClasses,
  onClick,
  size,
  variant,
  isIconOnly,
  isHoveredChildren,
  children,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressedClass, setIsPressed] = useState(false)

  const iconClasses = clsx(
    className,
    !isPressedClass && isPressedClasses?.false,
    isPressedClass && isPressedClasses?.true,
  )

  const getIcon = () => {
    if (isHovered) {
      return <div className={iconClasses}>{isHoveredChildren()}</div>
    }

    return <div className={iconClasses}>{children}</div>
  }

  return (
    <NextUiButton
      isIconOnly={isIconOnly}
      variant={variant}
      size={size}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPressStart={() => setIsPressed(true)}
      onPressEnd={() => setIsPressed(false)}
    >
      {getIcon()}
    </NextUiButton>
  )
}
