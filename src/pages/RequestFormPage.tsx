import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Eyebrow } from '../components/ui/Eyebrow';
import { CyanButton } from '../components/ui/CyanButton';
import { useCart } from '../context/CartContext';
import { requestService } from '../services/requestService';
import { locationService } from '../services/locationService';
import type { RequestSubmission } from '../types';

export function RequestFormPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { items, clear } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!name.trim() || !email.trim() || !company.trim() || !message.trim()) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse an.');
      return;
    }
    if (items.length === 0) {
      setError('Ihr Anfragekorb ist leer.');
      return;
    }

    setSubmitting(true);
    const location = await locationService.getBySlug(slug);
    if (!location) {
      setError('Location nicht gefunden.');
      setSubmitting(false);
      return;
    }

    const submission: RequestSubmission = {
      locationId: location.id,
      customerName: name.trim(),
      customerEmail: email.trim(),
      customerCompany: company.trim(),
      eventDate: eventDate ? new Date(eventDate).toISOString() : null,
      message: message.trim(),
      items: items.map((i) => ({
        moduleId: i.moduleId,
        moduleName: i.moduleName,
        areaName: i.areaName,
        variantId: i.variantId,
        variantName: i.variantName,
        quantity: i.quantity,
      })),
    };

    const result = await requestService.submit(submission);
    setSubmitting(false);
    if (result.success) {
      clear();
      navigate(`/l/${slug}/anfrage/erfolg`);
    } else {
      setError('Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <section className="px-8 pb-36 pt-14 sm:px-12 md:px-16 md:pb-44 lg:px-20 xl:px-24">
      <Breadcrumb
        segments={[
          { label: 'Anfragekorb', to: `/l/${slug}/warenkorb` },
          { label: 'Anfrage senden' },
        ]}
      />

      <div className="mt-16">
        <Eyebrow className="mb-10">Kontakt</Eyebrow>
        <h2
          className="text-[40px] leading-[1.04] sm:text-[56px] md:text-[72px] lg:text-[84px]"
          style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          Ihre <span className="italic-accent">Anfrage</span>
        </h2>
        <p
          className="mt-8 max-w-[620px] text-[15px] leading-relaxed sm:text-[17px]"
          style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
        >
          Wir melden uns innerhalb weniger Werktage persönlich bei Ihnen mit einem Angebot.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-16 flex max-w-[900px] flex-col gap-10">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <label className="input-label" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              type="text"
              className="input-underline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="email">
              E-Mail *
            </label>
            <input
              id="email"
              type="email"
              className="input-underline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="company">
              Firma *
            </label>
            <input
              id="company"
              type="text"
              className="input-underline"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              autoComplete="organization"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="eventDate">
              Eventdatum (optional)
            </label>
            <input
              id="eventDate"
              type="date"
              className="input-underline"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="input-label" htmlFor="message">
            Nachricht *
          </label>
          <textarea
            id="message"
            className="input-underline resize-none"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {error && (
          <div
            className="border px-4 py-3 text-[13px]"
            style={{
              borderColor: 'rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              fontWeight: 300,
            }}
          >
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <CyanButton type="submit" disabled={submitting} trailing="→">
            {submitting ? 'Wird gesendet …' : 'Anfrage senden'}
          </CyanButton>
        </div>
      </form>
    </section>
  );
}
