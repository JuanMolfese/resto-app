import { unstable_noStore } from "next/cache";
import { connection } from "../../models/db";
import { Subrubro } from "../../models/types/subrubro";

export default async function fetchSubrubros() {
  unstable_noStore();
  try {
    const result = await connection.query<Subrubro[]>("SELECT * FROM Subrubro");
    await connection.end();
    return result;
  } catch (error) {
    console.log(error);
  }
}