import Link from 'next/link';

export default function UrgencesPage() {
    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Patients et proches</span>
                    <h1>Urgences et aide médicale urgente</h1>
                    <p>Les urgences assurent une prise en charge continue des situations nécessitant une évaluation ou une intervention médicale immédiate. Le SAMU régional participe à la régulation et à l’orientation de l’aide médicale urgente.</p>
                </div>
                <img src="/hospital.png" alt="Service des urgences GST Souss-Massa" />
            </section>

            <div className="rich-content">
                <div className="legal-note" style={{ borderLeft: '5px solid var(--red)', marginBottom: '30px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b style={{ color: 'var(--red)', fontSize: '18px' }}>Quand appeler le SAMU ?</b>
                        <span>Le SAMU doit être sollicité lorsqu’une situation semble grave, brutale ou susceptible de mettre en danger la vie d’une personne.</span>
                    </div>
                </div>

                <div className="content-sections">
                    <article id="when">
                        <i>01</i>
                        <div>
                            <h2>Motifs de recours urgent</h2>
                            <p>Une perte de connaissance, une difficulté respiratoire sévère, une douleur thoracique intense, un accident grave, une hémorragie importante ou l’apparition brutale de signes neurologiques justifient une demande d’aide médicale urgente.</p>
                            <ul>
                                <li><strong>Pendant l’appel :</strong> Indiquez calmement le lieu exact, la nature de l’événement, le nombre de personnes concernées et leur état apparent. Ne raccrochez pas avant que l’opérateur ne vous l’indique.</li>
                            </ul>
                        </div>
                    </article>

                    <article id="organization">
                        <i>02</i>
                        <div>
                            <h2>Organisation des soins d'urgence</h2>
                            <p>L’accueil, l’évaluation de la gravité, l’orientation et les soins sont organisés en fonction de l’état clinique du patient et des ressources adaptées disponibles dans les hôpitaux de la région.</p>
                        </div>
                    </article>

                    <article id="before">
                        <i>03</i>
                        <div>
                            <h2>Avant de vous déplacer</h2>
                            <p>En cas de détresse vitale ou de situation grave, utilisez le canal d’urgence officiel. Pour une demande non urgente, privilégiez le centre d’écoute, votre structure de proximité ou la consultation programmée.</p>
                        </div>
                    </article>
                </div>

                <div className="legal-note" style={{ marginTop: '40px' }}>
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Références d'orientation</b>
                        <span>Organisation de la branche sanitaire du GST Souss-Massa · Livret d’accueil hospitalier fourni par le GST.</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
