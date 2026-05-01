import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, limit, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Users, Building2, Briefcase, Bell, 
  ArrowUpRight, TrendingUp, BarChart3, Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    activeClients: 0,
    runningProjects: 0
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    // Basic stats
    const fetchStats = async () => {
      const leadsSnap = await getDocs(collection(db, 'leads'));
      const clientsSnap = await getDocs(query(collection(db, 'clients'), where('status', '==', 'active')));
      const projectsSnap = await getDocs(query(collection(db, 'projects'), where('status', '==', 'active')));
      
      const newLeads = leadsSnap.docs.filter(d => d.data().status === 'new').length;

      setStats({
        totalLeads: leadsSnap.size,
        newLeads,
        activeClients: clientsSnap.size,
        runningProjects: projectsSnap.size
      });
    };

    // Recent leads listener
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRecentLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    fetchStats();
    return () => unsubscribe();
  }, []);

  const statCards = [
    { name: 'Total Enquiries', value: stats.totalLeads, icon: Bell, trend: '+12%', color: 'orange' },
    { name: 'Active Clients', value: stats.activeClients, icon: Users, trend: '+4%', color: 'blue' },
    { name: 'Running Projects', value: stats.runningProjects, icon: Briefcase, trend: '+8%', color: 'indigo' },
    { name: 'New Leads', value: stats.newLeads, icon: TrendingUp, trend: 'Action Required', color: 'orange' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
        <p className="text-slate-500 font-medium capitalize">Welcome back, Aditya Sharma.</p>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2rem] border border-slate-200 group hover:shadow-xl hover:border-orange-200 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-brand-secondary group-hover:text-white transition-all shadow-sm">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full">REALTIME</span>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.name}</div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-5">
              <span className="text-xs font-bold text-brand-secondary flex items-center gap-1">
                <TrendingUp size={14} /> {stat.trend}
              </span>
              <ArrowUpRight size={14} className="text-slate-300" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Recent Enquiries</h3>
              <Link to="/admin/leads" className="text-brand-secondary font-bold text-sm bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">Manage All</Link>
            </div>
            <div className="space-y-4">
              {recentLeads.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-medium border-2 border-dashed border-slate-100 rounded-3xl">No recent enquiries.</div>
              ) : recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-bold text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-all">
                      {lead.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{lead.companyName} • {lead.facilityType}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{lead.createdAt ? formatDate(lead.createdAt.toDate()) : 'Now'}</div>
                    <span className="text-[9px] font-black uppercase tracking-tighter text-brand-secondary/80 bg-orange-50 px-2 py-0.5 rounded-full">
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions / System Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[2rem] text-white p-8 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-secondary/20 rounded-full blur-3xl"></div>
            <h3 className="text-lg font-bold mb-6 relative z-10">Service Compliance</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-xs font-bold mb-3">
                  <span className="text-slate-400">Weekly SLA Target</span>
                  <span className="text-brand-secondary">98.4%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-secondary w-[98.4%] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <BarChart3 className="text-brand-secondary" />
                <div>
                  <div className="text-sm font-bold tracking-tight">Performance Gain</div>
                  <p className="text-[10px] text-slate-500 font-medium">↑ 12% leads volume MoM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-[2rem] border border-orange-100 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-secondary" />
              Critical Alerts
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-orange-100">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full mt-2 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <div>
                  <div className="text-xs font-bold text-slate-900">HVAC Failure - Block B</div>
                  <p className="text-[10px] text-slate-500 font-medium">Response team dispatched.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start opacity-60">
                <div className="w-2.5 h-2.5 bg-slate-300 rounded-full mt-2" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Lift Maintenance Done</div>
                  <p className="text-[10px] text-slate-500 font-medium">Tower 4 successfully serviced.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
