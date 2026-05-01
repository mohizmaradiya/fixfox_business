import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smartphone, Mail, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-secondary p-1.5 rounded-xl transition-transform hover:rotate-12">
              <Settings className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className={cn(
              "text-2xl font-black tracking-tighter font-display",
              scrolled || location.pathname !== '/' ? "text-slate-900" : "text-white"
            )}>
              FIXFOX<span className="text-brand-secondary underline decoration-2 underline-offset-4">SERVICES</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-semibold transition-colors',
                  location.pathname === item.href
                    ? 'text-brand-secondary'
                    : scrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-brand-secondary' : 'text-slate-200 hover:text-white'
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary py-2 px-5 text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                scrolled || location.pathname !== '/' ? "text-slate-600" : "text-white"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block px-3 py-2 text-base font-medium rounded-md',
                    location.pathname === item.href
                      ? 'bg-slate-50 text-brand-secondary'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-secondary'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 px-3 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-center"
                >
                  Contact Us
                </Link>
                <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
                  <div className="flex items-center gap-1">
                    <Smartphone className="w-4 h-4" />
                    <span>+91 77770 94444</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>business@fixfox.in</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
