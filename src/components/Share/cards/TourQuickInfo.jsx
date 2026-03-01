import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const TourQuickInfo = ({ destination }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Quick Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">
          {t("tour_info")}
        </h4>
        <div className="space-y-3">
          <InfoRow label={t("duration")} value={destination.duration} />
          <InfoRow label={t("best_time")} value={destination.best_time_to_visit} />
          <InfoRow label={t("group_size")} value={`2-10 ${t("people")}`} />
          <InfoRow label={t("currency")} value={destination.currency} />
          <InfoRow label={t("safety_rating")} value={`${destination.safety_index}/10`} />
        </div>
      </div>

      {/* Languages */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">{t("languages")}</h4>
        <div className="flex flex-wrap gap-2">
          {destination.languages_spoken.map((lang, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Need Help */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">{t("need_help")}</h4>
        <p className="text-sm text-gray-600 mb-3">
          {t("expert_help")}
        </p>
        <a
          href="tel:+1234567890"
          className="text-blue-600 font-semibold text-sm hover:underline"
        >
          {t("call")}: +1 (234) 567-890
        </a>
      </div>
    </div>
  );
};

// Small helper component for the rows
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);