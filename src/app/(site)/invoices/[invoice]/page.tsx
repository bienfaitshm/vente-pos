import { Button } from "@/components/ui/button";

interface Invoice {
  id: string;
  date: string;
  customerName: string;
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
}

const invoice: Invoice = {
  id: "INV-001",
  date: "2023-10-01",
  customerName: "John Doe",
  items: [
    { description: "Item 1", quantity: 2, price: 50 },
    { description: "Item 2", quantity: 1, price: 100 },
  ],
  totalAmount: 200,
};
const Page: React.FC = () => {
  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-5">
      <div className="flex justify-between items-center">
        <h1>Invoice</h1>
        <div className="flex gap-2">
          <Button>Telecharger</Button>
          <Button>Imprimer</Button>
          <Button>Envoyer</Button>
        </div>
      </div>
      <div>
        <div>
          <h1>Invoice</h1>
          <div>
            <p>Invoice ID: {invoice.id}</p>
            <p>Date: {invoice.date}</p>
            <p>Customer: {invoice.customerName}</p>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Amount: {invoice.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
