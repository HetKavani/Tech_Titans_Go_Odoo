'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/neumorphic/Card'
import { Button } from '@/components/ui/neumorphic/Button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 sm:p-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] neu-inset rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] neu-extruded rounded-full opacity-30 pointer-events-none" />

      <main className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        <div className="mb-12">
          <div className="w-20 h-20 neu-inset mx-auto flex items-center justify-center text-4xl font-black text-accent mb-8 shadow-inset">
            C
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-foreground tracking-tight mb-6">
            Core<span className="text-accent">Inventory</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted font-medium leading-relaxed">
            A production-ready inventory management system built with Neumorphic 
            design for the most intuitive stock tracking experience.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mb-16">
          {[
            { title: 'Real-time Stats', icon: '📊', desc: 'Monitor your inventory value and movement in real-time.' },
            { title: 'Multi-Warehouse', icon: '🏭', desc: 'Manage stock across multiple locations seamlessly.' },
            { title: 'Smart Ledger', icon: '📝', desc: 'Secure audit logs for every single stock adjustment.' }
          ].map((feature, i) => (
            <Card key={i} className="p-8 group hover:-translate-y-1 transition-transform">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted font-medium leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </section>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link href="/signup" className="flex-1">
            <Button variant="accent" className="w-full text-lg shadow-extruded py-4">
              Get Started
            </Button>
          </Link>
          <Link href="/login" className="flex-1">
            <Button variant="primary" className="w-full text-lg py-4">
              Log In
            </Button>
          </Link>
        </div>

        <footer className="mt-24 text-muted/50 font-bold text-sm tracking-widest uppercase">
          Built with Next.js 14 & Supabase
        </footer>
      </main>
    </div>
  )
}
