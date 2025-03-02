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
  type CommandItem as CommandItemSchemasType,
  CommandItemSchemas,
} from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectProduct } from "@/server/db";
import { cn } from "@/lib/utils";
import { getById } from "../item-quatity-input";

const DEFAULT_VALUE: Partial<CommandItemSchemasType> = {
  quantity: 0,
};

type TSubmitValueParams =
  | {
      isEdit: true;
      index: number;
      value: CommandItemSchemasType;
    }
  | { isEdit: false; value: CommandItemSchemasType };

interface ClientDrawerFormRef {
  open: (initialValues?: CommandItemSchemasType & { index: number }) => void;
  close: () => void;
}
interface ClientDrawerFormProps {
  ref?: React.Ref<ClientDrawerFormRef>;
  onSubmit?: (value: TSubmitValueParams) => void;
  products?: SelectProduct[];
}

/**
 * Component representing a form within a drawer for managing client items.
 *
 * @component
 * @param {ClientDrawerFormProps} props - The properties for the ClientDrawerForm component.
 * @param {React.Ref} props.ref - A reference to the component, used for imperative handle.
 * @param {Array<Product>} props.products - The list of products to be displayed in the form.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 *
 * @returns {JSX.Element} The rendered ClientDrawerForm component.
 *
 * @example
 * <ClientDrawerForm
 *   ref={drawerRef}
 *   products={productList}
 *   onSubmit={handleFormSubmit}
 * />
 *
 * @remarks
 * This component uses a drawer to display a form for adding or editing client items.
 * It utilizes `useItemForm` for form handling and `React.useImperativeHandle` to expose
 * open and close methods for the drawer.
 */

export const ClientDrawerForm: React.FC<ClientDrawerFormProps> = ({
  ref,
  products,
  onSubmit,
}) => {
  const itemForm = useItemForm();
  const [open, setOpen] = React.useState<boolean>(false);
  const [initialValues, setInitialValues] = React.useState<
    (CommandItemSchemasType & { index: number }) | null
  >(null);

  React.useImperativeHandle(
    ref,
    () => ({
      open: (initVal) => {
        // Open the drawer
        if (initVal) {
          setInitialValues(initVal);
        }
        setOpen(true);
      },
      close: () => {
        // Close the drawer
        setOpen(false);
      },
    }),
    []
  );
  const handleSubmit = React.useCallback(
    (value: CommandItemSchemasType) => {
      const _value: TSubmitValueParams = initialValues
        ? { isEdit: true, index: initialValues.index, value }
        : { isEdit: false, value };
      onSubmit?.(_value);
    },
    [initialValues, onSubmit]
  );

  const onOpenChange = React.useCallback((state: boolean) => {
    if (!state) {
      setInitialValues(null);
    }
    setOpen(state);
  }, []);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Items</DrawerTitle>
            <DrawerDescription>Ajoute les produits a vendre.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-10">
            <ItemForm
              initialValues={initialValues || undefined}
              products={products}
              ref={itemForm}
              onSubmit={handleSubmit}
            />
          </div>
          <DrawerFooter>
            <Button
              type="button"
              onClick={() => {
                itemForm.current?.submit();
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

interface ItemFormRef {
  submit(): void;
}
interface ItemFormProps {
  initialValues?: Partial<CommandItemSchemasType>;
  onSubmit?: (value: CommandItemSchemasType) => void;
  ref?: React.Ref<ItemFormRef>;
  products?: SelectProduct[];
}

/**
 * ItemForm component renders a form for managing items with quantity and product selection.
 *
 * @param {ItemFormProps} props - The properties for the ItemForm component.
 * @param {function} props.onSubmit - Callback function to handle form submission.
 * @param {object} [props.initialValues=DEFAULT_VALUE] - Initial values for the form fields.
 * @param {Array} [props.products=[]] - List of products to choose from.
 * @param {React.Ref} props.ref - Reference to expose imperative handle methods.
 *
 * @returns {JSX.Element} The rendered ItemForm component.
 *
 * @component
 *
 * @example
 * const initialValues = { quantity: 1, product: null };
 * const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
 * const handleSubmit = (values) => console.log(values);
 *
 * <ItemForm
 *   onSubmit={handleSubmit}
 *   initialValues={initialValues}
 *   products={products}
 *   ref={formRef}
 * />
 */
const ItemForm: React.FC<ItemFormProps> = ({
  onSubmit,
  initialValues = DEFAULT_VALUE,
  products = [],
  ref,
}) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(CommandItemSchemas),
    defaultValues: initialValues,
  });

  React.useImperativeHandle(
    ref,
    () => ({
      submit() {
        form.handleSubmit((value) => {
          onSubmit?.(value as CommandItemSchemasType);
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
                  onClick={() => {
                    field.onChange(Number(field.value) - 1);
                  }}
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
                    Quantite
                  </FormLabel>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {
                    field.onChange(Number(field.value) + 1);
                  }}
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
        name="product"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Produit</FormLabel>
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
                      ? getById(products, field.value.id.toString())?.name
                      : "Selection Items..."}
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
                      <CommandEmpty>Aucun produit trouvee.</CommandEmpty>
                      <CommandGroup>
                        {products.map((product) => (
                          <CommandItem
                            key={product.id}
                            value={product.id.toString()}
                            onSelect={(currentValue) => {
                              field.onChange(getById(products, currentValue));
                              setOpen(false);
                            }}
                          >
                            {product.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value?.id.toString() ===
                                  product.id.toString()
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

export function useItemForm() {
  return React.useRef<ItemFormRef>(null);
}
export function useClientDrawerForm() {
  return React.useRef<ClientDrawerFormRef>(null);
}
