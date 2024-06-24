"use client";

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ButtonProps as NextUiButtonProps,
  Dropdown as NextUiDropdown,
  DropdownMenuProps as NextUiDropdownMenuProps,
} from "@nextui-org/react";
import { useMemo } from "react";

type Item = {
  key: string;
  label: string;
};

type DropdownProps = {
  items: Item[];
  buttonClassName?: string;
  buttonVariant?: NextUiButtonProps["variant"];
  dropdownMenuClasses?: string;
} & Pick<
  NextUiDropdownMenuProps,
  | "selectedKeys"
  | "onSelectionChange"
  | "aria-label"
  | "variant"
  | "selectionMode"
>;
export default function Dropdown(props: DropdownProps) {
  const {
    "aria-label": ariaLabel,
    items,
    onSelectionChange,
    selectionMode,
    variant,
    selectedKeys,
    buttonClassName,
    buttonVariant = "bordered",
    dropdownMenuClasses,
  } = props;
  const selectedKey = useMemo(
    () => Array.from(selectedKeys as unknown[]).join(", "),
    [selectedKeys],
  );

  return (
    <NextUiDropdown>
      <DropdownTrigger>
        <Button variant={buttonVariant} className={buttonClassName}>
          {selectedKey}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className={dropdownMenuClasses}
        aria-label={ariaLabel}
        variant={variant}
        disallowEmptySelection
        selectionMode={selectionMode}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
        items={items}
      >
        {item => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </NextUiDropdown>
  );
}
