import Link from 'next/link';

export default function PatientsProchesPage() {
    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Votre parcours</span>
                    <h1>Patients et proches</h1>
                    <p>Être informé, accueilli et accompagné avant, pendant et après votre prise en charge dans les établissements du GST Souss-Massa.</p>
                </div>
                <img src="/gst-scene-3.png" alt="Accompagnement patient et proches GST Souss-Massa" />
            </section>

            <div className="rich-content">
                <div className="content-sections">
                    <article id="consultations">
                        <i>01</i>
                        <div>
                            <h2>Consultations et examens</h2>
                            <p>La prise de rendez-vous permet de préparer votre consultation et de vous orienter vers le service adapté.</p>
                            <ul>
                                <li><strong>Documents à fournir :</strong> Pièce d’identité, carte de couverture médicale (AMO/CNSS), lettre d’orientation médicale, ordonnances et examens récents.</li>
                                <li><strong>Conseils :</strong> Préparez la liste de vos traitements habituels, allergies et antécédents avant votre venue.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="hospitalisation">
                        <i>02</i>
                        <div>
                            <h2>Préparer son hospitalisation</h2>
                            <p>L’admission est une étape essentielle pour garantir une prise en charge fluide, sécurisée et adaptée à votre situation.</p>
                            <ul>
                                <li><strong>Formalités :</strong> Présentez-vous au bureau des admissions et de la facturation avec votre certificat d'hospitalisation et vos documents d'assurance.</li>
                                <li><strong>Identité et sécurité :</strong> Le bracelet d’identification doit être conservé pendant toute la durée du séjour.</li>
                                <li><strong>Sortie et suivi :</strong> La sortie se prépare avec l’équipe soignante afin d’assurer la continuité du traitement et le relais avec votre médecin traitant.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="droits">
                        <i>03</i>
                        <div>
                            <h2>Droits et responsabilités du patient</h2>
                            <p>La prise en charge repose sur une relation de confiance, de respect mutuel et sur une information accessible au patient.</p>
                            <ul>
                                <li><strong>Droits :</strong> Accès équitable aux soins, information claire, respect de la dignité, confidentialité et possibilité d'exprimer des remarques.</li>
                                <li><strong>Responsabilités :</strong> Le patient et ses visiteurs contribuent à un environnement sûr en respectant le calme, l'hygiène et les horaires de visite.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="experience">
                        <i>04</i>
                        <div>
                            <h2>Satisfaction et expérience patient</h2>
                            <p>L’expérience des patients et de leurs proches contribue directement à l’amélioration continue des services du GST Souss-Massa.</p>
                            <ul>
                                <li>Les remarques et suggestions recueillies via nos questionnaires sont analysées confidentiellement par la commission de suivi de la qualité.</li>
                            </ul>
                        </div>
                    </article>
                </div>

                <div className="legal-note" style={{ marginTop: '40px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Références d'information usagers</b>
                        <span>Charte Droits et responsabilités du patient · Livret d’accueil hospitalier fourni par le GST Souss-Massa · Décret n° 2.17.265 relatif aux remarques, propositions et réclamations des usagers.</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
