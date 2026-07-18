'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard, Shirt, Layers, Package, Users, Tag, LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsAdmin } from '@/lib/useIsAdmin';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Shirt },
  { href: '/admin/categories', label: 'Categories', icon: Layers },
  { href: '/admin/orders', label: 'Orders', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/discounts', label: 'Discounts', icon: Tag },
];

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const { isAdmin, checking } = useIsAdmin();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !checking) {
      if (!user) router.replace('/login?redirect=/admin');
      else if (!isAdmin) router.replace('/');
    }
  }, [user, loading, isAdmin, checking, router]);

  if (loading || checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-bone/50">
        Checking admin access...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-bone/50">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 flex flex-col md:flex-row gap-8">
      <aside className="md:w-60 shrink-0">
        <div className="glass rounded-2xl p-4 md:sticky md:top-28">
          <p className="font-display text-xl text-gold px-2 mb-4">Admin Panel</p>
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm whitespace-nowrap transition ${
                    active ? 'bg-gold text-ink font-semibold' : 'text-bone/70 hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} /> {label}
                </Link>
              );
            })}
            <button
              onClick={() => logout().then(() => router.push('/'))}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-bone/50 hover:bg-white/5 transition mt-2"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </nav>
        </div>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
