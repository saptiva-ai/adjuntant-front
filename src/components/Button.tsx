"use client";

import * as R from "ramda";
import {
  Button as NextUiButton,
  ButtonProps as NextUiButtonProps,
} from "@nextui-org/react";
import React, { useState } from "react";
import clsx from "clsx";

type ButtonProps = {
  className?: string;
  isPressedClasses?: {
    true: string;
    false: string;
  };
  isHoveredChildren: () => React.ReactNode;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabledClass?: string;
} & Pick<NextUiButtonProps, "variant" | "size" | "isIconOnly" | "isDisabled">;

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
  isDisabled,
  isDisabledClass,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressedClass, setIsPressed] = useState(false);

  const iconClasses = clsx(
    className,
    isDisabled && isDisabledClass,
    !isPressedClass && isPressedClasses?.false,
    isPressedClass && isPressedClasses?.true,
  );
  const buttonOnClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (isDisabled) return;
    if (!onClick) return;

    onClick(event);
  };
  const buttonOnMouseEnter: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isDisabled) return;

    setIsHovered(true);
  };
  const buttonOnMouseLeave: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isDisabled) return;

    setIsHovered(false);
  };
  const buttonOnPressStart = () => {
    if (isDisabled) return;

    setIsPressed(true);
  };
  const buttonOnMouseEnd = () => {
    if (isDisabled) return;

    setIsPressed(false);
  };
  const getIcon = () => {
    if (R.isNil(isHoveredChildren))
      return <div className={`${iconClasses}`}>{children}</div>;

    if (isHovered) {
      return <div className={iconClasses}>{isHoveredChildren()}</div>;
    }

    return <div className={`${iconClasses}`}>{children}</div>;
  };

  return (
    <NextUiButton
      isIconOnly={isIconOnly}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      onMouseEnter={buttonOnMouseEnter}
      onMouseLeave={buttonOnMouseLeave}
      onPressStart={buttonOnPressStart}
      onPressEnd={buttonOnMouseEnd}
      onClick={buttonOnClick}
    >
      {getIcon()}
    </NextUiButton>
  );
}
