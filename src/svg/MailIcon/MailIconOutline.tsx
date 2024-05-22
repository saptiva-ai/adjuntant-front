"use client"

import { Button as NextUiButton, ButtonProps as NextUiButtonProps } from "@nextui-org/react"
import React, { Fragment, useState } from "react"
import clsx from "clsx"

type MailIconOutlineProps = {
  className?: string
  isPressedClasses: {
    true: string,
    false: string
  }
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
} & Pick<NextUiButtonProps, "variant" | "size" | "isIconOnly">

/**
 * @link https://heroicons.com/outline
 */
export default function MailIconOutline({
  className,
  isPressedClasses,
  onClick,
  size,
  variant,
  isIconOnly
}: MailIconOutlineProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressedClass, setIsPressed] = useState(false)

  const iconClasses = clsx(
    className,
    !isPressedClass && isPressedClasses.false,
    isPressedClass && isPressedClasses.true,
  )

  const getIcon = () => {
    if (isHovered) {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className={iconClasses}
        >
          <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
        </svg>
      )
    }

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={iconClasses}
        onClick={onClick}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
        />
      </svg>
    )
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
