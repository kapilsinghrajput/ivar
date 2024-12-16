import { AppSidebar } from "@/components/AppSidebar";
import DashboardMain from "@/components/DashboardMain/DashboardMain";
import UserProvider from "@/context/UserContext";
import { verifyToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const baseUrl = process.env.NEXT_PUBLIC_API_URL

// console.log();



export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // If no token is present, warn and ask user to log in
  if (!token) {
    console.warn("Token is missing.");
    redirect("/auth"); // Redirect to the auth page
    return null;
  }

  let User;
  let RolesData;
  try {
    const result = await verifyToken(token);

    if ( !result?.User) {
      console.warn("Invalid or expired token.");
      redirect("/auth"); // Redirect if the token is invalid
      return null;
    }

    User = result.User;

    if (User.role_id) {
console.log("baseUrl is ===>>", baseUrl);

      const response = await fetch(
        `${baseUrl}/api/adminrole/rolesget/${User.role_id}`
      );
      const res = await response.json();

      RolesData = res.data.roles;
    }
  } catch (error) {
    console.error("Error in token verification:", error);
    redirect("/auth"); // Redirect on verification failure
    return null;
  }

  return (
    <div className="flex h-screen w-[100vw]">
      <UserProvider user={User} roles={RolesData}>
        {/* Sidebar */}
        <div className={`w-64  fixed h-full z-10`}>
          <AppSidebar />
        </div>

        <DashboardMain children={children} />
      </UserProvider>
    </div>
  );
}
