import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Mission Control",
  robots: { index: false, follow: false },
};

async function login(formData: FormData) {
  "use server";
  const password = formData.get("password") as string;
  const expected = process.env.DASHBOARD_PASSWORD;

  if (!expected || password !== expected) {
    redirect("/dashboard/login?error=1");
  }

  (await cookies()).set("dashboard_auth", expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/dashboard",
  });

  redirect("/dashboard");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-2xl border-2 p-8"
        style={{
          borderColor: "var(--edge-strong)",
          background: "var(--surface-2)",
        }}
      >
        <h1 className="h3 mb-2 text-center">Mission Control</h1>
        <p className="p-text mb-6 text-center text-sm">
          Enter password to view dashboard
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
            Wrong password
          </p>
        )}

        <form action={login}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            required
            className="mb-4 w-full rounded-lg border-2 bg-transparent px-4 py-3 text-sm outline-none transition-colors"
            style={{
              borderColor: "var(--edge-input)",
              color: "var(--foreground)",
            }}
          />
          <button type="submit" className="btn-primary w-full py-3">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
