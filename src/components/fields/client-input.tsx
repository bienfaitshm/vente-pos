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
import { ClientForm, useClientForm } from "../forms/client-form";
import { ButtonLoader } from "../button-loader";
import { useCreateClient } from "@/hooks/mutations";
import { SelectClient } from "@/server/db";

interface ClientInputProps {
  clients: SelectClient[];
  value: SelectClient | null;
  onChange: (value: SelectClient | null) => void;
}

export const ClientInput: React.FC<ClientInputProps> = ({
  clients,
  onChange,
  value,
}) => {
  return (
    <div className="w-full flex flex-row gap-2">
      <ClientSelect clients={clients} value={value} onChange={onChange} />
      <ClientDialog onChange={onChange} />
    </div>
  );
};

const ClientSelect: React.FC<ClientInputProps> = ({
  clients,
  onChange,
  value,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      // 1. seleced client
      const newValue = getSelectedClient(clients, parseInt(currentValue));
      // 2. update the value
      onChange(value?.id?.toString() === currentValue ? null : newValue);
      setOpen(false);
    },
    [clients, onChange, value?.id]
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
          {value ? value.name : "Selection du client"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Recherche du client..." className="h-9" />
          <CommandList>
            <CommandEmpty>Aucun client trouve.</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  className="capitalize"
                  key={client.id}
                  value={client.id.toString()}
                  onSelect={handleSelect}
                >
                  {client.name.toLowerCase()}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.id === client.id ? "opacity-100" : "opacity-0"
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

interface ClientDialogProps {
  onChange(value: SelectClient): void;
}

export const ClientDialog: React.FC<ClientDialogProps> = ({ onChange }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const clientFormRef = useClientForm();
  const mutation = useCreateClient({
    onSuccess(reponse) {
      if (!reponse?.data) return;
      onChange(reponse?.data);
      setOpen(false);
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
            <ClientForm ref={clientFormRef} onSubmit={mutation.mutateAsync} />
          </div>
          <DialogFooter>
            <ButtonLoader
              type="button"
              isLoading={mutation.isPending}
              loadingText="Enregristement..."
              onClick={() => {
                clientFormRef.current?.submit();
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

/**
 *
 * @param clients
 * @param value
 * @returns
 */
function getSelectedClient(
  clients: SelectClient[],
  value: number
): SelectClient | null {
  return clients.find((client) => client.id === value) || null;
}
