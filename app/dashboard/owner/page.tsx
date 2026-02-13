import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function OwnerDashboard() {
  // Server-side Route Protection
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  
  if (!token) redirect("/login");
  
  const user = verifyToken(token.value);
  if (!user || (user as any).role !== "OWNER") redirect("/login");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>
      <p className="mt-4">Welcome, {(user as any).name}. Manage your hotels here.</p>
      {/* Hotel Management Interface will go here in Phase 2 */}
    </div>
  );
}