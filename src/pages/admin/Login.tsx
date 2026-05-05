import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Settings, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (loading) return;
    
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      if (!result.user.email) throw new Error('No email found in Google account');

      // Check if user is the primary admin or in the staff collection
      const staffDoc = await getDoc(doc(db, 'staff', result.user.email));
      
      if (result.user.email === 'mohizmaradiya@gmail.com' || staffDoc.exists()) {
        navigate('/admin');
      } else {
        setError('Unauthorized access. Only authorized staff can enter the CRM.');
        await auth.signOut();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized in Firebase. Please add "b2b.fixfox.in" to your Authorized Domains in the Firebase Console.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Login popup was blocked by your browser. Please allow popups for this site.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Login was cancelled. Please try again.');
      } else {
        setError(err.message || 'Failed to login. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs for aesthetic */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="max-w-md w-full bg-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-800 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-orange-500 rounded-[1.5rem] mb-8 shadow-xl shadow-orange-500/20">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">Staff <span className="text-orange-500">Secure</span> Login</h1>
          <p className="text-slate-400 mt-3 font-medium uppercase text-xs tracking-[0.2em]">Facility Management CRM</p>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-bold">{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-4 py-5 bg-white rounded-2xl transition-all duration-300 font-black text-slate-900 mb-8 shadow-xl ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-50'
          }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              className="w-6 h-6" 
              alt="Google" 
            />
          )}
          {loading ? 'Authenticating...' : 'Sign in with Google'}
        </button>

        <div className="space-y-4">
          <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest">
            BETA CRM v1.0.0
          </p>
          <div className="h-px bg-slate-800 w-12 mx-auto" />
          <p className="text-center text-[10px] text-slate-600 font-medium">
            Unauthorized access systems are tracked. <br /> Strictly for FixFox authorized personnel.
          </p>
        </div>
      </div>
    </div>
  );
}
