import MenuItem from "./MenuItem"
import { MenuType } from "./types"

interface MenuProps {
  list: MenuType[]
}

export default function Menu({ list }: MenuProps) {
  return (
    <nav className="flex flex-col gap-1">

      {list.map((item: MenuType, index: number) => (
        <MenuItem key={index} {...item} />
      ))}

    </nav>
  )
}