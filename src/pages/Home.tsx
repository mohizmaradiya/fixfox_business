import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ShieldCheck, Users, Building2, Headset, CheckCircle2, ArrowRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Infrastructure Excellence Delivered.",
    subtitle: "From daily housekeeping and MEP maintenance to security, catering, and IT support — FixFox delivers integrated facility management for enterprises and commercial spaces across Gujarat.",
    pretitle: "Gujarat's Leading B2B Platform",
    cta: "New Service Request +",
    secondaryCta: "Explore Services",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Regional Distribution. Live Monitoring.",
    subtitle: "Trained, verified, and uniformed professionals. Scheduled service. Real-time accountability. We bring transparency to your facility operations with 98.4% SLA compliance.",
    pretitle: "Accountable Partnership",
    cta: "Request Free Audit",
    secondaryCta: "See Our Process",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
  }
];

const stats = [
  { label: 'Active Sites', value: '142', icon: ShieldCheck, trend: '↑ 12%' },
  { label: 'Staff Count', value: '450+', icon: Users, trend: 'Verified' },
  { label: 'Sq. Ft Managed', value: '12M+', icon: Building2, trend: 'Gujarat wide' },
  { label: 'Support Available', value: '24/7', icon: Headset, trend: 'Uninterrupted' },
];

const services = [
  { title: "Cleaning Services", desc: "Professional housekeeping, deep cleaning, sanitisation, and waste management for offices, factories, and housing societies. Daily, weekly, or on-demand schedules." },
  { title: "MEP Services", desc: "Mechanical, Electrical, and Plumbing maintenance by certified technicians. Preventive schedules, emergency response, and compliance checks." },
  { title: "Household Services", desc: "Carpentry, painting, masonry, carpet maintenance, and décor services. Scheduled maintenance or one-time project work." },
  { title: "Food & Catering", desc: "Corporate canteen management, tiffin services, personal chef assignments, and event catering. Hygienic, timely, and customisable." },
  { title: "IT Services", desc: "Web development, digital marketing, app development, and graphic design support. A reliable tech partner for your business operations." },
  { title: "Personal Services", desc: "Security personnel, maid services, tailoring, beauty, and wellness services — everything to support your workforce on-site." },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10" />
            <img 
              src={slides[currentSlide].image} 
              alt="Slide" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 h-full flex items-center">
          <div className="container-custom">
            <motion.div
              key={currentSlide + 'content'}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/30 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                {slides[currentSlide].pretitle}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 group">
                  {slides[currentSlide].cta}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="px-6 py-3 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-center">
                  {slides[currentSlide].secondaryCta}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-10 right-10 z-30 flex gap-4">
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 group hover:shadow-xl hover:bg-white transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-brand-secondary group-hover:text-white transition-all">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-brand-secondary bg-orange-50 px-2 py-1 rounded tracking-tighter">
                    {stat.trend}
                  </span>
                </div>
                <div className="text-4xl font-black text-slate-800 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label">Why FixFox</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
                Gujarat's Most Trusted Integrated Facility Management Partner
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  FixFox was built to solve a problem every facility manager knows well: too many vendors, too little accountability, and too much time spent chasing people.
                </p>
                <p>
                  We built a single platform that puts every facility service under one roof — and backs it with trained professionals, structured processes, and real accountability at every step.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                  Learn More About Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-4"
            >
              {[
                "ISO-process aligned service delivery",
                "Verified and uniformed service professionals",
                "Dedicated account manager for every client",
                "Monthly service reports and compliance documentation",
                "SLA-backed Annual Maintenance Contracts (AMC)",
                "Single-point escalation — no more chasing vendors"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                  <div className="p-1 bg-green-100 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container-custom text-center mb-16">
          <span className="section-label">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Everything Your Premises Needs
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            From critical infrastructure upkeep to daily operational services, FixFox delivers over 11 categories of professional facility management under a single, accountable contract.
          </p>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-brand-secondary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-brand-secondary group-hover:text-white transition-all">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-secondary transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-6 font-medium">Don't see what you need? We customise service bundles for every facility.</p>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              Request a Custom Scope
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-secondary font-bold tracking-widest text-sm uppercase mb-2 block">Our Process</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">Simple to Start.<br />Reliable to Run.</h2>
            </div>
            <p className="text-slate-400 max-w-md">
              Getting FixFox into your facility takes less than a week. Here's how it works:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Free Facility Audit', desc: 'Our team visits your premises, assesses your setup, and recommends a plan — no cost or obligation.' },
              { num: '02', title: 'Custom Proposal', desc: 'We present a detailed service proposal with clear scope, SLAs, and pricing. No hidden charges.' },
              { num: '03', title: 'Team Deployment', desc: 'Our verified, uniformed professionals are deployed as per schedule and briefed on requirements.' },
              { num: '04', title: 'Monitor & Improve', desc: 'You receive monthly service reports and attendance records. We proactively flag issues.' }
            ].map((step, idx) => (
              <div key={idx} className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl font-black text-brand-secondary/20 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-brand-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Upgrade Your Facility Management?</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Get a free no-obligation facility audit from our experts. We'll assess your premises and deliver a customised proposal within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:translate-y-[-2px]">
                  Book a Free Facility Audit
                </Link>
                <div className="flex flex-col justify-center px-4">
                  <span className="text-sm font-medium text-orange-200 mb-1 opacity-70">Call Us Directly</span>
                  <span className="text-lg font-bold text-white">+91 77770 94444</span>
                </div>
              </div>
              <p className="mt-8 text-sm text-blue-200">No commitment required. No consultant fees. Just a clearer picture of your needs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
