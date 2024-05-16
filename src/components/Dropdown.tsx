"use client"

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import React, { useState } from "react"

type Item = {
  id: string
  label: string
}

type DropdownProps = {
  items: Item[]
}

export default function DropdownProps({ items }: DropdownProps) {
  const firsChoice = () => items.map(({ id }) => id).at(0)!
  const [selectedKeys, setSelectedKeys] = useState([firsChoice()])
  const selectedKey = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  )

  return (
    <Dropdown>
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
      >
        {items.map(item => (
          <DropdownItem key={item.id}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
