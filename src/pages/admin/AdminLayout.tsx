import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { 
  LayoutDashboard, Users, Building2, Briefcase, 
  LogOut, Settings, Bell, Search, Menu, X 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Bell },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
];

export default function AdminLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-brand-secondary">Loading CRM...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-slate-900 text-slate-400 w-72 fixed inset-y-0 left-0 z-50 transition-transform duration-500 transform lg:translate-x-0 lg:static m-4 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none">FIXFOX</span>
              <span className="text-[10px] font-black text-orange-500 tracking-[0.3em]">CRM PRO</span>
            </div>
          </div>

          <nav className="flex-grow space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-300 font-bold text-sm group relative overflow-hidden",
                  location.pathname === link.href 
                    ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" 
                    : "hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <link.icon className={cn("w-5 h-5", location.pathname === link.href ? "text-white" : "group-hover:scale-110 transition-transform")} />
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-red-500/10 hover:text-red-400 transition-all font-black text-sm border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-h-screen lg:max-w-[calc(100%-18rem)]">
        {/* Header */}
        <header className="h-24 px-8 flex items-center justify-between sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-3 bg-white rounded-2xl border border-slate-200 shadow-sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search CRM..." 
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none w-80 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all font-medium shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="p-3 relative bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 cursor-pointer shadow-sm transition-all group">
              <Bell className="w-5 h-5 text-slate-600 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center gap-4 group cursor-pointer bg-white p-1.5 pr-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <img 
                src={user.photoURL || 'https://ui-avatars.com/api/?name=Staff'} 
                alt="Avatar" 
                className="w-10 h-10 rounded-2xl border-2 border-slate-100 shadow-sm"
              />
              <div className="text-left hidden sm:block">
                <div className="text-sm font-black text-slate-900 leading-tight">{user.displayName || 'Staff Member'}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.email?.split('@')[0]}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 pb-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
