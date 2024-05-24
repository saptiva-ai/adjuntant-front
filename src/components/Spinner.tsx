import {Spinner as NextUiSpinner, SpinnerProps as NextUiSpinnerProps} from "@nextui-org/react";
import React from "react";

export default function Spinner(props: NextUiSpinnerProps) {
  return (
    <NextUiSpinner {...props}/>
  );
}
