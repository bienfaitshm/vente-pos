import { getSalers } from "@/server/actions/account";

export default async function Page() {
  const salers = await getSalers({});
  console.log(salers);
  return (
    <div>
      <h1>Salers</h1>
    </div>
  );
}
