import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';

const publicNavigation = [
  { label: 'Home', to: '/' },
  { label: 'Restaurants', to: '/restaurants' },
];

export function PublicLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, logoutUser, user } = useAuth();

  function handleLogout() {
    logoutUser();
    navigate('/', { replace: true });
  }

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

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    [
                      'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-100',
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
                        : 'text-slate-700 hover:bg-slate-100',
                    ].join(' ')
                  }
                >
                  Register
                </NavLink>
              </>
            )}

            {isAuthenticated && user && (
              <div className="flex items-center gap-3">
                <span className="whitespace-nowrap text-sm font-medium text-slate-700">
                  {user.firstName} {user.lastName}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="whitespace-nowrap rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                >
                  Logout
                </button>
              </div>
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
