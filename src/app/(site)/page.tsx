import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const authUser = await auth();
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Project vente pos (by Bienfait shomari)</h1>
        <h2>{authUser?.user?.name}</h2>
        <Link href="/dashboard" className="underline underline-offset-4">
          dashboard
        </Link>
      </div>
    </div>
  );
}
