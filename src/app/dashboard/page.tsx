import { auth } from "@/auth";
export default async function Page() {
  const user = await auth();
  return (
    <div className="flex h-screen justify-center items-center">
      <h1>Dashboard encours...</h1>
      <div>
        <h1>{user?.user.name}</h1>
      </div>
    </div>
  );
}
