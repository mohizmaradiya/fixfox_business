import { motion } from 'motion/react';
import { Target, Eye, Award, Heart, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    title: "Accountability",
    icon: Shield,
    desc: "Every professional on every job is tracked, supervised, and responsible for their output. If something goes wrong, we own it and fix it."
  },
  {
    title: "Quality",
    icon: Award,
    desc: "We do not cut corners. Every service is delivered to a defined standard, and every client receives the same level of quality regardless of contract size."
  },
  {
    title: "Transparency",
    icon: Eye,
    desc: "No surprise charges. No vague service reports. No excuses. You always know what is happening at your facility and why."
  },
  {
    title: "Professionalism",
    icon: Heart,
    desc: "Our teams are uniformed, punctual, briefed, and trained. They represent FixFox — and by extension, your organisation."
  }
];

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* Header */}
      <section className="bg-white py-32 border-b border-slate-200 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <span className="section-label text-orange-500 border-orange-500/30 mb-8 inline-block">About FixFox</span>
            <h1 className="text-4xl md:text-8xl font-display font-black text-slate-900 mb-10 leading-[1.1] tracking-tight">
              Gujarat's Facility <br />
              <span className="text-orange-500">Management</span> Experts
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-3xl font-medium">
              We exist to make facility management effortless. Building the infrastructure that every facility manager deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="container-custom mb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-4xl font-display font-black text-slate-900">Who We Are</h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
              <p>
                FixFox Services Pvt. Ltd. is Ahmedabad's emerging integrated facility management company, built to replace the fragmented, unreliable world of multiple vendors with a single, accountable partner.
              </p>
              <p>
                We serve enterprises, housing societies, commercial complexes, and industrial facilities across Gujarat — delivering everything from daily housekeeping and electrical maintenance to catering, security, and IT support.
              </p>
              <p>
                Our founding belief is simple: facilities that run well don't happen by accident. They require trained professionals, structured processes, and a management team that treats every client's premises as if it were their own.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-orange-500 p-10 rounded-[2.5rem] text-white shadow-2xl hidden md:block border-4 border-white">
              <div className="text-5xl font-black mb-1">100%</div>
              <p className="text-sm font-black opacity-90 uppercase tracking-widest">Accountability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-custom mb-32">
        <div className="bg-slate-900 py-32 text-white rounded-[4rem] text-center max-w-5xl mx-auto relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.15),transparent_60%)]" />
          <div className="relative z-10 px-12">
            <div className="w-20 h-20 bg-orange-500/20 rounded-3xl flex items-center justify-center text-orange-500 mx-auto mb-10 border border-orange-500/20">
              <Target className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-6xl font-display font-black mb-10 tracking-tight">Our Mission</h2>
            <p className="text-2xl md:text-4xl text-orange-500 font-bold leading-tight mb-12 max-w-2xl mx-auto">
              To Raise the Standard of Facility Management Across Gujarat.
            </p>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium max-w-3xl mx-auto">
              We are building the infrastructure that every facility manager deserves — a single vendor who is accountable, proactive, transparent, and genuinely skilled across every service category.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 container-custom">
        <div className="text-center mb-16">
          <span className="section-label text-orange-500 border-orange-500/30 mb-6 inline-block">The FixFox Difference</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">This Isn't Just Outsourcing. <br /> It's a <span className="text-orange-500">Facility Partnership</span>.</h2>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-8 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">What Others Offer</th>
                <th className="p-8 text-xs font-black text-orange-500 uppercase tracking-[0.2em] border-b border-orange-100 bg-orange-50/30">What FixFox Delivers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ["Multiple vendors, multiple invoices", "One partner. One contract. One invoice."],
                ["No service guarantees", "SLA-backed commitments on every service"],
                ["Unverified, ad-hoc workers", "Trained, verified, uniformed professionals"],
                ["No reporting or documentation", "Monthly reports, attendance logs, compliance"],
                ["You manage the coordination", "Dedicated account manager handles everything"],
                ["Reactive — called when breaks", "Proactive — scheduled preventive maintenance"]
              ].map(([others, fixfox], i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-8 text-slate-500 font-bold">{others}</td>
                  <td className="p-8 text-slate-900 font-black bg-orange-50/10 group-hover:bg-orange-50/20">{fixfox}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50 container-custom">
        <div className="text-center mb-20">
          <span className="section-label text-orange-500 border-orange-500/30 mb-6 inline-block">What We Stand For</span>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight">Principles We Never Compromise On</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-200 group hover:shadow-2xl hover:border-orange-500/20 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 text-slate-900">
                <v.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{v.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="py-32 container-custom">
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[120px]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="section-label text-orange-500 border-orange-500/30 mb-8 inline-block">Our Commitment</span>
              <h2 className="text-4xl md:text-6xl font-display font-black mb-10 tracking-tight leading-tight">When You Choose FixFox, You Get More Than a Vendor</h2>
              <div className="space-y-6">
                {[
                  "A dedicated Account Manager who knows your facility",
                  "Full facility walkthrough before Day 1",
                  "Monthly service reports and attendance logs",
                  "Guaranteed response times for maintenance",
                  "A single escalation point — no more chasing vendors",
                  "Flexible contract structures — AMC or on-demand"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                    </div>
                    <span className="text-slate-300 font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              <div className="p-10 bg-slate-800/50 rounded-[3rem] border border-slate-700/50 backdrop-blur-sm shadow-2xl">
                <h3 className="text-3xl font-black mb-6 tracking-tight">Our Vision</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8 font-medium">
                  Our long-term vision is to build India's most trusted, technology-enabled facility management network — bringing corporate reliability with responsiveness.
                </p>
                <Link to="/contact" className="btn-primary w-full justify-center py-5">
                  Start Your Journey
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
