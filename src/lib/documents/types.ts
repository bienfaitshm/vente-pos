export interface InvoiceCustomer {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
}

export interface InvoiceItemDetail {
    description: string;
    unitPrice: number | string;
    quantity: number | string;
    totalPrice: number| string;
}

export interface InvoiceDocument {
    invoiceNumber: string;
    invoiceDate: string;
    totalAmount: number | string;
    subTotalAmount: number | string;
    taxeAmount: number | string;
    sellerName: string;
    customer: InvoiceCustomer;
    items: InvoiceItemDetail[];
}
