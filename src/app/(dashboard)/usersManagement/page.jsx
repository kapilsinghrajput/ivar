import UserManagementComp from "@/components/userManagement/UserManagementComp";

// Fetching data on the server side
const baseUrl = process.env.NEXT_PUBLIC_API_URL
async function fetchUserAdmins() {
  const response = await fetch(`${baseUrl}/api/SuperAdminRegister`, {
    method: "GET",
    cache: "no-store", // To prevent caching
  });
  const admindata = await response.json();
  return admindata?.data || [];
}

export default async function UsersPage() {
  const datalist = await fetchUserAdmins();

  return <UserManagementComp datalist={datalist} />;
}
