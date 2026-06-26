import { NavLink, Outlet } from 'react-router-dom';

const publicNavigation = [
  { label: 'Home', to: '/' },
  { label: 'Restaurants', to: '/restaurants' },
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' },
];

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="text-lg font-semibold">
            Delivery Tracking
          </NavLink>
          <nav className="flex gap-2 overflow-x-auto">
            {publicNavigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
