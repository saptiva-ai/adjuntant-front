"use client"

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as NextUiDropdown,
  DropdownMenuProps as NextUiDropdownMenuProps,
} from "@nextui-org/react"
import { useMemo } from "react"

type Item = {
  key: string
  label: string
}

type DropdownProps = {
  items: Item[]
} & Pick<
  NextUiDropdownMenuProps,
  | "selectedKeys"
  | "onSelectionChange"
  | "aria-label"
  | "variant"
  | "selectionMode"
>

/**
 * @link https://nextui.org/docs/components/dropdown
 * @example
 *
 * export default function Home() {
 * const items = [
 *  {
 *    key: "new",
 *    label: "New file",
 *  },
 *  {
 *    key: "copy",
 *    label: "Copy link",
 *  },
 *  {
 *    key: "edit",
 *    label: "Edit file",
 *  },
 *  {
 *    key: "delete",
 *    label: "Delete file",
 *  },
 * ]
 *
 * const firstChoice = () => {
 *  if (R.isEmpty(items)) throw new Error("Item array is empty")
 *
 *  const firstItem = items.slice(0, 1).map(({ key }) => key)
 *
 *  return firstItem
 * }
 *
 * const [selectedKeys, setSelectedKeys] = useState(firstChoice)
 *
 * return (
 *  <main className='flex min-h-screen flex-col items-center justify-between p-24'>
 *    <Dropdown
 *      items={items}
 *      selectedKeys={selectedKeys}
 *      onSelectionChange={setSelectedKeys}
 *    />
 *  </main>
 *)
 *}
 */
export default function Dropdown(props: DropdownProps) {
  const {
    "aria-label": ariaLabel,
    items,
    onSelectionChange,
    selectionMode,
    variant,
    selectedKeys,
  } = props
  const selectedKey = useMemo(
    () => Array.from(selectedKeys as unknown[]).join(", "),
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
        aria-label={ariaLabel}
        variant={variant}
        disallowEmptySelection
        selectionMode={selectionMode}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange as () => void}
        items={items}
      >
        {item => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </NextUiDropdown>
  )
}
