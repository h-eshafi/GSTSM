import Link from 'next/link';

export default function LeGstPage() {
    return (
        <main>
            <section className="content-hero" id="who">
                <div>
                    <span>Le GST Souss-Massa</span>
                    <h1>Qui sommes-nous ?</h1>
                    <p>Une organisation publique régionale qui réunit les établissements de santé de son territoire pour construire une offre de soins plus accessible, coordonnée et adaptée aux besoins de la population.</p>
                </div>
                <img src="/gst-scene-2.png" alt="Professionnels de santé du réseau régional Souss-Massa"/>
            </section>

            <div className="rich-content">
                <section style={{ marginBottom: '60px' }}>
                    <span className="section-kicker">Une gouvernance sanitaire régionale</span>
                    <h2 style={{ fontSize: '36px', color: 'var(--navy)', marginBottom: '15px' }}>Un réseau unique au service de plus de trois millions d’habitants</h2>
                    <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '850px', lineHeight: '1.7' }}>
                        Le Groupement Sanitaire Territorial de la Région Souss-Massa est un établissement public doté de la personnalité morale et de l’autonomie financière. Son ambition est de faire de la région une unité cohérente de planification, d’exécution et d’évaluation, dans laquelle chaque établissement devient un maillon d’un parcours intégré de soins.
                    </p>

                    <div className="gst-stats" style={{ marginTop: '40px', padding: '0' }}>
                        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--teal)' }}>Repères sur le territoire</h2>
                        <div>
                            <article><b>3 020 431</b><span>Population régionale · HCP 2024</span></article>
                            <article><b>6</b><span>préfectures et provinces (Agadir Ida-Outanane, Inezgane-Aït Melloul, Chtouka-Aït Baha, Taroudant, Tiznit et Tata)</span></article>
                            <article><b>6</b><span>districts sanitaires (Organisation territoriale du réseau)</span></article>
                            <article><b>3</b><span>niveaux de soins (Primaire, secondaire et tertiaire)</span></article>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <span className="section-kicker">Organiser la santé à l’échelle du territoire</span>
                    <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '30px' }}>Le GST ne constitue pas seulement une nouvelle structure administrative. Il rapproche la décision des réalités locales et organise la complémentarité de l’ensemble du réseau de santé.</p>
                    
                    <div className="content-sections">
                        <article>
                            <i>01</i>
                            <div>
                                <h2>Planifier l’offre régionale</h2>
                                <p>Adapter les ressources, les investissements et les filières de soins aux besoins réels de la population.</p>
                            </div>
                        </article>
                        <article>
                            <i>02</i>
                            <div>
                                <h2>Coordonner les parcours</h2>
                                <p>Relier les soins de proximité, les hôpitaux provinciaux et régionaux et les hôpitaux universitaires.</p>
                            </div>
                        </article>
                        <article>
                            <i>03</i>
                            <div>
                                <h2>Protéger la population</h2>
                                <p>Déployer la prévention, les programmes de santé publique, la veille épidémiologique et la gestion des risques sanitaires.</p>
                            </div>
                        </article>
                        <article>
                            <i>04</i>
                            <div>
                                <h2>Améliorer la qualité</h2>
                                <p>Piloter la sécurité du patient, la performance, la recherche, l’innovation et la transformation numérique.</p>
                            </div>
                        </article>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }} id="care-levels">
                    <span className="section-kicker">Une région, un réseau</span>
                    <h2 style={{ fontSize: '32px', color: 'var(--navy)', marginBottom: '15px' }}>Le bon soin, au bon niveau, au bon moment</h2>
                    <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>La branche sanitaire du GST articule trois niveaux complémentaires. L’objectif est d’améliorer l’orientation, de limiter les déplacements inutiles et d’assurer la continuité de la prise en charge.</p>

                    <div className="care-levels">
                        <Link href="/offre-de-soins" style={{ textDecoration: 'none', display: 'contents' }}>
                            <button style={{ cursor: 'pointer' }}>
                                <i>3</i>
                                <span>Niveau tertiaire</span>
                                <h3>Hôpitaux universitaires</h3>
                                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>Expertise universitaire, soins spécialisés, enseignement et recherche.</p>
                                <b>Découvrir ›</b>
                            </button>
                        </Link>
                        <Link href="/offre-de-soins" style={{ textDecoration: 'none', display: 'contents' }}>
                            <button style={{ cursor: 'pointer' }}>
                                <i>2</i>
                                <span>Niveau secondaire</span>
                                <h3>Espaces et districts sanitaires</h3>
                                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>Hôpitaux de proximité, provinciaux et régionaux organisés par territoire.</p>
                                <b>Découvrir ›</b>
                            </button>
                        </Link>
                        <Link href="/offre-de-soins" style={{ textDecoration: 'none', display: 'contents' }}>
                            <button style={{ cursor: 'pointer' }}>
                                <i>1</i>
                                <span>Niveau primaire</span>
                                <h3>Soins de proximité</h3>
                                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>Le premier point d’entrée : prévention, médecine de famille et proximité.</p>
                                <b>Découvrir ›</b>
                            </button>
                        </Link>
                    </div>
                </section>

                <section className="director-page" id="director" style={{ marginBottom: '60px', padding: '40px 0' }}>
                    <div className="director-photo">
                        <div>
                            <img src="/gst-logo.png" alt="GST Souss-Massa Logo" style={{ width: '200px', marginBottom: '20px' }}/>
                            <span>Direction Générale</span>
                            <small>Photographie officielle à insérer après réception</small>
                        </div>
                    </div>
                    <div>
                        <span className="section-kicker">Mot du Directeur Général</span>
                        <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>M. Tarik El Harti</h1>
                        <h2 style={{ color: 'var(--teal)', fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Directeur Général du Groupement Sanitaire Territorial de la Région Souss-Massa</h2>
                        <p style={{ fontStyle: 'italic', color: '#526477', marginBottom: '15px' }}>M. Tarik El Harti a été nommé à cette fonction le 9 avril 2026.</p>
                        <blockquote style={{ borderLeft: '4px solid var(--green)', color: '#405d54', background: '#f3f9f5', padding: '20px 24px', fontSize: '16px' }}>
                            Le mot institutionnel du Directeur Général sera intégré ici après validation de sa version officielle.
                        </blockquote>
                    </div>
                </section>

                <section id="orggeneral" style={{ padding: '40px 3vw', background: '#f8fbfc', border: '1px solid #dce8ed', borderRadius: '24px', marginBottom: '60px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px' }}>
                        <span className="section-kicker">Gouvernance et statut du GST Souss-Massa</span>
                        <h2 style={{ fontSize: '36px', color: 'var(--navy)', marginBottom: '15px' }}>Une organisation régionale intégrée</h2>
                        <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>Établissement public doté de la personnalité morale et de l’autonomie financière, le Groupement Sanitaire Territorial organise la gouvernance sanitaire à l’échelle de la Région Souss-Massa.</p>
                        <p style={{ color: 'var(--muted)', lineHeight: '1.7', marginTop: '10px' }}>Le Conseil d’administration constitue l’organe de gouvernance du Groupement. La Direction générale assure la mise en œuvre de ses orientations et coordonne les composantes sanitaires, administratives et transversales.</p>
                    </div>

                    <div className="org-top">
                        <i>🏛</i>
                        <div>
                            <h3 style={{ margin: '0', fontSize: '20px' }}>Conseil d’Administration</h3>
                            <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Organe de gouvernance du GST Souss-Massa</span>
                        </div>
                    </div>

                    <div className="org-cards cols-4" style={{ marginTop: '40px' }}>
                        <button style={{ cursor: 'pointer' }}>
                            <i>📊</i>
                            <h3>Pôle de pilotage et de gouvernance générale</h3>
                            <p>Stratégie et santé publique, soins de santé primaires, systèmes d’information, audit et qualité, recherche, communication et appui au contrôle.</p>
                            <span>Découvrir ›</span>
                        </button>
                        <button style={{ cursor: 'pointer' }}>
                            <i>🩺</i>
                            <h3>Branche sanitaire</h3>
                            <p>Organisation et coordination des structures sanitaires du territoire selon les niveaux primaire, secondaire et tertiaire.</p>
                            <span>Découvrir ›</span>
                        </button>
                        <button style={{ cursor: 'pointer' }}>
                            <i>💼</i>
                            <h3>Branche administrative</h3>
                            <p>Pilotage des ressources humaines, des finances, des achats, de la logistique, de l’ingénierie, de la maintenance et du patrimoine.</p>
                            <span>Découvrir ›</span>
                        </button>
                        <button style={{ cursor: 'pointer' }}>
                            <i>👥</i>
                            <h3>Comités et instances</h3>
                            <p>Instances de concertation, de coordination et de suivi qui accompagnent la gouvernance (Comité hospitalo-universitaire, Comité de pilotage).</p>
                            <span>Découvrir ›</span>
                        </button>
                    </div>
                </section>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
