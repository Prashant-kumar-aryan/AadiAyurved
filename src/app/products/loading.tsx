import { LoaderCircle } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex justify-center items-center w-full h-40">
      <LoaderCircle className="w-10 h-10 animate-spin text-muted-foreground" />
    </div>
  );
}
