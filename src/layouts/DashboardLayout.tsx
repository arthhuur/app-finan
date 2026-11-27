import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type DashboardLayoutProps = {
  children: ReactNode;
};

const itensMenu = [{ to: "/painel", label: "Visão geral" }];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-60 shrink-0 bg-slate-900 p-6 md:block">
        <p className="text-xl font-bold text-teal-400">Finan</p>

        <nav className="mt-8 flex flex-col gap-1">
          {itensMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
