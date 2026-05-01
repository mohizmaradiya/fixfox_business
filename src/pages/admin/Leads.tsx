import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { formatDate, cn } from '../../lib/utils';
import { Mail, Phone, Building2, MapPin, Trash2, ExternalLink, MoreVertical, CheckCircle, Clock, XCircle, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Lead {
  id: string;
  fullName: string;
  companyName: string;
  facilityType: string;
  phone: string;
  email: string;
  city: string;
  servicesInterested: string[];
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost' | 'converted';
  createdAt: any;
}

const statusColors = {
  new: 'bg-orange-500 text-white shadow-lg shadow-orange-500/20',
  contacted: 'bg-blue-500 text-white shadow-lg shadow-blue-500/20',
  qualified: 'bg-green-500 text-white shadow-lg shadow-green-500/20',
  lost: 'bg-slate-400 text-white',
  converted: 'bg-purple-500 text-white shadow-lg shadow-purple-500/20',
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
       console.error("Rules Error: ", error);
       setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status });
    } catch (error) {
      alert("Permission Denied: You cannot update this lead.");
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteDoc(doc(db, 'leads', id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch (error) {
      alert("Permission Denied: You cannot delete this lead.");
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Inbound <span className="text-orange-500">Leads</span></h1>
          <p className="text-slate-500 font-medium">Manage your B2B enquiries and facility audit requests</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm font-black text-slate-900 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-orange-500" />
             ACTIVE PIPELINE: {leads.length}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table/List */}
        <div className={cn("space-y-4", selectedLead ? "lg:col-span-6" : "lg:col-span-12")}>
          {loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map(i => <div key={i} className="h-28 bg-white animate-pulse rounded-[2rem] border border-slate-100" />)}
            </div>
          ) : leads.length === 0 ? (
            <div className="bg-white rounded-[3rem] border border-slate-200 text-center py-24 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
                <Bell size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">No leads yet</h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">When someone fills the contact form, they'll appear here automatically.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <motion.div
                layout
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={cn(
                  "bg-white rounded-[2rem] p-6 lg:p-8 cursor-pointer group transition-all duration-300 border",
                  selectedLead?.id === lead.id 
                    ? "border-orange-500 ring-4 ring-orange-500/10 shadow-2xl scale-[1.02]" 
                    : "border-slate-200 hover:border-orange-500/30 hover:shadow-xl"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {lead.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-lg text-slate-900 group-hover:text-orange-500 transition-colors tracking-tight">{lead.fullName}</h3>
                        <span className={cn("px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest", statusColors[lead.status])}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1.5"><Building2 size={14} className="text-slate-300" /> {lead.companyName}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-300" /> {lead.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 bg-slate-50 p-4 md:p-0 md:bg-transparent rounded-2xl">
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-widest">{lead.createdAt ? formatDate(lead.createdAt.toDate()) : 'Recent'}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Received</div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                      className="p-3 bg-white md:bg-transparent rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100 md:border-none shadow-sm md:shadow-none"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Selected View */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="lg:col-span-6 sticky top-28 h-fit z-30"
            >
              <div className="bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
                <button 
                  onClick={() => setSelectedLead(null)} 
                  className="absolute top-6 right-6 p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle size={24} />
                </button>

                <div className="mb-12 relative z-10">
                  <span className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest mb-6 inline-block", statusColors[selectedLead.status])}>
                    LEAD STATUS: {selectedLead.status}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-3 tracking-tight">{selectedLead.fullName}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 font-bold text-sm">
                    <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                      <Building size={16} className="text-orange-500" /> {selectedLead.companyName}
                    </span>
                    <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                      <MapPin size={16} className="text-orange-500" /> {selectedLead.city}
                    </span>
                  </div>
                </div>

                <div className="space-y-8 mb-12 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <a href={`mailto:${selectedLead.email}`} className="flex flex-col p-6 bg-slate-800/50 rounded-[2rem] hover:bg-orange-500 transition-all group border border-slate-800 hover:border-orange-400">
                      <Mail className="w-6 h-6 text-orange-500 group-hover:text-white mb-3 transition-colors" />
                      <span className="text-[10px] text-slate-500 group-hover:text-white/80 font-black uppercase tracking-widest mb-1">Email</span>
                      <span className="text-xs font-black text-white truncate">{selectedLead.email}</span>
                    </a>
                    <a href={`tel:${selectedLead.phone}`} className="flex flex-col p-6 bg-slate-800/50 rounded-[2rem] hover:bg-green-500 transition-all group border border-slate-800 hover:border-green-400">
                      <Phone className="w-6 h-6 text-green-500 group-hover:text-white mb-3 transition-colors" />
                      <span className="text-[10px] text-slate-500 group-hover:text-white/80 font-black uppercase tracking-widest mb-1">Phone</span>
                      <span className="text-xs font-black text-white">{selectedLead.phone}</span>
                    </a>
                  </div>

                  <div className="p-8 bg-slate-800/30 rounded-[2rem] border border-slate-800">
                    <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                       REQUIREMENTS & MESSAGE
                    </h4>
                    <p className="text-base text-slate-300 font-medium leading-relaxed italic">
                      "{selectedLead.message || 'No specific requirements mentioned.'}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">SERVICES INTERESTED</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.servicesInterested.map(s => (
                        <span key={s} className="px-4 py-2 bg-slate-800 rounded-xl text-[10px] font-black tracking-widest text-slate-300 border border-slate-700">
                          {s.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-10 border-t border-slate-800 relative z-10">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Update Pipeline Progress</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => updateStatus(selectedLead.id, 'contacted')}
                      className="px-6 py-4 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                    >
                      Mark Contacted
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedLead.id, 'qualified')}
                      className="px-6 py-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all"
                    >
                      Qualified Lead
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedLead.id, 'converted')}
                      className="px-6 py-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all col-span-2"
                    >
                      Convert to Retainer Client
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Bell(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
