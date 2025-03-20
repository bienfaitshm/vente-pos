"use client";

import React, { useCallback } from "react";
import { ButtonLoader as Button } from "@/components/button-loader";
import { DownloadCloudIcon, Share2Icon } from "lucide-react";
import { useGenerateInvoiceDocument } from "@/hooks/mutations/document";
import { byteArrayToBlob, downloadDocumentFile } from "@/lib/utils";

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
      className="rounded-full"
      isLoading={mutationDownload.isPending}
      loadingText="Création en cours..."
      onClick={handleDownload}
    >
      <DownloadCloudIcon />
      <span>Télécharger la facture</span>
    </Button>
  );
};

export const ButtonInvoice: React.FC<ButtonInvoiceProps> = ({ orderId }) => (
  <div className="flex items-center justify-end gap-4">
    <Button className="rounded-full">
      <Share2Icon />
      <span>Partager</span>
    </Button>
    <ButtonDownload orderId={orderId} />
  </div>
);
