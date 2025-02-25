import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, MinusCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemsSelect, ItemsSelectSchemas } from "@/lib/schemas";

interface Product {
  name: string;
  price: number;
  quantity: number;
  category: string | number;
  id?: string | number | undefined;
}

interface ProductItem {
  amount: number;
  quantity: number;
  product: Product;
}

interface ButtonItemQuantityProps {
  icon: React.ReactNode;
  tooltipText: string;
  onClick?(): void;
}

export const ButtonItemQuantity: React.FC<ButtonItemQuantityProps> = ({
  icon,
  tooltipText,
  onClick,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className="h-7 w-7"
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface ProductSelectDialogRef {
  openDialog(): void;
  closeDialog(): void;
}
interface ProductSelectDialogProps {
  products: Product[];
  ref?: React.Ref<ProductSelectDialogRef>;
  items?: ProductItem[];
  onChange?(items: ProductItem[]): void;
}
export const ProductSelectDialog: React.FC<ProductSelectDialogProps> = ({
  ref,
  products,
  onChange,
  items = [],
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(ItemsSelectSchemas),
    defaultValues: { items },
  });
  React.useImperativeHandle(
    ref,
    () => ({
      openDialog() {
        setOpen(true);
      },
      closeDialog() {
        setOpen(false);
      },
    }),
    []
  );

  const handlerSelect = (
    items: ProductItem[],
    product: Product,
    callback: (items: ProductItem[]) => void
  ) => {
    const isExist = isSelectedIn(product.id, items);
    const newItems: ProductItem[] = isExist
      ? items.filter((item) => item.product.id !== product.id)
      : [...items, { amount: 0, quantity: 0, product }];
    callback(newItems);
  };

  const handleSubmit = (data: ItemsSelect) => {
    onChange?.(data.items);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selection du produit</DialogTitle>
          <DialogDescription>
            Cliquer sur le bouton <b>Terminer</b> ajoutera le produit à la liste
            de vente et réinitialisera les articles. Si vous ne souhaitez pas
            modifier le produit inséré, veuillez cliquer sur le bouton{" "}
            <b>Annuler</b>.
          </DialogDescription>
        </DialogHeader>
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <div>
                  <Command>
                    <CommandInput placeholder="Recherche..." />
                    <CommandList>
                      <CommandEmpty>Aucun Resultat.</CommandEmpty>
                      {products.map((product) => (
                        <CommandItem
                          className="capitalize"
                          key={product.id}
                          onSelect={() => {
                            handlerSelect(field.value, product, field.onChange);
                          }}
                        >
                          {product.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              isSelectedIn(product.id, field.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Annuler
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(handleSubmit)}>Terminer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface QuantityIncreaserProps {
  value?: number;
  onChange?(quantity: number): void;
}
export const QuantityIncreaser: React.FC<QuantityIncreaserProps> = ({
  value = 0,
  onChange,
}) => {
  const handlePlus = () => {
    onChange?.(value + 1);
  };
  const handleMinus = () => {
    const newValue = value - 1;
    onChange?.(isNegative(newValue) ? 0 : newValue);
  };
  return (
    <div className="flex items-center gap-5">
      <ButtonItemQuantity
        onClick={handlePlus}
        tooltipText="Diminuer la quantite"
        icon={<MinusCircle className="h-4 w-4" />}
      />
      <div>
        <p>{value}</p>
      </div>
      <ButtonItemQuantity
        onClick={handleMinus}
        tooltipText="Augmenter la quantite"
        icon={<PlusCircle className="h-4 w-4" />}
      />
    </div>
  );
};

export function useProductSelectDialog() {
  return React.useRef<ProductSelectDialogRef>(null);
}

function isSelectedIn(
  id?: number | string,
  items: ProductItem[] = []
): boolean {
  if (!id) return false;
  return !!items.find((item) => item.product.id === id);
}

function isNegative(value: number): boolean {
  return value < 0;
}
