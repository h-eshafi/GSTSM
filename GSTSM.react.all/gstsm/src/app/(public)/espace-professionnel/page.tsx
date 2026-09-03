import Link from 'next/link';

export default function EspaceProfessionnelPage() {
    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Espace professionnel</span>
                    <h1>Carrières, marchés, recherche et innovation</h1>
                    <p>Accès aux concours, avis de recrutement, consultations de la commande publique et projets de recherche scientifique du GST Souss-Massa.</p>
                </div>
                <img src="/gst-scene-2.png" alt="Espace professionnel et équipes de santé" />
            </section>

            <div className="rich-content">
                <div className="content-sections">
                    <article id="careers">
                        <i>01</i>
                        <div>
                            <h2>Concours et résultats</h2>
                            <p>Retrouvez les concours, avis de recrutement et résultats publiés par le GST Souss-Massa.</p>
                            <ul>
                                <li><strong>Publications officielles :</strong> Chaque avis précise les conditions de candidature, les pièces requises, les échéances et les modalités de dépôt. Aucun avis n’est actuellement publié dans ce prototype.</li>
                                <li><strong>Suivi des candidatures :</strong> Les listes, convocations et résultats seront classés par année et par statut afin de faciliter la consultation.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="tenders">
                        <i>02</i>
                        <div>
                            <h2>Appels d’offres et marchés publics</h2>
                            <p>Cet espace centralisera les appels d’offres et documents de consultation du GST Souss-Massa.</p>
                            <ul>
                                <li><strong>Consultations :</strong> Les avis seront filtrables par objet, catégorie, date limite et statut de la procédure.</li>
                                <li><strong>Documents associés :</strong> Règlements, cahiers des prescriptions (CPS), avis modificatifs et résultats accessibles depuis chaque fiche officielle.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="research">
                        <i>03</i>
                        <div>
                            <h2>Recherche et innovation</h2>
                            <p>La recherche et l’innovation contribuent à améliorer les pratiques, développer les compétences et valoriser l’expertise scientifique régionale.</p>
                            <ul>
                                <li><strong>Accompagnement :</strong> Le GST accompagne le montage, le suivi et la valorisation des projets de recherche et d’innovation, dans le respect des exigences éthiques et réglementaires.</li>
                                <li><strong>Diffusion :</strong> Veille scientifique, publications, conférences et communication scientifique en lien avec le CHU et la Faculté de Médecine.</li>
                            </ul>
                        </div>
                    </article>
                </div>

                <div className="legal-note" style={{ marginTop: '40px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Cadre réglementaire</b>
                        <span>Cadre réglementaire marocain de la commande publique · Direction du Capital Humain et Division Recherche & Innovation du GST Souss-Massa.</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
