import Link from 'next/link';

export default function CentreDecoutePage() {
    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Information & Orientation</span>
                    <h1>Centre d’écoute et d’orientation</h1>
                    <p>Le Centre d’écoute constitue une porte d’entrée pour informer, orienter et recueillir les remarques et suggestions des patients, de leurs proches et des usagers.</p>
                </div>
                <img src="/gst-scene-3.png" alt="Centre d’écoute et d’orientation du GST Souss-Massa" />
            </section>

            <div className="rich-content">
                <div className="content-sections">
                    <article id="missions">
                        <i>01</i>
                        <div>
                            <h2>Missions principales</h2>
                            <p>Accueillir les demandes, fournir des informations sur les parcours et démarches, orienter vers le bon service, recueillir les remarques et suggestions et assurer la continuité du dialogue avec l’usager.</p>
                            <ul>
                                <li>Information et orientation administrative</li>
                                <li>Orientation dans le parcours de soins</li>
                                <li>Réception des remarques et suggestions</li>
                                <li>Transmission aux services compétents</li>
                                <li>Analyse des questions fréquentes et production de rapports</li>
                            </ul>
                        </div>
                    </article>

                    <article id="values">
                        <i>02</i>
                        <div>
                            <h2>Engagements et valeurs</h2>
                            <p>Clarté, écoute, égalité de traitement, confidentialité, transparence et respect des données personnelles structurent la relation avec chaque usager.</p>
                        </div>
                    </article>

                    <article id="contact">
                        <i>03</i>
                        <div>
                            <h2>Horaires et modalités de contact</h2>
                            <p>Les coordonnées et horaires officiels du Centre seront publiés dès leur validation institutionnelle.</p>
                            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '10px' }}>Le dispositif a vocation à combiner une ligne téléphonique, une adresse électronique, une interface sur le site et des points d’accueil au sein des établissements.</p>
                        </div>
                    </article>
                </div>

                <div className="legal-note" style={{ marginTop: '40px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Cadre réglementaire de l’écoute usagers</b>
                        <span>Projet de création de l’unité d’écoute et d’orientation fourni par le GST Souss-Massa · Décret n° 2.17.265 · Lois n° 54.19, 55.19 et 31.13.</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
