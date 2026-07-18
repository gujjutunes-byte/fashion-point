'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      router.push('/');
    } catch (err) {
      toast.error(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      await loginWithGoogle();
      router.push('/');
    } catch (err) {
      toast.error('Google sign-in failed');
    }
  }

  return (
    <section className="max-w-md mx-auto px-5 py-20">
      <h1 className="font-display text-4xl text-bone mb-2 text-center">Create Account</h1>
      <p className="text-bone/50 text-center mb-10">Join the Fashion Point circle</p>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 space-y-4">
        <div>
          <label className="text-xs text-bone/50">Full Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
        </div>
        <div>
          <label className="text-xs text-bone/50">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
        </div>
        <div>
          <label className="text-xs text-bone/50">Password</label>
          <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
        </div>
        <button type="submit" disabled={loading} className="w-full btn-gold rounded-full py-3 font-semibold text-sm disabled:opacity-60">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <button type="button" onClick={handleGoogle} className="w-full btn-outline rounded-full py-3 font-semibold text-sm">
          Continue with Google
        </button>
      </form>

      <p className="text-center text-bone/50 text-sm mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-gold hover:underline">Sign in</Link>
      </p>
    </section>
  );
}
