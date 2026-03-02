import RegionGuidePage from "@/components/Share/RegionGuidePage";
import { regionGuides } from "@/data/regionGuides";

export default function AmericasPage() {
  return <RegionGuidePage data={regionGuides.americas} />;
}
