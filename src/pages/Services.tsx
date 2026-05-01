import { motion } from 'motion/react';
import { 
  Brush, Wrench, Home, Utensils, Laptop, Users, Zap, 
  ChevronRight, CheckCircle2, MessageSquare, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    order: "01",
    title: "Cleaning Services",
    icon: Brush,
    desc: "A clean facility is a productive facility. FixFox delivers professional cleaning solutions for offices, housing societies, industrial units, and commercial spaces. Our cleaning teams are trained, uniformed, equipped with professional-grade tools, and supervised to ensure consistent quality every time.",
    items: [
      "House / Society Cleaning — Common areas, lobbies, staircases.",
      "Laundry Services — For hospitality, healthcare, and residential.",
      "Car Cleaning Services — Regular vehicle cleaning for fleets.",
      "Office Cleaning — Daily housekeeping, deep cleaning, and sanitisation."
    ]
  },
  {
    order: "02",
    title: "MEP Services",
    icon: Wrench,
    desc: "Mechanical, Electrical & Plumbing (MEP) infrastructure is the backbone of any facility. FixFox provides certified MEP professionals who manage preventive schedules, handle emergency breakdowns, and ensure your systems remain compliant and fully operational.",
    items: [
      "Electrical Services — Panel maintenance, wiring, fixtures, safety audits.",
      "Mechanical / HVAC — AC servicing, ventilation, pump maintenance.",
      "Plumbing Services — Pipe maintenance, drainage, water systems."
    ]
  },
  {
    order: "03",
    title: "Household / General Maintenance",
    icon: Home,
    desc: "Every facility requires ongoing upkeep across its physical structure and interior spaces. FixFox provides skilled tradespeople for all general maintenance needs — deployed on a scheduled basis or called in on-demand.",
    items: [
      "Carpentry — Furniture repairs, custom woodwork.",
      "Painting & Wall Finishing — Interior and exterior touch-ups.",
      "Masonry — Tiling, plastering, concrete repairs.",
      "Carpet & Flooring — Deep cleaning, repairs, and installation."
    ]
  },
  {
    order: "04",
    title: "Food & Catering",
    icon: Utensils,
    desc: "A well-fed workforce is a productive workforce. FixFox manages corporate canteens, deploys personal chefs, and handles event catering — all with a strong focus on hygiene, nutritional quality, and timely delivery.",
    items: [
      "Corporate Canteen Management — Full operations including daily management.",
      "Tiffin Services — Reliable daily meal delivery.",
      "Personal Chef Services — Dedicated on-site chef for executives.",
      "Catering for Events — Office events, society gatherings, corporate lunches."
    ]
  },
  {
    order: "05",
    title: "IT & Digital Services",
    icon: Laptop,
    desc: "FixFox extends its ecosystem into the digital space. Our IT division supports businesses from building websites and apps to managing digital presence and branding. For facilities that need tech infrastructure support alongside physical services.",
    items: [
      "Web Development — Professional websites for enterprises and businesses.",
      "App Development — Android and iOS applications.",
      "Digital Marketing — SEO, social media, and paid ads.",
      "Graphic Design — Brand identity, signage, and print."
    ]
  },
  {
    order: "06",
    title: "Personal & Workforce Support",
    icon: Users,
    desc: "Your facility's people are its most important asset. FixFox supports your workforce with on-site personal services that improve day-to-day comfort, safety, and wellbeing — from security to beauty services.",
    items: [
      "Security Services — Trained guards, patrol services, entry management.",
      "Maid / Housekeeping Staff — Dedicated or shared staff.",
      "Tailor Services — On-site or managed tailoring for uniforms.",
      "Beauty & Wellness — On-site parlour services for campuses."
    ]
  },
  {
    order: "07",
    title: "Child & Elder Care",
    icon: HeartHeader,
    desc: "FixFox recognises that a great facility serves the whole community. Our child care and elder care services are delivered by trained, compassionate professionals who prioritise safety and dignity.",
    items: [
      "Child Care / Crèche — Supervised childcare for corporate campuses.",
      "Old Age Care — Trained caregivers for senior residents."
    ]
  },
  {
    order: "08",
    title: "Special / On-Demand",
    icon: Zap,
    desc: "Have a unique facility requirement that doesn't fit a standard category? FixFox handles custom, one-time, and specialised service requests across all domains. Tell us what you need — we'll scope it, staff it, and deliver it.",
    items: [
      "Custom Facility Requirements — One call to FixFox, we do the rest.",
      "Specialised Event Support — Tailored logistics and management."
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_50%)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="section-label text-orange-500 border-orange-500/30 mb-6">Our Services</span>
            <h1 className="text-4xl md:text-7xl font-display font-black mb-8 tracking-tight">
              Complete Facility <span className="text-orange-500">Solutions</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium">
              FixFox covers every facility need under a single, accountable partnership. From routine maintenance to specialised professional services — we deliver quality you can measure.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 container-custom">
        <div className="space-y-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 grid lg:grid-cols-12 gap-12 group hover:shadow-2xl hover:border-orange-500/20 transition-all duration-500"
            >
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-1 block">Category {service.order}</span>
                      <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 leading-tight">{service.title}</h2>
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                    {service.desc}
                  </p>
                </div>
                <Link to="/contact" className="btn-primary w-fit inline-flex items-center gap-2">
                  Enquire for {service.title}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-7 bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Sub-categories & Solutions
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {service.items.map((item, j) => {
                    const [title, desc] = item.split(' — ');
                    return (
                      <div key={j} className="flex gap-4">
                        <div className="mt-1">
                          <CheckCircle2 className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1 leading-tight">{title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container-custom pb-20">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent_70%)]" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500 mx-auto mb-10 border border-orange-500/20">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-6xl font-display font-black text-white mb-8 tracking-tight">
              Need Multiple Services? <br className="hidden md:block" /> That's <span className="text-orange-500">Exactly</span> What We're Built For.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Most of our clients engage FixFox across 3 to 6 service categories under a single Annual Maintenance Contract. You get simplified billing, one account manager, and guaranteed service consistency.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact" className="btn-primary py-5 px-12 text-lg">
                Request a Free Facility Audit
              </Link>
              <a href="tel:+917777094444" className="flex items-center justify-center gap-3 text-white font-black hover:text-orange-500 transition-colors group text-lg">
                Talk to Our Team
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeartHeader(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
