"use client"

import * as R from "ramda"
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as NextUiDropdown,
} from "@nextui-org/react"
import { useMemo, useState } from "react"

type Item = {
  key: string
  label: string
}

type DropdownProps = {
  items: Item[]
}

/**
 *
 * @link https://nextui.org/docs/components/dropdown
 */
export default function Dropdown({ items }: DropdownProps) {
  /**
   * @returns An array with the first item
   */
  const firstChoice = () => {
    if (R.isEmpty(items)) throw new Error("Item array is empty")

    const firstItem = items.slice(0, 1).map(({ key }) => key)

    return firstItem
  }
  const [selectedKeys, setSelectedKeys] = useState(firstChoice)
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
        onSelectionChange={setSelectedKeys as () => void}
        items={items}
      >
        {item => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </NextUiDropdown>
  )
}
