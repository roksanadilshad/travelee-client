import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const InclusionList = () => {
  const { t } = useLanguage();
  // These keys should exist in your JSON translation files
  const items = ["guide", "luxury_stay", "meals", "transfer"]; 
  
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">{t("whats_included")}</h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{t(item)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AccordionSection = ({ titleKey, items }) => {
  const { t } = useLanguage();
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">{t(titleKey)}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <details key={idx} className="bg-white p-4 rounded-lg border border-gray-200 group">
            <summary className="font-semibold cursor-pointer flex items-center justify-between">
              <span>{t("day")} {item.day}: {t(item.titleKey)}</span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">{t(item.descKey)}</p>
          </details>
        ))}
      </div>
    </div>
  );
};