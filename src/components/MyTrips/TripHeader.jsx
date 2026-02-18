import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { headerVariants } from "./tripVariants";

export default function TripHeader({ tripCount }) {
  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8 sm:mb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-0 justify-between">
        <div>
          {/* Label */}
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-[#0046FF] flex items-center justify-center shadow">
              <Plane className="w-4 h-4 text-white" strokeWidth={2} />
            </span>
            <span className="text-xs font-bold tracking-widest text-[#0046FF] uppercase">
              Travel Journal
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl font-extrabold leading-tight"
            style={{ color: "#0046FF", letterSpacing: "-0.03em" }}
          >
            My Trips
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm mt-1">
            {tripCount > 0
              ? `You have ${tripCount} saved trip${tripCount > 1 ? "s" : ""}`
              : "All your adventures in one place"}
          </p>
        </div>

        {/* Trip count pill */}
        {tripCount > 0 && (
          <div
            className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow self-start sm:self-auto"
            style={{ background: "#0046FF" }}
          >
            {tripCount} Trip{tripCount > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Decorative divider */}
      <div className="mt-6 flex items-center gap-3">
        <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-[#0046FF] to-[#73C8D2]" />
        <div className="w-2 h-2 rounded-full bg-[#FF9013]" />
        <div className="h-0.5 w-12 rounded-full bg-[#73C8D2]/40" />
      </div>
    </motion.div>
  );
}