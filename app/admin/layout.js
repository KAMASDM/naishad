import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'Admin Panel - Real Estate',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
