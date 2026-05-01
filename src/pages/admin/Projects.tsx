import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { formatDate } from '../../lib/utils';
import { Briefcase, Calendar, Users, Settings, Plus } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Active <span className="text-orange-500">AMC</span> Contracts</h1>
          <p className="text-slate-500 font-medium">Track contract progress and resource deployment</p>
        </div>
        <button className="btn-primary flex items-center gap-2 py-4 px-8">
          <Plus size={22} />
          Create Contract
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-[2.5rem] border border-slate-100" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-[3rem] border border-slate-200 text-center py-24 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
            <Briefcase size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">No active projects</h3>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">Set up an AMC contract to track your professional deployment and monthly audits.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
               <div className="absolute top-6 right-6">
                 <span className="px-4 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 tracking-widest">
                   {project.status}
                 </span>
               </div>
               
               <div className="flex items-center gap-4 mb-10">
                 <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-orange-500 shadow-xl group-hover:scale-110 transition-transform">
                   <Settings className="w-8 h-8 animate-spin-slow" />
                 </div>
                 <div className="max-w-[140px]">
                   <h3 className="text-xl font-black text-slate-900 leading-none mb-2 tracking-tight">{project.title}</h3>
                   <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest">{project.serviceType}</span>
                 </div>
               </div>

               <div className="space-y-4 mb-10">
                 <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <Users className="w-5 h-5 text-orange-500" />
                   <span className="font-black text-slate-900 text-sm">{project.teamSize} PROFESSIONALS</span>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <Calendar className="w-5 h-5 text-slate-400" />
                   <span className="font-bold text-slate-600 text-sm uppercase tracking-tight">Ends: {project.endDate}</span>
                 </div>
               </div>

               <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                 <div>
                   <div className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">VALID UNTIL</div>
                   <div className="text-xs font-black text-slate-900 underline decoration-orange-500 decoration-2 underline-offset-4">{project.endDate}</div>
                 </div>
                 <button className="text-orange-500 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors">Manage Project</button>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Demo Contract Button */}
      <div className="mt-16 p-12 bg-slate-900 rounded-[3rem] border border-slate-800 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full" />
         <div className="relative z-10">
           <div className="inline-flex items-center gap-3 bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/20 mb-6 font-black text-orange-500 text-[10px] tracking-widest uppercase">
              <Plus size={14} /> CRM Quick Tip
           </div>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed italic">
             "AMC projects are automatically generated after a successful lead conversion. Manage team deployments, weekly safety checklists, and monthly audit reports from this unified cockpit."
           </p>
         </div>
      </div>
    </div>
  );
}
