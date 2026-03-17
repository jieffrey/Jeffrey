export default function Profile() {

  return (
    <div className="flex flex-col items-center text-center">

      <img
        src="/avatar.png"
        className="w-20 h-20 rounded-full"
      />

      <h2 className="mt-4 font-semibold text-lg">
        Jeffrey Studios
      </h2>

      <p className="text-sm text-neutral-500">
        Fullstack Developer
      </p>

    </div>
  )
}