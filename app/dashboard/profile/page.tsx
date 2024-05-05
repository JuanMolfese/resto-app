import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "../../utils/actions/users/fetchs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormEditPass from "../../../components/Profile/form-edit";

export default async function Profile() {

  const user = await getServerSession();
  const data_user = await fetchUserByEmail(user?.user?.email!);

  return (
    <div>
      <p className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Cambio de contraseña
      </p>
      <p className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
        Usuario: {data_user?.[0]?.email}
      </p>
      <FormEditPass user={data_user?.[0]!}/>
    </div>
  )
}