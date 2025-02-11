import { signIn } from "@/auth";
export default function Home() {
  return (
    <div className="">
      <h1>Project vente pos (by Bienfait shomari)</h1>
      <div>
        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
        >
          <input type="text" name="email" placeholder="Email" />
          <button type="submit">Signin with Resend</button>
        </form>
      </div>
    </div>
  );
}
