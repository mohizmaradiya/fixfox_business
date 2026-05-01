import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { formatDate } from '../../lib/utils';
import { UserPlus, Search, MoreVertical, Building2, Mail, Phone, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addDemoClient = async () => {
    try {
      await addDoc(collection(db, 'clients'), {
        name: 'Diamond Housing Society',
        contactPerson: 'Mr. Rajesh Shah',
        email: 'secretary@diamondhousing.in',
        phone: '+91 99887 76655',
        address: 'Satellite, Ahmedabad',
        status: 'active',
        createdAt: serverTimestamp()
      });
    } catch (e) {
      alert("Unauthorized to add clients or Rules error.");
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Corporate <span className="text-orange-500">Clients</span></h1>
          <p className="text-slate-500 font-medium">View and manage your active facility partnerships</p>
        </div>
        <button 
          onClick={addDemoClient}
          className="btn-primary flex items-center gap-2 py-4 px-8"
        >
          <UserPlus size={22} />
          Add New Client
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search clients by name, email..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-full md:w-96 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium shadow-sm"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-white border border-slate-200 text-xs font-black text-slate-600 rounded-xl px-4 py-3 outline-none shadow-sm hover:border-orange-500/30 transition-all cursor-pointer">
              <option>All Statuses</option>
              <option>Active Partners</option>
              <option>Inactive / Past</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                <th className="px-8 py-6 border-b border-slate-100">Client Name & ID</th>
                <th className="px-8 py-6 border-b border-slate-100">Primary Contact</th>
                <th className="px-8 py-6 border-b border-slate-100">Status</th>
                <th className="px-8 py-6 border-b border-slate-100">Onboarded Date</th>
                <th className="px-8 py-6 border-b border-slate-100"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                      <span className="font-black text-slate-400 text-xs uppercase tracking-widest">Initialising Client Database...</span>
                    </div>
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
                        <Users size={32} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">No clients found</h3>
                      <p className="text-slate-500 font-medium text-sm">Convert a lead from the pipeline to see them here as active partners.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-900 group-hover:text-orange-500 transition-colors tracking-tight">{client.name}</div>
                          <div className="text-xs font-bold text-slate-400 lowercase">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-black text-slate-700 mb-1">{client.contactPerson}</div>
                      <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                         <Phone size={12} className="text-orange-500/50" /> {client.phone}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm",
                        client.status === 'active' 
                          ? "bg-green-500 text-white shadow-green-500/20" 
                          : "bg-slate-200 text-slate-600"
                      )}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-slate-500 uppercase tracking-tight">
                      {client.createdAt ? formatDate(client.createdAt.toDate()) : '—'}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 text-slate-300 hover:text-slate-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm md:shadow-none font-bold">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
