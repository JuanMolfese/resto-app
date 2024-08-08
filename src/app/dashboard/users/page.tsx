"use client"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ItemUser from "@/componentes/Usuario/item-user";
import { useGetUsersQuery } from "@/redux/services/usersApi";
import { useGetRolesQuery } from "@/redux/services/rolesApi";
import Spinner from "@/componentes/spinner";


export default function Users() {


  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUsersQuery();
  const { data: roles, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetRolesQuery();
  
  if (isLoadingUsers || isLoadingRoles) return <Spinner />

  if (isErrorUsers || isErrorRoles) return <div>Error</div>

  return(
    <Table>
      <TableCaption className="caption-top mb-4">Listado de usuarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          {/* <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead> */}
          <TableHead>Rol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user: any) => (
          <ItemUser key={user.id} usuario={user} roles={roles!} />
        ))}
      </TableBody>
    </Table>
  )
};
