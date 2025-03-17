"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  type DetailOrder,
  type DetailOrderInput,
  DetailOrderInputSchemas,
} from "@/lib/schemas/activities";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectProduct } from "@/server/db";
import { cn } from "@/lib/utils";
import { getById } from "../item-quatity-input";

const DEFAULT_VALUE: Partial<DetailOrderInput> = {
  quantity: 0,
  productId: "",
};

type TSubmitValueParams<T = DetailOrder> =
  | { isEdit: true; index: number; value: T }
  | { isEdit: false; value: T };

interface ClientDrawerFormRef {
  open: (initialValues?: DetailOrderInput & { index: number }) => void;
  close: () => void;
}

interface ClientDrawerFormProps {
  ref?: React.Ref<ClientDrawerFormRef>;
  products?: SelectProduct[];
  onSubmit?: (value: TSubmitValueParams<DetailOrder>) => void;
}

/**
 * A drawer component for managing client order details.
 * Allows users to add or edit products and their quantities.
 */
export const ClientDrawerForm: React.FC<ClientDrawerFormProps> = ({
  ref,
  products,
  onSubmit,
}) => {
  const orderDetailFormRef = useOrderDetailForm();
  const [open, setOpen] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState<
    (DetailOrderInput & { index: number }) | null
  >(null);

  React.useImperativeHandle(
    ref,
    () => ({
      open: (initVal) => {
        if (initVal) setInitialValues(initVal);
        setOpen(true);
      },
      close: () => setOpen(false),
    }),
    []
  );

  const handleSubmit = React.useCallback(
    (inputValue: DetailOrderInput) => {
      const selectedProduct = getById(products || [], inputValue.productId);
      if (!selectedProduct) return;

      const processedValue: DetailOrder = {
        commission: selectedProduct.commission,
        quantity: inputValue.quantity,
        productId: selectedProduct.id,
        unitPrice: selectedProduct.unitPrice,
        productName: selectedProduct.name,
      };

      const submissionPayload: TSubmitValueParams<DetailOrder> = initialValues
        ? { isEdit: true, index: initialValues.index, value: processedValue }
        : { isEdit: false, value: processedValue };

      onSubmit?.(submissionPayload);
    },
    [initialValues, onSubmit, products]
  );

  const onOpenChange = React.useCallback((state: boolean) => {
    if (!state) setInitialValues(null);
    setOpen(state);
  }, []);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Items</DrawerTitle>
            <DrawerDescription>Add products to sell.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-10">
            <OrderDetailForm
              initialValues={initialValues || undefined}
              products={products}
              ref={orderDetailFormRef}
              onSubmit={handleSubmit}
            />
          </div>
          <DrawerFooter>
            <Button
              type="button"
              onClick={() => {
                orderDetailFormRef.current?.submit();
                setOpen(false);
              }}
            >
              Submit
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

interface OrderDetailFormRef {
  submit(): void;
}

interface OrderDetailFormProps {
  initialValues?: Partial<DetailOrderInput>;
  onSubmit?: (value: DetailOrderInput) => void;
  ref?: React.Ref<OrderDetailFormRef>;
  products?: SelectProduct[];
}

/**
 * A form component for managing order details.
 * Allows users to select a product and specify its quantity.
 */
export const OrderDetailForm: React.FC<OrderDetailFormProps> = ({
  onSubmit,
  initialValues = DEFAULT_VALUE,
  products = [],
  ref,
}) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<DetailOrderInput>({
    resolver: zodResolver(DetailOrderInputSchemas),
    defaultValues: initialValues,
  });

  React.useImperativeHandle(
    ref,
    () => ({
      submit() {
        form.handleSubmit((value) => {
          onSubmit?.(value);
        })();
      },
    }),
    [form, onSubmit]
  );

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => field.onChange(Number(field.value) - 1)}
                  disabled={Number(field.value) <= 0}
                >
                  <Minus />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {field.value}
                  </div>
                  <FormLabel className="text-[0.70rem] text-muted-foreground">
                    Quantity
                  </FormLabel>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => field.onChange(Number(field.value) + 1)}
                >
                  <Plus />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="productId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {field.value
                      ? getById(products, field.value)?.name
                      : "Select product..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Items..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No products found.</CommandEmpty>
                      <CommandGroup>
                        {products.map((product) => (
                          <CommandItem
                            key={product.id}
                            value={product.id.toString()}
                            onSelect={(currentValue) => {
                              field.onChange(currentValue);
                              setOpen(false);
                            }}
                          >
                            {product.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === product.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

/**
 * Hook to create a ref for the `OrderDetailForm` component.
 */
export function useOrderDetailForm() {
  return React.useRef<OrderDetailFormRef>(null);
}

/**
 * Hook to create a ref for the `ClientDrawerForm` component.
 */
export function useClientDrawerForm() {
  return React.useRef<ClientDrawerFormRef>(null);
}
