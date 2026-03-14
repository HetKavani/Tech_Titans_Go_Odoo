'use client'

import { useState } from 'react'
import { login } from '@/app/auth/actions'
import Link from 'next/link'
import { Card } from '@/components/ui/neumorphic/Card'
import { Button } from '@/components/ui/neumorphic/Button'
import { Input } from '@/components/ui/neumorphic/Input'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">Welcome</h1>
          <p className="text-muted font-medium">Inventory management simplified.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Email" name="email" type="email" required placeholder="john@example.com" />
          <div className="space-y-1">
            <Input label="Password" name="password" type="password" required placeholder="••••••••" />
            <div className="flex justify-end pr-2">
              <Link href="/reset-password" name="reset-password-link" className="text-xs font-semibold text-muted hover:text-accent">
                Forgot password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="neu-inset p-4 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-4" variant="accent">
            {loading ? 'Authenticating...' : 'Log In'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-muted">
          New here?{' '}
          <Link href="/signup" className="text-accent hover:underline">
            Create account
          </Link>
        </div>
      </Card>
    </div>
  )
}
