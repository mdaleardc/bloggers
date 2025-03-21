"use client";

import AuthContextProvider, { useAuth } from "@/lib/contexts/AuthContext";
import AdminSidebar from "./components/Sidebar";
import { useAdmin } from "@/lib/firebase/admins/read";

export default function AdminLayout({ children }) {
  return (
    <AuthContextProvider>
      <InnerLayout>{children}</InnerLayout>
    </AuthContextProvider>
  );
}

function InnerLayout({ children }) {
  const { user, isLoading: authIsLoading } = useAuth();
  const { isAdmin, isLoading, isError } = useAdmin(user?.uid || null);

  if (authIsLoading || isLoading) {
    return <h2 className="p-4 mt-[7rem] text-center">Loading ...</h2>;
  }
  if (isError) {
    return <p className="p-4 mt-[7rem] text-center">{isError}</p>;
  }
  if (!isAdmin) {
    return <h2 className="p-4 mt-[7rem] text-center">You are not an admin!</h2>;
  }

  return (
    <section className="flex mt-[2rem] pt-4">
    <div className='fixed top-6 z-10'>
      <AdminSidebar />
    </div>
      {children}
    </section>
  );
}