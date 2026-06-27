import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUser } from '../../features/auth/authTypes';
import { useAuth } from '../../features/auth/useAuth';

type UserMenuProps = {
  user: AuthUser;
};

type MenuLink = {
  label: string;
  to: string;
  show: boolean;
};

export function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  const menuLinks: MenuLink[] = [
    {
      label: 'Apply as Restaurant / Courier',
      to: '/apply',
      show: true,
    },
    {
      label: 'My Orders',
      to: '/customer/orders',
      show: true,
    },
    {
      label: 'Admin Panel',
      to: '/admin/dashboard',
      show: user.roles.includes('ADMIN'),
    },
    {
      label: 'Restaurant Panel',
      to: '/restaurant/dashboard',
      show: user.roles.includes('RESTAURANT'),
    },
    {
      label: 'Courier Panel',
      to: '/courier/dashboard',
      show: user.roles.includes('COURIER'),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLogout() {
    logoutUser();
    setIsOpen(false);
    navigate('/', { replace: true });
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-sm font-semibold text-white shadow-sm transition hover:border-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open user menu"
      >
        {initials}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[220px] overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-lg"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="mt-1 truncate text-xs text-slate-500">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            {menuLinks
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            <button
              type="button"
              disabled
              className="block w-full cursor-not-allowed px-4 py-2.5 text-left text-sm font-medium text-slate-500"
            >
              Settings
            </button>
          </div>

          <div className="border-t border-slate-100 py-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-red-700 transition hover:bg-red-50 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
