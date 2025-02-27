export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-80px)] mt-[80px] flex items-center justify-center ">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-medium text-black">Loading exhibitions...</p>
      </div>
    </div>
  )
}

