import { DashboardLayout } from './DashboardLayout';

const restaurantNavigation = [
  { label: 'Dashboard', to: '/restaurant/dashboard' },
  { label: 'Products', to: '/restaurant/products' },
  { label: 'Orders', to: '/restaurant/orders' },
];

export function RestaurantLayout() {
  return (
    <DashboardLayout
      title="Restaurant Panel"
      navigationItems={restaurantNavigation}
    />
  );
}
