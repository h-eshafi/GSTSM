import { useState } from 'react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: string }[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Bonjour ! Je suis l\'Assistant Virtuel du GST Souss-Massa. Comment puis-je vous aider aujourd\'hui ?',
      options: [
        { label: '🚑 Numéros d\'urgence / SAMU', action: 'samu' },
        { label: '📅 Prise de Rendez-vous', action: 'rdv' },
        { label: '🏥 Nos Hôpitaux & Centres', action: 'hopitaux' },
        { label: '📞 Centre d\'Écoute', action: 'ecoute' }
      ]
    }
  ]);

  const handleOptionClick = (action: string) => {
    let replyText = '';
    let newOptions: { label: string; action: string }[] | undefined = undefined;

    if (action === 'samu') {
      replyText = 'En cas d\'urgence médicale urgente, appelez directement le SAMU au 141 (gratuit 24h/24 et 7j/7). Les services d\'urgence de l\'Hôpital Régional Hassan II et du CHU d\'Agadir sont ouverts en permanence.';
      newOptions = [
        { label: '📅 Prise de Rendez-vous', action: 'rdv' },
        { label: '🏥 Nos Hôpitaux', action: 'hopitaux' }
      ];
    } else if (action === 'rdv') {
      replyText = 'Pour prendre rendez-vous en consultation externe ou hospitalisation, munissez-vous de votre CIN et de votre couverture médicale (AMO/CNSS). Vous pouvez aussi utiliser notre service en ligne.';
      newOptions = [
        { label: 'Voir la page Rendez-vous', action: 'goto_rdv' },
        { label: '📞 Centre d\'Écoute', action: 'ecoute' }
      ];
    } else if (action === 'hopitaux') {
      replyText = 'Le GST Souss-Massa regroupe le CHU Mohammed VI d\'Agadir, l\'Hôpital Régional Hassan II, les hôpitaux provinciaux (Inezgane, Taroudant, Tiznit, Tata) et plus de 120 centres de santé.';
      newOptions = [
        { label: 'Consulter l\'Offre de Soins', action: 'goto_offre' },
        { label: '🚑 Numéros d\'urgence', action: 'samu' }
      ];
    } else if (action === 'ecoute') {
      replyText = 'Notre Centre d\'Écoute et d\'Orientation vous accueille du Lundi au Vendredi de 08h30 à 16h30. Téléphone: 05 28 84 00 00.';
      newOptions = [
        { label: 'Accéder au Centre d\'Écoute', action: 'goto_ecoute' }
      ];
    }

    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: replyText, options: newOptions }
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText }
    ]);

    setTimeout(() => {
      let botResponse = 'Merci pour votre message. Pour toute assistance spécifique, veuillez consulter notre Centre d\'Écoute ou naviguer dans notre rubrique Offre de Soins.';
      const lower = userText.toLowerCase();

      if (lower.includes('urgenc') || lower.includes('samu') || lower.includes('141')) {
        botResponse = 'Pour les urgences vitales, composer immédiatement le 141. Les services d\'urgence restent ouverts 24h/24.';
      } else if (lower.includes('rdv') || lower.includes('rendez') || lower.includes('consultation')) {
        botResponse = 'Vous pouvez planifier vos rendez-vous de consultation directement depuis la rubrique "Patients et Proches".';
      } else if (lower.includes('contact') || lower.includes('telephone') || lower.includes('adresse')) {
        botResponse = 'Siège du GST Souss-Massa : Boulevard Hassan II, Agadir. Téléphone public : 05 28 84 00 00.';
      }

      setMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: botResponse,
          options: [
            { label: '🚑 Urgences / SAMU', action: 'samu' },
            { label: '📞 Centre d\'Écoute', action: 'ecoute' }
          ] 
        }
      ]);
    }, 500);
  };

  return (
    <>
      {/* Right Floating Launcher Button */}
      <div className="chatbot">
        <button 
          className="chat-launch" 
          aria-label="Ouvrir l’assistant"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i>✦</i>
          <span>
            <b>Besoin d’aide ?</b>
            <small>Assistant GST</small>
          </span>
        </button>
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '90px', right: '24px', width: '360px', height: '480px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.18)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', zIndex: 9999, overflow: 'hidden' }}>
          
          {/* Chat Header */}
          <div style={{ backgroundColor: '#2563EB', color: '#FFFFFF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>✦</span>
              <div>
                <b style={{ display: 'block', fontSize: '14px', lineHeight: '1.2' }}>Assistant Virtuel GST</b>
                <small style={{ fontSize: '11px', opacity: 0.85 }}>Souss-Massa</small>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '18px', cursor: 'pointer', padding: '4px' }}
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div style={{ 
                  backgroundColor: msg.sender === 'user' ? '#2563EB' : '#FFFFFF', 
                  color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                  padding: '10px 14px', 
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '13px',
                  lineHeight: '1.4',
                  boxShadow: msg.sender === 'bot' ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                  border: msg.sender === 'bot' ? '1px solid #E2E8F0' : 'none'
                }}>
                  {msg.text}
                </div>

                {/* Option Buttons */}
                {msg.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {msg.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          if (opt.action === 'goto_rdv') {
                            window.location.href = '/pages/prendre-rendez-vous';
                          } else if (opt.action === 'goto_offre') {
                            window.location.href = '/pages/hopitaux-regionaux-et-provinciaux';
                          } else if (opt.action === 'goto_ecoute') {
                            window.location.href = '/pages/centre-decoute';
                          } else {
                            handleOptionClick(opt.action);
                          }
                        }}
                        style={{ padding: '8px 12px', fontSize: '12px', textAlign: 'left', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} style={{ padding: '12px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Posez votre question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
            />
            <button 
              type="submit" 
              style={{ padding: '8px 14px', backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Envoyer
            </button>
          </form>

        </div>
      )}
    </>
  );
}
