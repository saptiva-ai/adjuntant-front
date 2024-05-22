import { InputProps, Input as NextUiInput } from "@nextui-org/react"
import React from "react"

/**
 * @link https://nextui.org/docs/components/input#installation
 */
export default function Input(
  props: Pick<
    InputProps,
    "type" | "placeholder" | "labelPlacement" | "endContent" | "onValueChange"
  >,
) {
  return <NextUiInput {...props} />
}
