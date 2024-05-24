import { Textarea as NextUiTextArea, TextAreaProps } from "@nextui-org/react"

/**
 *
 * @link https://nextui.org/docs/components/textarea#import
 */
export default function TextArea(
  props: Pick<
    TextAreaProps,
    | "label"
    | "placeholder"
    | "className"
    | "description"
    | "value"
    | "onValueChange"
    | "defaultValue"
    | "errorMessage"
    | "isInvalid"
  >,
) {
  return <NextUiTextArea {...props} />
}
