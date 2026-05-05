import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Leads from './pages/admin/Leads';
import Clients from './pages/admin/Clients';
import Projects from './pages/admin/Projects';
import Staff from './pages/admin/Staff';
import Login from './pages/admin/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/services"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Services />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="clients" element={<Clients />} />
          <Route path="projects" element={<Projects />} />
          <Route path="staff" element={<Staff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
