import React, { useState } from 'react';
import { HeartHandshake, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    if (!supabase || !isSupabaseConfigured) {
      setMessage('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      setIsError(true);
      return;
    }
    if (password.length < 6) {
      setMessage('Password must contain at least 6 characters.');
      setIsError(true);
      return;
    }

    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        options: {
  data: { full_name: name.trim() },
  emailRedirectTo: window.location.origin,
},
        });
        if (error) throw error;
        if (data.session) {
          onAuthenticated();
        } else {
          setMessage('Account created. Check your email for the confirmation link, then log in.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        onAuthenticated();
      }
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f8f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl border border-emerald-100 grid md:grid-cols-2">
        <section className="relative hidden md:flex flex-col justify-between min-h-[620px] bg-emerald-900 p-10 text-white">
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 20% 20%, #a7f3d0, transparent 38%), radial-gradient(circle at 90% 80%, #34d399, transparent 35%)' }} />
          <div className="relative flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center"><HeartHandshake className="w-6 h-6" /></div>
            <div><div className="font-bold text-xl">NourishBridge</div><div className="text-emerald-100 text-xs">Surplus Food Rescue Network</div></div>
          </div>
          <div className="relative">
            <p className="text-emerald-200 uppercase tracking-[0.2em] text-xs font-semibold mb-4">Good food. Stronger communities.</p>
            <h1 className="text-4xl font-extrabold leading-tight">Connect surplus food with the people who need it.</h1>
            <p className="mt-5 text-emerald-100 leading-relaxed">Join donors, community shelters and volunteers working together to reduce food waste.</p>
          </div>
          <p className="relative text-xs text-emerald-200">Every meal rescued makes a difference.</p>
        </section>

        <section className="p-7 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="md:hidden flex items-center gap-3 mb-8 text-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center"><HeartHandshake /></div>
            <div><div className="font-bold text-lg">NourishBridge</div><div className="text-xs text-neutral-500">Surplus Food Rescue Network</div></div>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">{mode === 'login' ? 'Welcome back' : 'Get started'}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">{mode === 'login' ? 'Sign in to your account' : 'Create your account'}</h2>
          <p className="mt-2 text-sm text-neutral-500">{mode === 'login' ? 'Continue your work in the NourishBridge community.' : 'Join the community helping good food reach more people.'}</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === 'signup' && (
              <label className="block text-sm font-medium text-neutral-700">
                Full name
                <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" placeholder="Your name" />
              </label>
            )}
            <label className="block text-sm font-medium text-neutral-700">
              Email address
              <span className="relative block mt-1.5">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" placeholder="you@example.com" />
              </span>
            </label>
            <label className="block text-sm font-medium text-neutral-700">
              Password
              <span className="relative block mt-1.5">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-12 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" placeholder="At least 6 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </span>
            </label>

            {message && <div role="alert" className={`rounded-xl px-4 py-3 text-sm ${isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'}`}>{message}</div>}

            <button disabled={busy} type="submit" className="w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white flex items-center justify-center gap-2 hover:bg-emerald-800 disabled:opacity-60 transition-colors">
              {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'} {!busy && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-neutral-500">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); }} className="font-semibold text-emerald-700 hover:text-emerald-900">
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </p>
          <p className="mt-6 text-center text-xs text-neutral-400">Secure sign-in powered by Supabase Authentication</p>
        </section>
      </div>
    </main>
  );
};
