import fs from "node:fs";
import { default as createReportTemplate } from "docx-templates";
import type { InvoiceDocument } from "./types"


export async function generateInvoiceDocument(invoice: InvoiceDocument) : Promise<Uint8Array<ArrayBufferLike>> {
    const template = fs.readFileSync("invoice-template.docx");
    return await createReportTemplate({
        template,
        data: invoice,
        additionalJsContext: {},
    });
}