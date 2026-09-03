import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMenuData } from '../lib/menuStore';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [megaMenuData, setMegaMenuData] = useState<Record<string, any>>(getMenuData());
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setMegaMenuData(getMenuData());
    };
    window.addEventListener('gst_menu_updated', handleUpdate);
    return () => window.removeEventListener('gst_menu_updated', handleUpdate);
  }, []);

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <header>
      <Link to="/" className="logo">
        <img src="/gst-logo.png" alt="Groupement Sanitaire Territorial de la Région Souss-Massa" />
      </Link>
      <button 
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
        aria-expanded={isMobileMenuOpen} 
        aria-label="Ouvrir le menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <i></i><i></i><i></i>
      </button>
      <nav className={isMobileMenuOpen ? 'active' : ''}>
        <button className={activeMenu === 'gst' ? 'active' : ''} onMouseEnter={() => handleMouseEnter('gst')} onMouseLeave={handleMouseLeave}>Le GST Souss-Massa<b aria-hidden="true">›</b></button>
        <button className={activeMenu === 'patients' ? 'active' : ''} onMouseEnter={() => handleMouseEnter('patients')} onMouseLeave={handleMouseLeave}>Patients et proches<b aria-hidden="true">›</b></button>
        <button className={activeMenu === 'offre' ? 'active' : ''} onMouseEnter={() => handleMouseEnter('offre')} onMouseLeave={handleMouseLeave}>Offre de soins<b aria-hidden="true">›</b></button>
        <button className={activeMenu === 'sante' ? 'active' : ''} onMouseEnter={() => handleMouseEnter('sante')} onMouseLeave={handleMouseLeave}>Santé publique<b aria-hidden="true">›</b></button>
        <button className={activeMenu === 'espace' ? 'active' : ''} onMouseEnter={() => handleMouseEnter('espace')} onMouseLeave={handleMouseLeave}>Espace professionnel<b aria-hidden="true">›</b></button>
        <button className={activeMenu === 'actu' ? 'active' : ''} onMouseEnter={() => handleMouseEnter('actu')} onMouseLeave={handleMouseLeave}>Actualités et médias<b aria-hidden="true">›</b></button>
      </nav>
      <div className="site-search">
        <input aria-label="Rechercher sur le site" placeholder="Rechercher un service, un établissement…" />
        <button aria-label="Ouvrir la recherche">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.4"></circle>
            <path d="m16 16 4.2 4.2"></path>
          </svg>
        </button>
      </div>
      
      <div 
        id="mega-menu-container" 
        style={{ display: activeMenu ? 'block' : 'none' }}
        onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
        onMouseLeave={handleMouseLeave}
      >
        {activeMenu && megaMenuData[activeMenu] && (
          <div className={megaMenuData[activeMenu].class}>
            <div className="mega-columns">
              {megaMenuData[activeMenu].previewGroups ? (
                megaMenuData[activeMenu].previewGroups.map((group: any, idx: number) => (
                  <div className="preview-group" key={idx}>
                    <Link to={group.href.replace('.html', '')} className="mega-section-link" onClick={() => { setActiveMenu(null); setIsMobileMenuOpen(false); }}>
                        <h3>{group.title}</h3>
                        <b>→</b>
                    </Link>
                    <p className="menu-preview">{group.desc}</p>
                  </div>
                ))
              ) : (
                megaMenuData[activeMenu].columns.map((col: any, idx: number) => (
                  <div key={idx}>
                    <h3>{col.title}</h3>
                    {col.links.map((link: any, linkIdx: number) => (
                      <Link to={link.href.replace('.html', '')} key={linkIdx} onClick={() => { setActiveMenu(null); setIsMobileMenuOpen(false); }}>
                        <span>{link.label}</span><b>›</b>
                      </Link>
                    ))}
                  </div>
                ))
              )}
              {megaMenuData[activeMenu].art && (
                <div className="menu-art">
                  <div className="menu-photo">
                    <img src={megaMenuData[activeMenu].art.img} alt={megaMenuData[activeMenu].art.title} />
                    <span>{megaMenuData[activeMenu].art.tag}</span>
                  </div>
                  <h4>{megaMenuData[activeMenu].art.title}</h4>
                  <Link to={megaMenuData[activeMenu].art.href.replace('.html', '')}>Découvrir <b>→</b></Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {activeMenu && (
        <div 
          id="mega-veil" 
          className="veil" 
          style={{ display: 'block' }} 
          onClick={() => setActiveMenu(null)}
        ></div>
      )}
    </header>
  );
}
