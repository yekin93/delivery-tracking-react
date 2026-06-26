import { DashboardLayout } from './DashboardLayout';

const adminNavigation = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Restaurants', to: '/admin/restaurants' },
];

export function AdminLayout() {
  return (
    <DashboardLayout title="Admin Panel" navigationItems={adminNavigation} />
  );
}
