import { verifyToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const decodedToken = await verifyToken(token);

  if (!decodedToken || !decodedToken.User) {
    redirect("/auth"); 
    return null;
  }

  const { User } = decodedToken;

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-lg text-gray-600">
        <span className="font-medium text-gray-800">Email:</span> {User.email}
      </p>
      <p className="text-lg text-gray-600">
        <span className="font-medium text-gray-800">Name:</span> {User.firstname+" "+User.lastname}
      </p>
    </div>
  </div>
  );
}
