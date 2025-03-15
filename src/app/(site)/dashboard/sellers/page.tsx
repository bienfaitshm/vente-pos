import { PageClient } from "./page-client";
import { getSellers } from "@/server/actions/account";

export default async function Page() {
  const salers = await getSellers({});
  return (
    <div className="space-y-5">
      <h1>Salers</h1>
      <PageClient data={salers?.data} />
    </div>
  );
}
