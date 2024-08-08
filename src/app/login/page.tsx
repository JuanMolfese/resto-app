import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./form";
import { Button } from "@/components/ui/button";



export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="w-[600px]">
        <LoginForm />        
      </div>
      <Button>
        <a href="/register">Register</a>
      </Button>
    </section>
  );
}