import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState({ email: '', password: '' });
  const router = useRouter();
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });
  }

  return (
    <main>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email address
          <input type="text" name="email" onChange={handleChange} />
        </label>
        <label>
          Password
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
    </main>
  )
}