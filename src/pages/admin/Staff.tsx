import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { formatDate } from '../../lib/utils';
import { UserPlus, Search, Shield, Mail, Trash2, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('editor');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isSuperAdmin = auth.currentUser?.email === 'mohizmaradiya@gmail.com';

  useEffect(() => {
    const q = query(collection(db, 'staff'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setStaff(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      console.error("Staff fetch error:", err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!newEmail || !newName) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Use email as ID for rules efficiency
      await setDoc(doc(db, 'staff', newEmail.toLowerCase().trim()), {
        email: newEmail.toLowerCase().trim(),
        name: newName.trim(),
        role: newRole,
        createdAt: serverTimestamp()
      });
      
      setSuccess(`Successfully added ${newEmail} to staff`);
      setNewEmail('');
      setNewName('');
      setIsAdding(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to add staff member. Make sure you are the primary administrator.');
    }
  };

  const removeStaff = async (email: string) => {
    if (!window.confirm(`Are you sure you want to remove ${email}?`)) return;
    
    try {
      await deleteDoc(doc(db, 'staff', email));
      setSuccess('Staff member removed successfully');
    } catch (err: any) {
      setError('Failed to remove staff member');
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight tracking-tight">Staff <span className="text-orange-500">Authorization</span></h1>
          <p className="text-slate-500 font-medium">Manage who can access the CRM Dashboard</p>
        </div>
        {isSuperAdmin && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="btn-primary flex items-center gap-2 py-4 px-8"
          >
            <UserPlus size={22} />
            {isAdding ? 'Cancel' : 'Authorize New Staff'}
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 mb-10">
          <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-1">Full Name</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-6 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-bold"
              />
            </div>
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-1">Email Address</label>
              <input 
                type="email" 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="staff@fixfox.in"
                className="w-full pl-6 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-bold"
              />
            </div>
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-1">CRM Role</label>
              <select 
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full pl-6 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-bold appearance-none"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <button type="submit" className="bg-orange-500 text-white rounded-2xl py-4 font-black shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all">
              Save Authorization
            </button>
          </form>
        </div>
      )}

      {(error || success) && (
        <div className={cn(
          "p-6 rounded-2xl flex items-center gap-4 border mb-8",
          error ? "bg-red-50 border-red-200 text-red-600" : "bg-green-50 border-green-200 text-green-600"
        )}>
          {error ? <AlertCircle className="shrink-0" /> : <CheckCircle2 className="shrink-0" />}
          <p className="font-bold text-sm tracking-tight">{error || success}</p>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-orange-500">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">Authorized Users</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Staff Access</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Super Admin</div>
            <div className="text-xs font-black text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              mohizmaradiya@gmail.com
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                <th className="px-8 py-6 border-b border-slate-100">Staff Member</th>
                <th className="px-8 py-6 border-b border-slate-100">Access Role</th>
                <th className="px-8 py-6 border-b border-slate-100">Authorized On</th>
                <th className="px-8 py-6 border-b border-slate-100"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                    <span className="font-black text-slate-400 text-xs uppercase tracking-widest">Verifying staff database...</span>
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100">
                        <Shield size={32} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">No extra staff added</h3>
                      <p className="text-slate-500 font-medium text-sm text-sm">Only the primary master email has access currently.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all font-black">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900 group-hover:text-orange-500 transition-colors tracking-tight">{member.name}</div>
                          <div className="text-xs font-bold text-slate-400">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                        member.role === 'admin' ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"
                      )}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-tight">
                      {member.createdAt ? formatDate(member.createdAt.toDate()) : '—'}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {isSuperAdmin && (
                        <button 
                          onClick={() => removeStaff(member.id)}
                          className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2 tracking-tight">Security Note</h3>
          <p className="text-blue-100 font-medium max-w-2xl leading-relaxed">
            Staff members added here must sign in using their **Google Account**. 
            Their email must match exactly. Access is granted instantly once saved. 
            Only the master administrator (mohizmaradiya@gmail.com) can add or remove users.
          </p>
        </div>
        <AlertCircle className="absolute -right-10 -bottom-10 w-48 h-48 text-blue-500/20 rotate-12" />
      </div>
    </div>
  );
}
