import { useState } from "react";

export function useDialogAction<Data>() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Data | undefined>(undefined);

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleOpenDialog = (value: Data) => {
    setValue(value);
    setOpen(true);
  };

  //
  const onOpenChange = (_open: boolean) => {
    if (!_open) {
      setValue(undefined);
    }
    setOpen(_open);
  };
  return {
    value,
    open,
    onOpenChange,
    handleCloseDialog,
    handleOpenDialog,
  };
}
