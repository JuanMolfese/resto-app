"use client"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchUserByEmail, fetchUsers, getRoles } from "../../utils/actions/users/fetchs"
import ItemUser from "../../../components/Usuario/item-user";
import { useSession } from "next-auth/react";
import { useGetUsersQuery } from "@/redux/services/usersApi";
import { useGetUserByEmailQuery } from "@/redux/services/usersApi";
import { useGetRolesQuery } from "@/redux/services/rolesApi";
import Spinner from "../../../components/spinner";


export default function Users() {


  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUsersQuery(1);
  const { data: roles, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetRolesQuery(1);
  
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
