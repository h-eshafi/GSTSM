import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GenericPage from './pages/GenericPage';
import ActualitesPage from './pages/ActualitesPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditor from './pages/admin/AdminEditor';
import AdminSettings from './pages/admin/AdminSettings';
import AdminMenus from './pages/admin/AdminMenus';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSidebar from './components/admin/AdminSidebar';
import SideRail from './components/SideRail';
import Chatbot from './components/Chatbot';

function PublicLayout() {
  return (
    <div className="app">
      <Header />
      <SideRail />
      <Outlet />
      <Chatbot />
      <Footer />
    </div>
  );
}

function AdminLayout() {
  const isAuthenticated = localStorage.getItem('gst_admin_authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/le-gst" element={<GenericPage explicitSlug="qui-sommes-nous" />} />
          <Route path="/offre-de-soins" element={<GenericPage explicitSlug="offre-de-soins" />} />
          <Route path="/patients-proches" element={<GenericPage explicitSlug="patients-proches" />} />
          <Route path="/sante-publique" element={<GenericPage explicitSlug="sante-publique" />} />
          <Route path="/espace-professionnel" element={<GenericPage explicitSlug="espace-professionnel" />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/pages/:slug" element={<GenericPage />} />
        </Route>
        
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menus" element={<AdminMenus />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="new" element={<AdminEditor />} />
          <Route path="edit/:id" element={<AdminEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}
