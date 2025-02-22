import { Loader2 } from "lucide-react";

interface AlertDeleteProps {}

export const AlertDelete: React.FC<AlertDeleteProps> = () => {
  return (
    <div className="flex items-center gap-4 w-full rounded-lg border px-4 py-3 text-sm">
      <Loader2 className="h-4 w-4 animate-spin" />
      <h3>Suppression encours...</h3>
    </div>
  );
};
