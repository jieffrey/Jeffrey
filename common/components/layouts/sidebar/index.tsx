import Profile from "./Profile"
import Menu from "./Menu"

export default function Sidebar() {

  return (
    <aside
      className="
      hidden lg:flex
      w-65
      min-h-screen
      border-r
      px-6
      py-10
      flex-col
      "
      data-aos="fade-right"
    >

      <Profile />

      <div className="mt-8">
        {/* <Menu /> */}
      </div>

      <div className="mt-auto text-sm text-neutral-500">
        © 2026 Jeffrey Studios
      </div>

    </aside>
  )
}