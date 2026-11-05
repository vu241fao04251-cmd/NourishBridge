# NourishBridge Admin Dashboard

The admin dashboard preview is available from the Admin button in the main header.

## Included
- Dashboard overview with donation, meals rescued, active donor, and partner pantry counts.
- Recent donation table and donation search.
- Partner pantry directory.
- Impact summary cards.
- Light/dark appearance toggle and responsive sidebar.

## Current data source and security note
This is a frontend dashboard preview using the project's existing donation state, localStorage data, sample metrics, and pantry data. It is not yet connected to MongoDB, and the Admin button is not an authorization boundary. Do not expose this preview as a protected production admin area until backend admin roles and server-side authorization are implemented.

The existing Supabase authentication flow has been left unchanged in this update. MongoDB migration can be completed separately after the dashboard UI is reviewed.
