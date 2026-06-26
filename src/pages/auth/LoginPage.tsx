import { RoleBasedRedirect } from '../../features/auth/RoleBasedRedirect';
import { getAccessToken } from '../../features/auth/authStorage';

export function LoginPage() {
  if (getAccessToken()) {
    return <RoleBasedRedirect />;
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2 text-sm text-slate-600">
        Login form will be added later.
      </p>
    </section>
  );
}
