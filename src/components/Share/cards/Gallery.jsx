import { motion } from "framer-motion";

export const Gallery = ({ media, city }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    <div className="grid grid-cols-4 gap-3">
      <div className="col-span-3 row-span-2 relative group">
        <img
          src={media.cover_image}
          alt={city}
          className="w-full h-[400px] object-cover rounded-xl"
        />
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {["Nature", "Adventure"].map((tag) => (
            <span key={tag} className="bg-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
      {media.gallery.slice(0, 4).map((img, idx) => (
        <motion.div key={idx} whileHover={{ scale: 1.05 }} className="relative overflow-hidden rounded-xl">
          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-[120px] object-cover" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);