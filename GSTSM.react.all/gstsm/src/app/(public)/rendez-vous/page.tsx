import Link from 'next/link';

export default function RendezVousPage() {
    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Consultations et examens</span>
                    <h1>Prendre un rendez-vous</h1>
                    <p>La prise de rendez-vous permet de préparer votre consultation et de vous orienter vers le service adapté.</p>
                </div>
                <img src="/gst-scene-3.png" alt="Préparation de la consultation au GST Souss-Massa" />
            </section>

            <div className="rich-content">
                <div className="content-sections">
                    <article id="prepare">
                        <i>01</i>
                        <div>
                            <h2>Préparez votre demande</h2>
                            <p>Munissez-vous de votre pièce d’identité, de votre couverture médicale, de la lettre d’orientation ou prescription et de vos coordonnées actualisées.</p>
                        </div>
                    </article>

                    <article id="consultation">
                        <i>02</i>
                        <div>
                            <h2>Préparer sa consultation</h2>
                            <p>Une préparation simple facilite l’échange avec l’équipe soignante et contribue à la qualité de votre prise en charge.</p>
                            <ul>
                                <li><strong>Documents utiles :</strong> Pièce d’identité, carte de couverture médicale, lettre d’orientation, ordonnances et résultats d’examens récents.</li>
                                <li><strong>Informations à signaler :</strong> Préparez la liste de vos traitements, allergies, antécédents et questions. Signalez toute infection connue ou hospitalisation récente.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="help">
                        <i>03</i>
                        <div>
                            <h2>Besoin d’aide ?</h2>
                            <p>Le centre d’écoute et d’orientation peut vous informer sur le parcours administratif et vous guider vers l’établissement ou le service concerné. Les modalités officielles de rendez-vous seront publiées après validation.</p>
                        </div>
                    </article>
                </div>

                <div className="legal-note" style={{ marginTop: '40px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Livret d'accueil hospitalier</b>
                        <span>Livret d’accueil hospitalier fourni par le GST Souss-Massa.</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
