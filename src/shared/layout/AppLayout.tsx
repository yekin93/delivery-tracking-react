import { NavLink, Outlet } from 'react-router-dom';

const navigationItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Restaurants', to: '/restaurants' },
  { label: 'Couriers', to: '/couriers' },
  { label: 'Deliveries', to: '/deliveries' },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-4 py-6 md:block">
        <h1 className="px-3 text-lg font-semibold">Delivery Tracking</h1>
        <nav className="mt-8 space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'block rounded-md px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="border-b border-slate-200 bg-white px-4 py-4 md:hidden">
          <h1 className="text-lg font-semibold">Delivery Tracking</h1>
          <nav className="mt-3 flex gap-2 overflow-x-auto">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
