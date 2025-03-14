"use client";

import * as React from "react";
import { Check, ChevronsUpDown, UserPlus2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonLoader } from "../button-loader";
import { CustomerForm, useCustomerForm } from "../forms/client-form";
import { useCreateCustomer } from "@/hooks/mutations";

interface TCustomer {
  id: string;
  name: string;
  phoneNumber?: string | null;
  address?: string | null;
}

interface TCustomerContext {
  customers: TCustomer[];
  addCustomer(customer: TCustomer): void;
}

const CustomerContext = React.createContext<TCustomerContext>({
  customers: [],
  addCustomer() {},
});

export const CustomerInputContainer: React.FC<
  React.PropsWithChildren<{ customers?: TCustomer[] }>
> = ({ customers = [], children }) => {
  const [state, setState] = React.useState<TCustomer[]>(customers);
  /**
   * Adds a new customer to the current state.
   *
   * This function is memoized using `React.useCallback` to ensure that it does not
   * get recreated on every render, improving performance when passed as a prop to
   * child components.
   *
   * @param customer - The customer object of type `TCustomer` to be added to the state.
   */
  const addCustomer = React.useCallback((customer: TCustomer) => {
    setState((prev) => [...prev, customer]);
  }, []);
  return (
    <CustomerContext value={{ customers: state, addCustomer }}>
      {children}
    </CustomerContext>
  );
};

interface CustomerSelectProps {
  value?: string;
  onChange?(customerId?: string): void;
}

/**
 * A React functional component that renders a customer selection dropdown
 * with a searchable list of customers. The component uses a popover to display
 * the list of customers and allows the user to select a customer from the list.
 *
 * @component
 * @param {CustomerSelectProps} props - The props for the `CustomerSelect` component.
 * @param {(value: string | undefined) => void} props.onChange - Callback function triggered when a customer is selected or deselected.
 * @param {string | undefined} props.value - The currently selected customer's ID.
 *
 * @returns {JSX.Element} A dropdown component for selecting a customer.
 *
 * @remarks
 * - The component uses `React.useContext` to access the `CustomerContext` for the list of customers.
 * - The `Popover` component is used to manage the dropdown's visibility.
 * - The `Command` component provides a searchable interface for the customer list.
 *
 * @example
 * ```tsx
 * const handleCustomerChange = (customerId: string | undefined) => {
 *   console.log("Selected customer ID:", customerId);
 * };
 *
 * <CustomerSelect
 *   value={selectedCustomerId}
 *   onChange={handleCustomerChange}
 * />;
 * ```
 *
 * @dependencies
 * - `Popover`, `PopoverTrigger`, `PopoverContent` for dropdown functionality.
 * - `Command`, `CommandInput`, `CommandList`, `CommandItem` for the searchable list.
 * - `Button` for the trigger button.
 * - `ChevronsUpDown`, `Check` for icons.
 *
 * @internal
 * - The `getSelectedCustomer` utility function is used to find the selected customer by ID.
 * - The `cn` utility is used for conditional class names.
 */
export const CustomerSelect: React.FC<CustomerSelectProps> = ({
  onChange,
  value,
}) => {
  const [open, setOpen] = React.useState(false);
  const { customers } = React.useContext(CustomerContext);
  //
  const selectedCustomer: TCustomer | undefined = React.useMemo(
    () => getSelectedCustomer(customers, value),
    [value, customers]
  );
  //
  const handleSelect = React.useCallback(
    (currentValue: string) => {
      onChange?.(currentValue === value ? undefined : value);
      setOpen(false);
    },
    [value, onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? selectedCustomer?.name : "Selection du client"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Recherche du client..." className="h-9" />
          <CommandList>
            <CommandEmpty>Aucun client trouve.</CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.id}
                  onSelect={handleSelect}
                >
                  {customer.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === customer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CustomerInputDialogProps {
  onChange(customerId?: string): void;
}

export const CustomerInputDialog: React.FC<CustomerInputDialogProps> = ({
  onChange,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { addCustomer } = React.useContext(CustomerContext);

  const customerFormRef = useCustomerForm();
  const mutation = useCreateCustomer({
    onSuccess(reponse) {
      if (reponse?.data) {
        addCustomer(reponse.data);
        onChange(reponse.data.id);
        setOpen(false);
      }
    },
  });
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" type="button">
            <UserPlus2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau client</DialogTitle>
            <DialogDescription>Ajouter un nouveau client</DialogDescription>
          </DialogHeader>
          <div>
            <CustomerForm
              ref={customerFormRef}
              onSubmit={mutation.mutateAsync}
            />
          </div>
          <DialogFooter>
            <ButtonLoader
              type="button"
              isLoading={mutation.isPending}
              loadingText="Enregristement..."
              onClick={() => {
                customerFormRef.current?.submit();
              }}
            >
              Enregistrer
            </ButtonLoader>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function getSelectedCustomer(
  customers: TCustomer[],
  customerId?: string
): TCustomer | undefined {
  return customers.find((customer) => customer.id === customerId);
}
