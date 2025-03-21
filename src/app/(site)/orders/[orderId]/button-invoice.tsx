"use client";

import React, { useCallback } from "react";
import { CheckIcon, Copy } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoader as Button } from "@/components/button-loader";
import { DownloadCloudIcon, Share2Icon } from "lucide-react";
import { useGenerateInvoiceDocument } from "@/hooks/mutations/document";
import {
  byteArrayToBlob,
  copyToClipboard,
  downloadDocumentFile,
} from "@/lib/utils";

const DOCX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

interface ButtonInvoiceProps {
  orderId: string;
}

/**
 * ButtonDownload component allows users to download an invoice document
 * for a specific order. It triggers a mutation to generate the invoice
 * and downloads the file upon successful generation.
 *
 * @component
 * @param {ButtonInvoiceProps} props - The props for the ButtonDownload component.
 * @param {string} props.orderId - The unique identifier of the order for which the invoice is to be downloaded.
 *
 * @returns {JSX.Element} A button element that initiates the invoice download process.
 *
 * @remarks
 * - The component uses the `useGenerateInvoiceDocument` hook to handle the invoice generation process.
 * - The `handleDownload` function is memoized using `useCallback` to optimize performance.
 * - The button displays a loading state with the text "Création en cours..." while the invoice is being generated.
 *
 * @example
 * ```tsx
 * <ButtonDownload orderId="12345" />
 * ```
 *
 * @dependencies
 * - `useGenerateInvoiceDocument`: Custom hook for generating invoice documents.
 * - `downloadDocumentFile`: Utility function to handle file download.
 * - `byteArrayToBlob`: Utility function to convert byte array to a Blob object.
 * - `DOCX_CONTENT_TYPE`: Constant representing the MIME type for DOCX files.
 */
const ButtonDownload: React.FC<ButtonInvoiceProps> = ({ orderId }) => {
  const mutationDownload = useGenerateInvoiceDocument();

  const handleDownload = useCallback(() => {
    mutationDownload.mutate(orderId, {
      onSuccess: (response) => {
        const { data, name } = response?.data || {};
        if (data && name) {
          downloadDocumentFile({
            name,
            data: byteArrayToBlob(data, DOCX_CONTENT_TYPE),
          });
        }
      },
    });
  }, [orderId, mutationDownload]);

  return (
    <Button
      size="sm"
      className="rounded-full"
      isLoading={mutationDownload.isPending}
      loadingText="Création en cours..."
      onClick={handleDownload}
    >
      <DownloadCloudIcon />
      <span>Télécharger</span>
    </Button>
  );
};

/**
 * ButtonShare is a React functional component that renders a button to share a link
 * to an order. When clicked, it opens a dialog containing the shareable link and
 * options to copy it.
 *
 * @component
 * @param {ButtonInvoiceProps} props - The props for the ButtonShare component.
 * @param {string} props.orderId - The unique identifier for the order, used to generate the shareable link.
 *
 * @returns {JSX.Element} A button that opens a dialog for sharing the order link.
 *
 * @example
 * <ButtonShare orderId="12345" />
 *
 * The above example renders a button that, when clicked, opens a dialog with a link
 * to the order with ID "12345".
 */
const ButtonShare: React.FC<ButtonInvoiceProps> = ({ orderId }) => {
  const [copie, setCopie] = React.useState<boolean>();

  const handleCopy = () => {
    copyToClipboard(`https://vente-pos.vercel.app/orders/${orderId}`);
    setCopie(true);
    setTimeout(() => {
      setCopie(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="sm">
          <Share2Icon />
          <span>Partager</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager le lien</DialogTitle>
          <DialogDescription>
            Toute personne ayant ce lien pourra le consulter.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Lien
            </Label>
            <Input
              id="link"
              defaultValue={`https://vente-pos.vercel.app/orders/${orderId}`}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copier</span>
            {copie ? <CheckIcon /> : <Copy />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/**
 * A React functional component that renders a set of buttons for sharing and downloading
 * an invoice associated with a specific order.
 *
 * @component
 * @param {ButtonInvoiceProps} props - The props for the ButtonInvoice component.
 * @param {string} props.orderId - The unique identifier of the order for which the invoice actions are performed.
 * @returns {JSX.Element} A JSX element containing the share and download buttons.
 */
export const ButtonInvoice: React.FC<ButtonInvoiceProps> = ({ orderId }) => (
  <div className="flex items-center justify-end gap-4">
    <ButtonShare orderId={orderId} />
    <ButtonDownload orderId={orderId} />
  </div>
);
