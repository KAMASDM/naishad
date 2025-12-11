'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 overflow-y-auto">
          <div className="p-8 pt-20 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
