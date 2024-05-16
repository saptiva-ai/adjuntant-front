import {
  Slider as NextUiSlider,
  SliderProps as NextUiSliderProps,
} from "@nextui-org/react"
import React from "react"

type SliderProps = Pick<
  NextUiSliderProps,
  "label" | "step" | "maxValue" | "minValue" | "defaultValue" | "className" | "onChangeEnd"
>

/**
 * @link https://nextui.org/docs/components/slider#installation
 */
export default function Slider(props: SliderProps) {
  return <NextUiSlider {...props} />
}
