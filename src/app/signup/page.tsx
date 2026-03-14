'use client'

import { useState } from 'react'
import { signup } from '@/app/auth/actions'
import Link from 'next/link'
import { Card } from '@/components/ui/neumorphic/Card'
import { Button } from '@/components/ui/neumorphic/Button'
import { Input } from '@/components/ui/neumorphic/Input'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await signup(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">Sign Up</h1>
          <p className="text-muted font-medium">Create your CoreInventory account</p>
        </div>

        {success ? (
          <div className="neu-inset p-6 text-center text-emerald-600 font-semibold mb-6">
            Signup successful! Check your email to confirm.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Full Name" name="name" type="text" required placeholder="John Doe" />
            <Input label="Email Address" name="email" type="email" required placeholder="john@example.com" />
            <Input label="Password" name="password" type="password" required placeholder="••••••••" />

            {error && (
              <div className="neu-inset p-4 text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full mt-4" variant="accent">
              {loading ? 'Processing...' : 'Create Account'}
            </Button>
          </form>
        )}

        <div className="mt-8 text-center text-sm font-medium text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:underline">
            Log In
          </Link>
        </div>
      </Card>
    </div>
  )
}
