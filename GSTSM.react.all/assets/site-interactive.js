// Interactive Mega-Menu and Mobile Navigation JS for GST Souss-Massa Prototype
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('header nav');
  if (!nav) return;

  // Create backdrop veil if not present
  let veil = document.querySelector('.veil');
  if (!veil) {
    veil = document.createElement('div');
    veil.className = 'veil';
    veil.style.display = 'none';
    document.body.appendChild(veil);
  }

  // Mega Menu Data Definition
  const megaData = {
    'le-gst': {
      title: 'Le GST Souss-Massa',
      cols: [
        {
          heading: 'Présentation & Governance',
          links: [
            { label: 'Qui sommes-nous ?', href: '/le-gst/qui-sommes-nous.html' },
            { label: 'Mot du Directeur Général', href: '/le-gst/mot-du-directeur-general.html' },
            { label: 'Missions, vision et valeurs', href: '/le-gst/missions-vision-valeurs.html' },
            { label: 'Chiffres clés', href: '/le-gst/chiffres-cles.html' }
          ]
        }
      ],
      artTitle: 'Chiffres clés du territoire',
      artImg: '/gst-scene-2.png'
    },
    'patients-et-proches': {
      title: 'Patients et proches',
      cols: [
        {
          heading: 'Urgences & Consultations',
          links: [
            { label: 'Urgences et SAMU 141', href: '/patients-et-proches/urgences-samu.html' },
            { label: 'Quand appeler le SAMU ?', href: '/patients-et-proches/quand-appeler-le-samu.html' },
            { label: 'Prendre un rendez-vous', href: '/patients-et-proches/prendre-un-rendez-vous.html' },
            { label: 'Préparer sa consultation', href: '/patients-et-proches/preparer-sa-consultation.html' }
          ]
        },
        {
          heading: 'Hospitalisation & Droits',
          links: [
            { label: 'Préparer son hospitalisation', href: '/patients-et-proches/preparer-son-hospitalisation.html' },
            { label: 'Pendant l’hospitalisation', href: '/patients-et-proches/pendant-l-hospitalisation.html' },
            { label: 'Sortie et continuité des soins', href: '/patients-et-proches/sortie-et-continuite-des-soins.html' },
            { label: 'Droits et obligations du patient', href: '/patients-et-proches/droits-et-obligations-du-patient.html' }
          ]
        }
      ],
      artTitle: 'Parcours patient humanisé',
      artImg: '/prevention.png'
    },
    'offre-de-soins': {
      title: 'Offre de soins',
      cols: [
        {
          heading: 'Proximité & Hospitalier',
          links: [
            { label: 'Soins de santé primaires (ESSP)', href: '/offre-de-soins/etablissements-de-soins-de-sante-primaires.html' },
            { label: 'Établissements médico-sociaux', href: '/offre-de-soins/etablissements-medico-sociaux.html' },
            { label: 'Hôpitaux régionaux et provinciaux', href: '/offre-de-soins/hopitaux-regionaux-et-provinciaux.html' },
            { label: 'CHU Mohammed VI Spécialités', href: '/offre-de-soins/chu-mohammed-vi-specialites.html' }
          ]
        }
      ],
      artTitle: 'Plateau technique moderne',
      artImg: '/hospital.png'
    },
    'sante-publique': {
      title: 'Santé publique',
      cols: [
        {
          heading: 'Prévention & Programmes',
          links: [
            { label: 'Prévention et promotion de la santé', href: '/sante-publique/prevention-et-promotion-de-la-sante.html' },
            { label: 'Programmes de santé publique', href: '/sante-publique/programmes-de-sante-publique.html' },
            { label: 'Surveillance et sécurité sanitaires', href: '/sante-publique/surveillance-et-securite-sanitaires.html' },
            { label: 'Mobilisation communautaire', href: '/sante-publique/mobilisation-communautaire.html' }
          ]
        }
      ],
      artTitle: 'Prévention et santé globale',
      artImg: '/prevention.png'
    },
    'espace-professionnel': {
      title: 'Espace professionnel',
      cols: [
        {
          heading: 'Carrière & Opportunités',
          links: [
            { label: 'Concours et résultats', href: '/espace-professionnel/concours-et-resultats.html' },
            { label: 'Appels à candidature', href: '/espace-professionnel/appels-a-candidature.html' },
            { label: 'Appels d’offres et marchés', href: '/espace-professionnel/appels-d-offres.html' },
            { label: 'Publications scientifiques', href: '/espace-professionnel/publications-scientifiques.html' }
          ]
        }
      ],
      artTitle: 'Recherche et recrutement',
      artImg: '/gst-scene-3.png'
    },
    'actualites-et-medias': {
      title: 'Actualités et médias',
      cols: [
        {
          heading: 'Information & Agenda',
          links: [
            { label: 'Toutes les actualités', href: '/actualites-et-medias/toutes-les-actualites.html' },
            { label: 'Communiqués de presse', href: '/actualites-et-medias/toutes-les-actualites.html' },
            { label: 'Événements et colloques', href: '/actualites-et-medias/evenements.html' },
            { label: 'Dossiers et revue de presse', href: '/actualites-et-medias/toutes-les-actualites.html' }
          ]
        }
      ],
      artTitle: 'Vie régionale du GST',
      artImg: '/event.png'
    }
  };

  // Helper to resolve relative path prefix
  const getPrefix = () => {
    const depth = (window.location.pathname.match(/\//g) || []).length;
    return depth > 2 ? '../' : './';
  };

  // Build mega menu element
  let megaContainer = document.querySelector('.mega');
  if (!megaContainer) {
    megaContainer = document.createElement('div');
    megaContainer.className = 'mega';
    megaContainer.style.display = 'none';
    document.body.appendChild(megaContainer);
  }

  function showMega(key) {
    const data = megaData[key];
    if (!data) return;
    const prefix = getPrefix();

    let colsHtml = data.cols.map(col => `
      <div>
        <h3>${col.heading}</h3>
        ${col.links.map(l => `
          <button onclick="location.href='${prefix}${l.href.replace(/^\//, '')}'">
            <span>${l.label}</span>
            <b aria-hidden="true">›</b>
          </button>
        `).join('')}
      </div>
    `).join('');

    megaContainer.innerHTML = `
      <div class="mega-columns">
        ${colsHtml}
        <div class="menu-art">
          <div class="menu-photo">
            <img src="${prefix}${data.artImg.replace(/^\//, '')}" alt="${data.artTitle}" />
            <span>INSTITUTIONNEL</span>
          </div>
          <h4>${data.artTitle}</h4>
          <button onclick="location.href='${prefix}${key}/qui-sommes-nous.html'">
            <span>Explorer la rubrique</span>
            <b>→</b>
          </button>
        </div>
      </div>
    `;

    megaContainer.style.display = 'block';
    veil.style.display = 'block';
  }

  function hideMega() {
    megaContainer.style.display = 'none';
    veil.style.display = 'none';
  }

  // Attach hover events to nav items
  const navButtons = nav.querySelectorAll('a, button');
  navButtons.forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();
    let key = '';
    if (text.includes('le gst')) key = 'le-gst';
    else if (text.includes('patient')) key = 'patients-et-proches';
    else if (text.includes('offre de soins')) key = 'offre-de-soins';
    else if (text.includes('santé publique')) key = 'sante-publique';
    else if (text.includes('professionnel')) key = 'espace-professionnel';
    else if (text.includes('actualité')) key = 'actualites-et-medias';

    if (key) {
      btn.addEventListener('mouseenter', () => showMega(key));
    }
  });

  document.querySelector('header').addEventListener('mouseleave', hideMega);
  veil.addEventListener('click', hideMega);
});
