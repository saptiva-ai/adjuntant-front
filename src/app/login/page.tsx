import Login from "../../components/Login";
import { authOptions } from "../../../lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/toolhub");
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-black">
      <Login />
    </main>
  );
}