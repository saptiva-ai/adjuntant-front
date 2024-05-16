"use client"

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as NextUiDropdown,
} from "@nextui-org/react"
import { Dispatch, SetStateAction, useMemo, useState } from "react"

type Item = {
  key: string
  label: string
}

type DropdownProps = {
  items: Item[]
  selectedKeys: string[]
  onSelectionChange: Dispatch<SetStateAction<string[]>>
}

/**
 * @link https://nextui.org/docs/components/dropdown
 */
export default function Dropdown({
  items,
  selectedKeys,
  onSelectionChange,
}: DropdownProps) {
  const selectedKey = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  )

  return (
    <NextUiDropdown>
      <DropdownTrigger>
        <Button variant='bordered' className='capitalize'>
          {selectedKey}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Single selection example'
        variant='flat'
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange as () => void}
        items={items}
      >
        {item => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </NextUiDropdown>
  )
}
