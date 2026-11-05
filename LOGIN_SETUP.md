# NourishBridge Login Setup

This update adds email/password sign-in, account registration, session persistence, and sign-out using Supabase Auth.

## 1. Install dependencies
From the project folder:
```bash
npm install
```

## 2. Configure Supabase
In Supabase Dashboard, open Project Settings → API. Copy the Project URL and the anon/public key (or publishable key).

Create a file named `.env` in the project root (same folder as `package.json`) and add:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
```
Do not put a service-role key in frontend environment variables. Never commit `.env`.

## 3. Enable email authentication
In Supabase Dashboard, open Authentication → Providers → Email and make sure Email is enabled.
For local testing, you can turn off email confirmation in Authentication → Settings if you want accounts to sign in immediately. Otherwise users must confirm their email first.

## 4. Run locally
```bash
npm run dev
```
Open the local URL Vite prints (this project uses port 3000).

## Notes
- The existing donation, mission, and impact data is still stored in browser localStorage / demo data. This login update does not migrate those records into Supabase tables or make them user-specific.
- The frontend uses the Supabase anon/public key. Keep Row Level Security enabled for any future tables and never expose a service-role key.
