import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight, Bell, CalendarDays, CheckCircle2, ChevronDown, Clock3,
  HeartHandshake, LayoutDashboard, Leaf, LogOut, Menu, Moon, PackageCheck,
  Search, Settings, ShieldCheck, Sun, Users, Utensils, X, Building2,
  TrendingUp, CircleDollarSign, Activity,
} from 'lucide-react';
import { DonationListing, PlatformMetrics, RecipientShelter } from '../types/foodDonation';

interface AdminDashboardProps {
  donations: DonationListing[];
  metrics: PlatformMetrics;
  shelters: RecipientShelter[];
  onExit: () => void;
}

type AdminPage = 'overview' | 'donations' | 'pantries' | 'reports' | 'settings';

const statusStyle: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-700',
  reserved: 'bg-amber-50 text-amber-700',
  in_transit: 'bg-sky-50 text-sky-700',
  completed: 'bg-blue-50 text-blue-700',
  expired: 'bg-neutral-100 text-neutral-600',
};

const formatStatus = (status: string) => status.replace('_', ' ');

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ donations, metrics, shelters, onExit }) => {
  const [page, setPage] = useState<AdminPage>('overview');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const completed = donations.filter((d) => d.status === 'completed').length;
  const pending = donations.filter((d) => d.status === 'available').length;
  const recent = useMemo(() => donations.filter((d) =>
    `${d.title} ${d.donor.name} ${d.status}`.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8), [donations, query]);

  const navItems: { id: AdminPage; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={19} /> },
    { id: 'donations', label: 'Donations', icon: <PackageCheck size={19} /> },
    { id: 'pantries', label: 'Partner pantries', icon: <Building2 size={19} /> },
    { id: 'reports', label: 'Reports', icon: <TrendingUp size={19} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={19} /> },
  ];

  const pageTitle = navItems.find((item) => item.id === page)?.label || 'Dashboard';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const shell = dark ? 'bg-[#101b16] text-[#edf5ef]' : 'bg-[#f4f6f1] text-[#17251d]';
  const panel = dark ? 'bg-[#17251d] border-[#2b3b31]' : 'bg-white border-[#e4e9e1]';
  const muted = dark ? 'text-[#aab9ae]' : 'text-[#7c8a80]';

  const sidebar = (
    <aside className={`${dark ? 'bg-[#121e17] border-[#29392f]' : 'bg-white border-[#e6ebe4]'} w-[270px] shrink-0 border-r min-h-screen flex flex-col`}>
      <div className="h-[104px] px-7 flex items-center gap-3 border-b border-inherit">
        <div className="w-11 h-11 rounded-2xl bg-lime-300 text-[#193626] flex items-center justify-center shadow-sm"><HeartHandshake size={23} /></div>
        <div className="leading-tight"><div className="font-extrabold text-[19px] tracking-tight">NourishBridge</div><div className={`text-[10px] tracking-[.17em] mt-1 ${muted}`}>ADMIN CONSOLE</div></div>
      </div>
      <div className="px-5 pt-8">
        <p className={`px-4 mb-3 text-[10px] font-bold tracking-[.2em] ${muted}`}>WORKSPACE</p>
        <nav className="space-y-2">
          {navItems.map((item) => <button key={item.id} onClick={() => { setPage(item.id); setMobileNav(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-[14px] font-semibold transition ${page === item.id ? 'bg-[#e6f0df] text-[#245b3b]' : `${muted} hover:bg-[#f0f4ed] hover:text-[#294b35]`}`}>
            {item.icon}<span>{item.label}</span>{page === item.id && <span className="ml-auto w-1.5 h-6 rounded-full bg-[#477c5b]" />}
          </button>)}
        </nav>
      </div>
      <div className="mt-auto p-5">
        <div className={`${dark ? 'bg-[#202f25]' : 'bg-[#f0f4ed]'} rounded-2xl p-5`}>
          <Leaf className="text-[#6f9b67] mb-3" size={20} />
          <p className="text-[12px] leading-6 italic">“Great things are done by a series of small things brought together.”</p>
          <p className={`mt-3 text-[9px] font-bold tracking-[.16em] ${muted}`}>NOURISHBRIDGE IMPACT</p>
        </div>
        <button onClick={onExit} className={`w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${muted} hover:bg-red-50 hover:text-red-600`}><LogOut size={17} /> Exit admin view</button>
      </div>
    </aside>
  );

  return (
    <div className={`min-h-screen ${shell} font-sans`}>
      <div className="flex min-h-screen">
        <div className="hidden lg:block">{sidebar}</div>
        {mobileNav && <div className="fixed inset-0 z-50 flex lg:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-black/40" onClick={() => setMobileNav(false)} />{sidebar}<button onClick={() => setMobileNav(false)} className="absolute top-4 left-[280px] rounded-full bg-white p-2 text-neutral-800"><X size={18}/></button></div>}
        <div className="min-w-0 flex-1">
          <header className={`${dark ? 'bg-[#17251d] border-[#2b3b31]' : 'bg-white border-[#e6ebe4]'} h-[104px] border-b px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4`}>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileNav(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"><Menu size={21}/></button>
              <div><p className={`text-[10px] sm:text-[11px] font-bold tracking-[.2em] uppercase ${muted}`}>NourishBridge / {pageTitle}</p><h1 className="font-display text-[25px] sm:text-[31px] font-extrabold tracking-tight mt-1">{pageTitle}</h1></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className={`hidden sm:flex items-center gap-2 border ${dark ? 'border-[#34463a]' : 'border-[#e5eae2]'} rounded-2xl px-4 py-3 text-sm font-semibold ${muted}`}><CalendarDays size={18}/>{today}</div>
              <button onClick={() => setDark(!dark)} aria-label="Toggle theme" className={`w-12 h-12 rounded-2xl border ${dark ? 'border-[#34463a] text-lime-200' : 'border-[#e5eae2]'} flex items-center justify-center hover:shadow-sm`}>{dark ? <Sun size={20}/> : <Moon size={20}/>}</button>
              <button className={`relative w-12 h-12 rounded-2xl border ${dark ? 'border-[#34463a]' : 'border-[#e5eae2]'} flex items-center justify-center ${muted}`} aria-label="Notifications"><Bell size={19}/><span className="absolute top-2.5 right-3 w-2 h-2 bg-lime-400 rounded-full"/></button>
              <div className="hidden sm:flex items-center gap-2 pl-1"><div className="w-10 h-10 rounded-full bg-[#e5f0dc] text-[#315c3d] font-bold flex items-center justify-center">A</div><div className="leading-tight"><p className="text-xs font-bold">Administrator</p><p className={`text-[10px] ${muted}`}>Platform admin</p></div><ChevronDown size={15} className={muted}/></div>
            </div>
          </header>

          <main className="px-5 sm:px-8 lg:px-10 py-8 max-w-[1600px] mx-auto">
            {page === 'overview' && <>
              <section className="relative overflow-hidden rounded-[30px] min-h-[300px] sm:min-h-[330px] bg-gradient-to-r from-[#112d20] via-[#1d4b32] to-[#477d59] text-white shadow-[0_22px_55px_rgba(29,74,49,.16)] flex items-center">
                <div className="absolute -right-10 -top-24 w-[390px] h-[390px] rounded-full border border-white/10 bg-white/[.035]"/><div className="absolute right-[8%] top-[17%] w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-white/20 bg-white/[.06] flex items-center justify-center"><div className="text-center"><div className="text-lime-300 text-7xl font-light leading-none">✳</div><p className="text-lime-200 text-[10px] font-bold tracking-[.2em] mt-3">FOOD RESCUE<br/>STARTS HERE</p></div></div>
                <div className="relative z-10 p-7 sm:p-12 max-w-[760px]"><p className="text-lime-300 text-[11px] font-extrabold tracking-[.2em] mb-5">YOUR COMMUNITY IMPACT, IN ONE PLACE</p><h2 className="font-display text-[36px] sm:text-[54px] font-extrabold leading-[1.08] tracking-tight">Every meal saved.<br/>A stronger community.</h2><p className="mt-4 text-white/75 text-sm sm:text-base max-w-xl">Monitor donations, support local pantries, and keep good food moving to the people who need it.</p><button onClick={() => setPage('donations')} className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-lime-300 text-[#173523] px-6 py-4 text-sm font-bold hover:bg-lime-200 transition">Review donations <ArrowUpRight size={18}/></button></div>
              </section>
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
                {[
                  { label: 'Total donations', value: donations.length.toLocaleString(), note: 'Food listings on the platform', icon: <PackageCheck size={22}/>, tint: 'bg-[#e6f0df] text-[#346a46]' },
                  { label: 'Meals rescued', value: metrics.totalMealsRescued.toLocaleString(), note: 'Meals made available', icon: <Utensils size={22}/>, tint: 'bg-[#e6f0df] text-[#346a46]' },
                  { label: 'Active donors', value: metrics.activeDonorsCount.toLocaleString(), note: 'Donors represented in demo data', icon: <Users size={22}/>, tint: 'bg-[#e6f0df] text-[#346a46]' },
                  { label: 'Partner pantries', value: shelters.length.toLocaleString(), note: 'Community partners listed', icon: <Building2 size={22}/>, tint: 'bg-[#e6f0df] text-[#346a46]' },
                ].map((card) => <div key={card.label} className={`${panel} border rounded-[24px] p-6 shadow-[0_8px_28px_rgba(20,40,25,.035)]`}><div className="flex justify-between items-start"><p className="text-[14px] font-medium">{card.label}</p><div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.tint}`}>{card.icon}</div></div><p className="text-[34px] font-extrabold tracking-tight mt-5">{card.value}</p><p className={`text-xs mt-1 ${muted}`}>{card.note}</p></div>)}
              </section>
              <section className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-5 mt-6">
                <div className={`${panel} border rounded-[24px] p-6 shadow-sm`}>
                  <div className="flex items-center justify-between gap-3 mb-5"><div><h3 className="font-display font-bold text-lg">Recent donations</h3><p className={`text-xs mt-1 ${muted}`}>Latest food rescue listings</p></div><button onClick={() => setPage('donations')} className="text-xs font-bold text-[#477c5b] hover:underline">View all</button></div>
                  <div className="overflow-x-auto"><table className="w-full text-left min-w-[560px]"><thead><tr className={`text-[10px] uppercase tracking-wider ${muted} border-b ${dark ? 'border-[#2b3b31]' : 'border-[#edf0eb]'}`}><th className="pb-3 font-bold">Donation</th><th className="pb-3 font-bold">Donor</th><th className="pb-3 font-bold">Servings</th><th className="pb-3 font-bold">Status</th></tr></thead><tbody>{donations.slice(0,5).map((d) => <tr key={d.id} className={`border-b last:border-0 ${dark ? 'border-[#2b3b31]' : 'border-[#f0f2ee]'}`}><td className="py-4"><p className="text-sm font-bold">{d.title}</p><p className={`text-[10px] mt-1 ${muted}`}>{d.category.replace('_',' ')}</p></td><td className="py-4 text-xs">{d.donor.name}</td><td className="py-4 text-sm font-semibold">{d.servingsEquivalent}</td><td className="py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${statusStyle[d.status] || statusStyle.expired}`}>{formatStatus(d.status)}</span></td></tr>)}</tbody></table></div>
                </div>
                <div className={`${panel} border rounded-[24px] p-6 shadow-sm`}><h3 className="font-display font-bold text-lg">Platform snapshot</h3><p className={`text-xs mt-1 ${muted}`}>Current donation status</p><div className="mt-6 space-y-5">{[{label:'Available',value:pending,color:'bg-emerald-500',icon:<Clock3 size={17}/>},{label:'Completed',value:completed,color:'bg-blue-500',icon:<CheckCircle2 size={17}/>},{label:'In progress',value:donations.filter(d=>d.status==='reserved'||d.status==='in_transit').length,color:'bg-amber-500',icon:<Activity size={17}/>}].map((item)=> <div key={item.label}><div className="flex items-center justify-between text-xs mb-2"><span className="flex items-center gap-2 font-semibold">{item.icon}{item.label}</span><span className="font-bold">{item.value}</span></div><div className={`h-2 rounded-full ${dark?'bg-[#2a3b30]':'bg-[#edf1eb]'}`}><div className={`h-2 rounded-full ${item.color}`} style={{width:`${donations.length ? Math.min(100,item.value/donations.length*100) : 0}%`}}/></div></div>)}</div><div className={`mt-7 rounded-2xl p-4 ${dark?'bg-[#202f25]':'bg-[#f0f4ed]'}`}><div className="flex items-center gap-2 text-[#477c5b]"><Leaf size={18}/><span className="text-xs font-bold">Positive impact</span></div><p className={`text-xs leading-5 mt-2 ${muted}`}>{metrics.totalKgDiverted.toLocaleString()} kg of food diverted from waste in the current project data.</p></div></div>
              </section>
            </>}

            {page === 'donations' && <section className={`${panel} border rounded-[24px] p-5 sm:p-7`}><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"><div><h2 className="font-display text-xl font-bold">Donation management</h2><p className={`text-xs mt-1 ${muted}`}>Search and review all current food listings.</p></div><div className={`flex items-center gap-2 border rounded-xl px-3 py-2 ${dark?'border-[#34463a]':'border-[#e5eae2]'}`}><Search size={16} className={muted}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search donations..." className="bg-transparent outline-none text-xs w-full sm:w-56"/></div></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead><tr className={`text-[10px] uppercase tracking-wider ${muted} border-b`}><th className="pb-3">Food listing</th><th className="pb-3">Donor</th><th className="pb-3">Servings</th><th className="pb-3">Created</th><th className="pb-3">Status</th></tr></thead><tbody>{recent.map(d=><tr key={d.id} className={`border-b last:border-0 ${dark?'border-[#2b3b31]':'border-[#f0f2ee]'}`}><td className="py-4 text-sm font-bold">{d.title}</td><td className="py-4 text-xs">{d.donor.name}</td><td className="py-4 text-sm">{d.servingsEquivalent}</td><td className="py-4 text-xs">{new Date(d.createdAt).toLocaleDateString()}</td><td className="py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${statusStyle[d.status]||statusStyle.expired}`}>{formatStatus(d.status)}</span></td></tr>)}</tbody></table>{recent.length===0&&<p className={`py-12 text-center text-sm ${muted}`}>No matching donations found.</p>}</div></section>}

            {page === 'pantries' && <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{shelters.map((s)=><div key={s.id} className={`${panel} border rounded-[24px] p-6`}><div className="w-12 h-12 rounded-2xl bg-[#e6f0df] text-[#346a46] flex items-center justify-center"><Building2 size={22}/></div><h3 className="font-bold mt-4">{s.name}</h3><p className={`text-xs mt-1 ${muted}`}>{s.type.replaceAll('_',' ')}</p><p className={`text-xs mt-4 leading-5 ${muted}`}>{s.address}</p><div className={`border-t mt-5 pt-4 flex justify-between text-xs ${dark?'border-[#2b3b31]':'border-[#edf0eb]'}`}><span className={muted}>Daily meal capacity</span><strong>{s.capacityMealsPerDay.toLocaleString()}</strong></div><div className="mt-3 flex justify-between text-xs"><span className={muted}>Contact</span><strong>{s.contactPerson}</strong></div></div>)}</section>}

            {page === 'reports' && <section className="grid sm:grid-cols-2 gap-5">{[{title:'Food rescued',value:`${metrics.totalKgDiverted.toLocaleString()} kg`,detail:'Total weight diverted from waste',icon:<Leaf/>},{title:'Meals supported',value:metrics.totalMealsRescued.toLocaleString(),detail:'Estimated servings made available',icon:<Utensils/>},{title:'CO₂e averted',value:`${metrics.co2eAvertedKg.toLocaleString()} kg`,detail:'Estimated emissions avoided',icon:<Activity/>},{title:'Completed donations',value:completed.toLocaleString(),detail:'Listings marked as delivered',icon:<CircleDollarSign/>}].map(c=><div key={c.title} className={`${panel} border rounded-[24px] p-7`}><div className="flex justify-between"><div><p className={`text-sm ${muted}`}>{c.title}</p><p className="text-3xl font-extrabold mt-3">{c.value}</p><p className={`text-xs mt-2 ${muted}`}>{c.detail}</p></div><div className="w-12 h-12 rounded-2xl bg-[#e6f0df] text-[#346a46] flex items-center justify-center">{c.icon}</div></div></div>)}</section>}

            {page === 'settings' && <section className={`${panel} border rounded-[24px] p-7 max-w-3xl`}><h2 className="font-display text-xl font-bold">Dashboard settings</h2><p className={`text-sm mt-2 ${muted}`}>Personalize the admin dashboard appearance.</p><div className={`mt-7 flex items-center justify-between border-t pt-5 ${dark?'border-[#2b3b31]':'border-[#edf0eb]'}`}><div><p className="font-semibold text-sm">Dark appearance</p><p className={`text-xs mt-1 ${muted}`}>Switch between light and dark dashboard themes.</p></div><button onClick={()=>setDark(!dark)} className="rounded-xl bg-[#e6f0df] text-[#315c3d] px-4 py-2 text-xs font-bold">{dark?'Turn off':'Turn on'}</button></div><div className={`mt-5 rounded-xl p-4 text-xs leading-5 ${dark?'bg-[#202f25]':'bg-[#f0f4ed]'} ${muted}`}>This dashboard currently displays the project's existing local demo data. User accounts and live database settings will be connected during the MongoDB backend migration.</div></section>}

            <p className={`text-[10px] mt-8 text-center ${muted}`}>NourishBridge Admin Console · Dashboard values reflect the data currently available in this project.</p>
          </main>
        </div>
      </div>
    </div>
  );
};
