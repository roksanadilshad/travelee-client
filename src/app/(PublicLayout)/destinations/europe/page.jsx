import RegionGuidePage from "@/components/Share/RegionGuidePage";
import { regionGuides } from "@/data/regionGuides";

export default function EuropePage() {
  return <RegionGuidePage data={regionGuides.europe} />;
}
