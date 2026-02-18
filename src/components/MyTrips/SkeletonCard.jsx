export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md animate-pulse">
      <div className="h-48 bg-[#73C8D2]/30" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 rounded-full bg-gray-200" />
        <div className="h-4 w-1/2 rounded-full bg-gray-200" />
        <div className="h-4 w-1/3 rounded-full bg-gray-200" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 w-1/4 rounded-full bg-gray-200" />
          <div className="h-8 w-20 rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}