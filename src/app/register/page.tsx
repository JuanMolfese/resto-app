import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import FormPage from "./form";
import { Button } from "@/components/ui/button";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="w-[600px]">
        <FormPage />
      </div>
      <Button variant="secondary">
        <a href="/login">Iniciar sesión</a>
      </Button>
    </section>
  );
}