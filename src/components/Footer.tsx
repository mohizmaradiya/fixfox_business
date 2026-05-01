import { Link } from 'react-router-dom';
import { Smartphone, Mail, Linkedin, Instagram, Settings } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-secondary p-1.5 rounded-xl">
                <Settings className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter font-display text-white">
                FIXFOX<span className="text-brand-secondary">SERVICES</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Gujarat's Trusted Facility Management Partner. We deliver integrated solutions for enterprises, housing societies, and commercial spaces across Ahmedabad.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-brand-secondary hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-brand-secondary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold tracking-tight">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-brand-secondary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-secondary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-secondary transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-white font-bold tracking-tight">AMC & More</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-brand-secondary transition-colors">AMC Plans</Link></li>
              <li><Link to="/contact" className="hover:text-brand-secondary transition-colors">Request Audit</Link></li>
              <li><Link to="#" className="hover:text-brand-secondary transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-brand-secondary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold tracking-tight">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>business@fixfox.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>+91 77770 94444</span>
              </li>
              <li className="flex items-start gap-3">
                <MapMarker className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 FixFox Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>One Contract. One Team. Zero Chaos.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MapMarker(props: any) {
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
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
