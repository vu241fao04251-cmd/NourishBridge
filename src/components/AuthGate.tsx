import React, { useEffect, useState } from 'react';
import App from '../App';
import { AuthScreen } from './AuthScreen';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export default function AuthGate() {
  const [sessionReady, setSessionReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setSessionReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(Boolean(data.session));
      setSessionReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session));
      setSessionReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (!sessionReady) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f5f8f5] text-emerald-800">Loading NourishBridge…</div>;
  }

  if (!isSupabaseConfigured || !hasSession) {
    return <AuthScreen onAuthenticated={() => setHasSession(true)} />;
  }

  return (
    <div className="relative">
      <button
        onClick={async () => { await supabase?.auth.signOut(); }}
        className="fixed bottom-5 right-5 z-[60] rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-neutral-700"
      >
        Sign out
      </button>
      <App />
    </div>
  );
}
