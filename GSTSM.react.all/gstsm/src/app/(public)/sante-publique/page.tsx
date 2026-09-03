import Link from 'next/link';

export default function SantePubliquePage() {
    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Prévenir et protéger</span>
                    <h1>La santé publique au plus près des territoires</h1>
                    <p>Actions coordonnées de prévention, programmes prioritaires, surveillance épidémiologique et sécurité sanitaire régionale.</p>
                </div>
                <img src="/prevention.png" alt="Prévention et santé publique Souss-Massa" />
            </section>

            <div className="rich-content">
                <div className="content-sections">
                    <article id="prevention">
                        <i>01</i>
                        <div>
                            <h2>Prévention et promotion de la santé</h2>
                            <p>La prévention et la promotion de la santé visent à agir en amont de la maladie et à renforcer la capacité de chacun à protéger sa santé.</p>
                            <ul>
                                <li><strong>Domaines d'action :</strong> Vaccination, dépistage, nutrition, activité physique, santé mentale, santé reproductive et prévention des addictions.</li>
                                <li><strong>Information accessible :</strong> Les campagnes et conseils sont adaptés aux besoins des populations et relayés dans les 6 provinces de la région.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="programmes">
                        <i>02</i>
                        <div>
                            <h2>Programmes de santé publique</h2>
                            <p>Les programmes de santé publique organisent actions coordonnées autour des priorités sanitaires régionales et nationales.</p>
                            <ul>
                                <li><strong>Priorités :</strong> Santé de la mère et de l’enfant, santé scolaire et universitaire, maladies transmissibles et non transmissibles, accompagnement des personnes vulnérables.</li>
                                <li><strong>Pilotage par les résultats :</strong> Suivi de la performance à travers des objectifs précis et l’analyse continue des besoins du territoire.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="surveillance">
                        <i>03</i>
                        <div>
                            <h2>Surveillance et sécurité sanitaires</h2>
                            <p>La surveillance sanitaire permet de détecter, analyser et suivre les risques afin de protéger rapidement la population.</p>
                            <ul>
                                <li><strong>Dispositif régional :</strong> Surveillance épidémiologique, alertes sanitaires, contrôle sanitaire aux frontières et suivi des risques environnementaux.</li>
                                <li><strong>Vigilance sanitaire :</strong> Pharmacovigilance et matériovigilance pour assurer la sécurité des soins.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="mobilisation">
                        <i>04</i>
                        <div>
                            <h2>Mobilisation communautaire</h2>
                            <p>La mobilisation communautaire associe les citoyens, les associations, les collectivités et les professionnels aux actions de prévention.</p>
                            <ul>
                                <li><strong>Éducation pour la santé :</strong> Ressources simples, fiables et adaptées aux différents publics pour accompagner les actions sur le terrain.</li>
                            </ul>
                        </div>
                    </article>
                </div>

                <div className="legal-note" style={{ marginTop: '40px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Attributions institutionnelles</b>
                        <span>Direction Stratégie et Santé Publique · Direction des soins de santé primaires, prévention et promotion de la santé du GST Souss-Massa.</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
