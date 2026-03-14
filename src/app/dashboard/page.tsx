import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Card } from '@/components/ui/neumorphic/Card'
import { Button } from '@/components/ui/neumorphic/Button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const stats = [
    { label: 'Total Products', value: '1,248', icon: '📦', change: '+12%' },
    { label: 'Active Orders', value: '42', icon: '🚚', change: '+5' },
    { label: 'Low Stock', value: '18', icon: '⚠️', change: '-2' },
    { label: 'Total Value', value: '$45.2k', icon: '💰', change: '+8%' },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12 mt-4 px-2">
          <div>
            <h2 className="text-4xl font-extrabold text-foreground mb-2">
              Dashboard
            </h2>
            <p className="text-muted font-medium">Welcome back, {profile?.name || user.email}</p>
          </div>
          <Card variant="inset" className="py-3 px-6 rounded-full flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold capitalize">{profile?.role || 'Staff'} Access</span>
          </Card>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="group hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="text-3xl mb-4">{stat.icon}</div>
              <p className="text-muted text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-foreground">{stat.value}</p>
                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 neu-inset rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    📦
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">Stock Received: MX-452 Laptop</p>
                    <p className="text-xs text-muted font-medium">24 units added to Main Warehouse</p>
                  </div>
                  <span className="text-xs font-bold text-muted">2h ago</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col justify-center items-center text-center p-12">
            <div className="w-24 h-24 neu-inset rounded-full flex items-center justify-center text-4xl mb-6 text-accent">
              🚀
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready for more?</h3>
            <p className="text-muted font-medium mb-8">
              Start managing your warehouses and track real-time stock movements.
            </p>
            <Button variant="accent" className="w-full">
              Manage Warehouse
            </Button>
          </Card>
        </section>
      </main>
    </div>
  )
}
