import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Smartphone, MapPin, CheckCircle2, Loader2, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';

const facilityTypes = [
  'Corporate Office', 
  'Housing Society', 
  'Industrial Unit', 
  'Retail / Mall', 
  'Healthcare', 
  'Educational Institution', 
  'Other'
];

const serviceOptions = [
  'Cleaning', 'MEP', 'Maintenance', 'Catering', 'Security', 'IT', 'Care Services', 'Other'
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    facilityType: '',
    phone: '',
    email: '',
    city: '',
    servicesInterested: [] as string[],
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({
        fullName: '',
        companyName: '',
        facilityType: '',
        phone: '',
        email: '',
        city: '',
        servicesInterested: [],
        message: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      servicesInterested: prev.servicesInterested.includes(service)
        ? prev.servicesInterested.filter(s => s !== service)
        : [...prev.servicesInterested, service]
    }));
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <div className="max-w-2xl mb-16">
          <span className="section-label">Contact Us</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Ready to transform your facility? Let's start a conversation.
          </h1>
          <p className="text-slate-600 text-lg">
            Whether you manage a corporate campus, housing society, or commercial complex — our team is ready to understand your facility's needs and design a service plan built around your requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                  <p className="text-slate-600">business@fixfox.in</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
                  <p className="text-slate-600">+91 77770 94444</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Location</h3>
                  <p className="text-slate-600">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Response Promise</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                We respond to all B2B enquiries within 4 business hours. For urgent facility needs, call us directly.
              </p>
              <div className="flex items-center gap-2 text-brand-secondary font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Free audit. No obligation.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="card-bento shadow-2xl p-8 md:p-12 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-secondary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2 relative z-10">Request Audit</h2>
              <p className="text-slate-500 mb-10 font-medium relative z-10">Fill in the details below and we'll respond within 4 business hours.</p>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-orange-50 border border-orange-100 p-8 rounded-[2rem] text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h3>
                  <p className="text-slate-600 font-medium">
                    Thank you! Our facility management expert will be in touch shortly.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-brand-secondary font-bold hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Your Full Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-secondary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Company / Society Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-secondary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        placeholder="Fox Enterprises"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Facility Type *</label>
                      <select
                        required
                        value={formData.facilityType}
                        onChange={(e) => setFormData(prev => ({ ...prev, facilityType: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-secondary focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white"
                      >
                        <option value="">Select Facility Type</option>
                        {facilityTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">City *</label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-secondary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        placeholder="Ahmedabad"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Mobile Number *</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-secondary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Business Email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-secondary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        placeholder="contact@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 block">Services You're Looking For</label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map(service => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                            formData.servicesInterested.includes(service)
                              ? "bg-brand-secondary text-white border-brand-secondary"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                          )}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tell us about your facility and requirements (optional)</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-secondary focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                      placeholder="Share any specific details..."
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg font-bold disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Book My Free Audit
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    By submitting this form, you agree to be contacted by FixFox's team. We do not share your information with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
