import { StockFormDialog } from "@/components/dialogs/stock-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographySmall } from "@/components/ui/typography";
import { PencilIcon } from "lucide-react";

const arrs = new Array(10).fill(0).map((_, index) => index);

export default async function StockPage() {
  return (
    <div>
      <div className="grid gap-2 md:grid-cols-4 md:gap-4">
        {arrs.map((i) => (
          <div
            key={i}
            className="flex flex-col gap-4 p-3 rounded-xl bg-muted-foreground/10"
          >
            <div className="flex items-center justify-between">
              <TypographySmall className="text-muted-foreground text-xs">
                Product Name
              </TypographySmall>
              <Badge className="text-xs rounded-full">Enstock</Badge>
            </div>
            <div className="flex items-center justify-between">
              <TypographyH3>90</TypographyH3>
              <StockFormDialog type="UPDATE">
                <Button variant="outline" size="icon" className="rounded-full">
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </StockFormDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
