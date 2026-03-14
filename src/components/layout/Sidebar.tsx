'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/neumorphic/Card'
import { Button } from '@/components/ui/neumorphic/Button'
import { signOut } from '@/app/auth/actions'

export function Sidebar() {
  const menuItems = [
    { label: 'Dashboard', icon: '📊', href: '/dashboard' },
    { label: 'Inventory', icon: '📦', href: '#' },
    { label: 'Warehouses', icon: '🏭', href: '#' },
    { label: 'Transfers', icon: '🔄', href: '#' },
    { label: 'Settings', icon: '⚙️', href: '#' },
  ]

  return (
    <Card className="h-[calc(100vh-2rem)] w-64 p-6 flex flex-col m-4">
      <div className="flex items-center gap-3 mb-10 px-2 mt-4">
        <div className="w-10 h-10 neu-inset flex items-center justify-center text-xl font-bold text-accent">
          C
        </div>
        <span className="text-xl font-bold tracking-tight">Core</span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-medium ${
              item.label === 'Dashboard' ? 'neu-inset text-accent' : 'hover:bg-foreground/5 text-muted hover:text-foreground'
            }`}>
              <span>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-foreground/5">
        <form action={signOut}>
          <Button variant="secondary" className="w-full flex items-center justify-center gap-2 hover:text-red-500">
            Sign Out
          </Button>
        </form>
      </div>
    </Card>
  )
}
