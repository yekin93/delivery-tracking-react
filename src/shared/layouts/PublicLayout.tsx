import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';
import { UserMenu } from '../components/UserMenu';

const publicNavigation = [
  { label: 'Home', to: '/' },
  { label: 'Restaurants', to: '/restaurants' },
];

export function PublicLayout() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="overflow-visible border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 overflow-visible px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="text-lg font-semibold">
            Delivery Tracking
          </NavLink>
          <nav className="flex flex-wrap items-center gap-2 overflow-visible sm:justify-end">
            {publicNavigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    [
                      'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950',
                    ].join(' ')
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    [
                      'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950',
                    ].join(' ')
                  }
                >
                  Register
                </NavLink>
              </>
            )}

            {isAuthenticated && user && (
              <UserMenu user={user} />
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
