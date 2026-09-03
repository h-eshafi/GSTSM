import Link from 'next/link';

export default function OffreDeSoinsPage() {
    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Réseau territorial</span>
                    <h1>Offre de soins</h1>
                    <p>Trois niveaux de soins complémentaires articulés pour garantir la continuité des parcours sur l'ensemble de la Région Souss-Massa.</p>
                </div>
                <img src="/hospital.png" alt="Établissements hospitaliers du GST Souss-Massa" />
            </section>

            <div className="rich-content">
                <div className="content-sections">
                    <article id="essp">
                        <i>01</i>
                        <div>
                            <h2>Soins de proximité (Niveau primaire)</h2>
                            <p>Les soins de proximité constituent le premier niveau du parcours. Ils assurent la prévention, les soins courants, le suivi et l’orientation vers le niveau adapté.</p>
                            <ul>
                                <li><strong>Structures concernées :</strong> Établissements de soins de santé primaires (ESSP), établissements médico-sociaux (EMS) et centres de santé urbains et ruraux répartis dans les 6 territoires de la région.</li>
                                <li><strong>Rôle dans le parcours :</strong> La médecine de famille et les équipes de proximité favorisent une orientation pertinente, la continuité du suivi et un recours mieux coordonné aux soins spécialisés.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="hospitals">
                        <i>02</i>
                        <div>
                            <h2>Soins hospitaliers (Niveau secondaire)</h2>
                            <p>Le niveau hospitalier regroupe les espaces et districts sanitaires, les hôpitaux régionaux et provinciaux ainsi que les hôpitaux de proximité.</p>
                            <ul>
                                <li><strong>Missions :</strong> Prise en charge des urgences, hospitalisation, spécialités hospitalières et médico-techniques.</li>
                                <li><strong>Organisation interne :</strong> Coordination des structures de proximité et articulation des fonctions sanitaires, administratives et de pharmacie régionale.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="chu">
                        <i>03</i>
                        <div>
                            <h2>Soins hospitalo-universitaires (Niveau tertiaire)</h2>
                            <p>Le niveau hospitalo-universitaire assure les prises en charge spécialisées et hautement spécialisées, l’enseignement, la formation et la recherche.</p>
                            <ul>
                                <li><strong>Réseau cible :</strong> Hôpital Universitaire Général Mohammed VI d’Agadir, Hôpital Universitaire Mohammed VI Mère-Enfant, Hôpital Universitaire d’Oncologie d’Agadir et Hôpital Universitaire de Psychiatrie.</li>
                                <li><strong>Missions complémentaires :</strong> Formation des professionnels de santé, recherche clinique, innovation et coordination des filières de soins d'excellence.</li>
                            </ul>
                        </div>
                    </article>
                </div>

                <div className="legal-note" style={{ marginTop: '40px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Références institutionnelles</b>
                        <span>Organigramme sanitaire du GST Souss-Massa · Ministère de la Santé et de la Protection Sociale, mai 2026.</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
