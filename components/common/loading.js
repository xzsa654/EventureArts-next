export default function Loading() {
  return (
    <div className=" relative z-50 min-h-[calc(100vh-80px)] bg-white  flex items-center justify-center ">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-medium text-black">Loading ...</p>
      </div>
    </div>
  )
}
