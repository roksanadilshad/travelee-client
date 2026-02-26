import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { useRouter } from "next/navigation";


export default function EmptyState() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-[#73C8D2]/20 flex items-center justify-center mb-5 shadow-inner">
        <Plane className="w-10 h-10 text-[#73C8D2]" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-bold text-gray-700 mb-2">No trips yet</h3>

      <p className="text-gray-400 text-sm max-w-xs">
        You have not saved any trips. Start planning your next adventure!
      </p>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
         onClick={() => router.push("/destinations")}
        className="mt-6 px-6 py-2.5 rounded-xl bg-[#0046FF] text-white text-sm font-semibold shadow hover:bg-[#003de0] transition-colors"
      >
        Plan a Trip
      </motion.button>
    </motion.div>
  );
}