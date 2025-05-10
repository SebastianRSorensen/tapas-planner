export function NorwegianFlag({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm shadow-sm ${className}`}>
      <div className="absolute inset-0 bg-[#BA0C2F]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-4 bg-white"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-4 bg-white"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-2 bg-[#00205B]"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-2 bg-[#00205B]"></div>
      </div>
    </div>
  )
}
