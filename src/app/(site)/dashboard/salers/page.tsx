import { getSalers } from "@/server/actions/account";
import { PageClient } from "./page-client";

export default async function Page() {
  const salers = await getSalers({});
  return (
    <div className="space-y-5">
      <h1>Salers</h1>
      <PageClient data={salers?.data} />
    </div>
  );
}
