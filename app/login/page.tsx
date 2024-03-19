"use client"

import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from 'next/image'

/*  const { data: session } = useSession(); //Error en este hook
 console.log(session) */

export default function Login() {
  return(
    <h1>
      No anda el login
    </h1>
   /*  <nav className="flex items-center justify-center px-20 text-white">            
       {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <Link href="/dashboard">Dashboard</Link>
          <p>
            {session.user.name} {session.user.email}
          </p>
          {session.user.image && (
            <Image
              src={session.user.image}
              width={100}
              height={100}
              alt="Image of user"
              className="w-10 h-10 rounded-full cursor-pointer"
              />)
          }
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              })
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-2 rounded"
        >
          Sign In
        </button>
      )}
    </nav> */
  )    
};
