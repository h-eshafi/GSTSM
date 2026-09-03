import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GenericPage from './pages/GenericPage';
import ActualitesPage from './pages/ActualitesPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditor from './pages/admin/AdminEditor';


function PublicLayout() {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return <Outlet />;
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
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="new" element={<AdminEditor />} />
          <Route path="edit/:id" element={<AdminEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}
