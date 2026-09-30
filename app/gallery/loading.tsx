import { GridSkeleton } from "@/components/skeletons/CardSkeleton";

export default function Loading() {
  return (
    <div className="section pt-40">
      <GridSkeleton count={6} />
    </div>
  );
}
