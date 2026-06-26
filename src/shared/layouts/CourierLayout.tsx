import { DashboardLayout } from './DashboardLayout';

const courierNavigation = [
  { label: 'Dashboard', to: '/courier/dashboard' },
];

export function CourierLayout() {
  return (
    <DashboardLayout title="Courier Panel" navigationItems={courierNavigation} />
  );
}
