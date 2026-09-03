// Interactive Features for GST Souss-Massa Prototype (Stripped for Next.js)

function initInteractive() {
    // 2. Search Toggle
    const searchBtn = document.querySelector('.site-search button');
    const searchInput = document.querySelector('.site-search input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchInput.focus();
        });
    }

    // 5. Interactive Chatbot Drawer
    const chatbot = document.querySelector('.chatbot');
    const chatLaunch = document.querySelector('.chat-launch');
    if (chatbot && chatLaunch) {
        chatLaunch.addEventListener('click', (e) => {
            e.stopPropagation();
            if (chatbot.classList.contains('open')) {
                chatbot.classList.remove('open');
                const drawer = chatbot.querySelector('section');
                if (drawer) drawer.remove();
            } else {
                chatbot.classList.add('open');
                const drawer = document.createElement('section');
                drawer.innerHTML = `
                    <header>
                        <i>✦</i>
                        <div>
                            <b>Besoin d’aide ?</b>
                            <small>Assistant GST Souss-Massa</small>
                        </div>
                    </header>
                    <div class="chat-body">
                        <p>Bonjour ! Je suis l’assistant virtuel du GST Souss-Massa. Comment puis-je vous orienter aujourd’hui ?</p>
                        <button onclick="location.href='/offre-de-soins'">Trouver un établissement <b>↗</b></button>
                        <button onclick="location.href='/rendez-vous'">Prendre rendez-vous <b>↗</b></button>
                        <button onclick="location.href='/urgences'">J’ai une urgence <b>↗</b></button>
                        <button onclick="location.href='/centre-decoute'" class="chat-more">Voir toutes les questions →</button>
                    </div>
                    <footer>Information et orientation régionale</footer>
                `;
                chatbot.appendChild(drawer);
            }
        });
    }

    // 7. Interactive Territory Map Switcher
    const mapButtons = document.querySelectorAll('.map-shell aside button');
    const mapIframe = document.querySelector('.live-map iframe');
    const mapDetailTitle = document.querySelector('.territory-detail h3');
    const mapDetailDesc = document.querySelector('.territory-detail p');

    const territoryData = {
        'Agadir': {
            desc: 'Hôpitaux universitaires Mohammed VI et Hôpital régional Hassan II',
            bbox: '-9.85,30.20,-9.25,30.65',
            marker: '30.4278,-9.5981'
        },
        'Inezgane': {
            desc: 'Hôpital provincial d’Inezgane et structures de proximité',
            bbox: '-9.60,30.30,-9.40,30.45',
            marker: '30.3556,-9.5383'
        },
        'Chtouka Aït Baha': {
            desc: 'Hôpital de Biougra et réseau de soins primaires',
            bbox: '-9.45,30.00,-9.00,30.30',
            marker: '30.2144,-9.3708'
        },
        'Taroudant': {
            desc: 'Hôpital Mokhtar Soussi et réseau d’établissements de Taroudant',
            bbox: '-9.00,30.30,-8.70,30.60',
            marker: '30.4703,-8.8770'
        },
        'Tiznit': {
            desc: 'Hôpital Hassan Ier et centres de santé de Tiznit',
            bbox: '-9.80,29.60,-9.60,29.80',
            marker: '29.6974,-9.7316'
        },
        'Tata': {
            desc: 'Hôpital provincial de Tata et offre de soins de proximité',
            bbox: '-8.10,29.60,-7.80,29.80',
            marker: '29.7431,-7.9745'
        }
    };

    if (mapButtons.length > 0 && mapIframe) {
        mapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                mapButtons.forEach(b => {
                    b.classList.remove('active');
                    const checkMark = b.querySelector('b');
                    if (checkMark) checkMark.textContent = '→';
                });

                btn.classList.add('active');
                const checkMark = btn.querySelector('b');
                if (checkMark) checkMark.textContent = '✓';

                const provinceSpan = btn.querySelector('span');
                if (provinceSpan) {
                    const provinceName = provinceSpan.textContent.trim();
                    const data = territoryData[provinceName];
                    if (data) {
                        if (mapDetailTitle) mapDetailTitle.textContent = provinceName;
                        if (mapDetailDesc) mapDetailDesc.textContent = data.desc;
                        mapIframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(data.bbox)}&layer=mapnik&marker=${encodeURIComponent(data.marker)}`;
                    }
                }
            });
        });
    }
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInteractive);
    } else {
        initInteractive();
    }
}

