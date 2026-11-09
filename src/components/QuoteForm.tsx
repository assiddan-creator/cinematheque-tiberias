import { FormEvent, useEffect, useId, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { addons, eventTypes, venue } from "../content";
import { quoteSubject, quoteText } from "../messages";
import { fieldClass, wineButton, lineButton } from "../ui";

type Fields = {
  name: string;
  org: string;
  phone: string;
  email: string;
  type: string;
  date: string;
  people: string;
  notes: string;
};

const empty: Fields = {
  name: "",
  org: "",
  phone: "",
  email: "",
  type: "",
  date: "",
  people: "",
  notes: "",
};

export function QuoteForm() {
  const [params] = useSearchParams();
  const [fields, setFields] = useState<Fields>(empty);
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [result, setResult] = useState<{ channel: "wa" | "mail"; href: string } | null>(null);
  const formId = useId();

  useEffect(() => {
    const type = params.get("type");
    if (type && eventTypes.some((item) => item.id === type)) {
      setFields((prev) => ({ ...prev, type }));
    }
  }, [params]);

  function update(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleAddon(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = "נדרש";
    if (!fields.phone.trim() && !fields.email.trim()) next.phone = "טלפון או מייל נדרשים";
    if (!fields.type) next.type = "בחרו סוג אירוע";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    const text = quoteText({ ...fields, addons: selected });
    const subject = quoteSubject(fields.type);
    const channel = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "mail" ? "mail" : "wa";
    if (channel === "mail") {
      const href = `mailto:${venue.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      setResult({ channel, href });
      window.location.href = href;
    } else {
      const href = `https://wa.me/${venue.whatsappE164}?text=${encodeURIComponent(text)}`;
      setResult({ channel, href });
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form onSubmit={send} noValidate className="border border-gold/20 bg-stone p-5 sm:p-7">
      <h2 className="text-3xl">בדיקת זמינות והצעת מחיר</h2>
      <p className="mt-2 text-silver">נחזור אליכם בוואטסאפ או במייל.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="שם" error={errors.name}>
          <input className={fieldClass} value={fields.name} onChange={(e) => update("name", e.target.value)} required />
        </Field>
        <Field label="ארגון / בית ספר">
          <input className={fieldClass} value={fields.org} onChange={(e) => update("org", e.target.value)} />
        </Field>
        <Field label="טלפון" error={errors.phone}>
          <input className={fieldClass} type="tel" value={fields.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>
        <Field label="מייל">
          <input className={fieldClass} type="email" value={fields.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field label="סוג אירוע" error={errors.type}>
          <select className={fieldClass} value={fields.type} onChange={(e) => update("type", e.target.value)}>
            <option value="">בחרו</option>
            {eventTypes.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </Field>
        <Field label="תאריך מועדים">
          <input className={fieldClass} type="date" value={fields.date} onChange={(e) => update("date", e.target.value)} />
        </Field>
        <Field label="מספר משתתפים משוער">
          <input className={fieldClass} type="number" min={1} value={fields.people} onChange={(e) => update("people", e.target.value)} />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm text-silver">תוספות (אופציונלי)</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {addons.map((item) => (
            <label key={item.id} className="flex min-h-11 items-start gap-3 border border-gold/20 px-3 py-2">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-[#8B3A4A]"
                checked={selected.includes(item.id)}
                onChange={() => toggleAddon(item.id)}
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="הערות" className="mt-4">
        <textarea className={fieldClass} rows={4} value={fields.notes} onChange={(e) => update("notes", e.target.value)} />
      </Field>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" name="channel" value="wa" className={wineButton}>
          שלח בוואטסאפ
        </button>
        <button type="submit" name="channel" value="mail" className={lineButton}>
          שלח במייל
        </button>
      </div>

      {result ? (
        <div role="status" className="mt-6 border border-wine/25 p-4">
          <p>הבקשה נשלחה. אם החלון לא נפתח, לחצו כאן:</p>
          <a href={result.href} className="text-ivory underline decoration-wine/40 underline-offset-4" target={result.channel === "wa" ? "_blank" : undefined} rel="noopener noreferrer">
            פתח את ההודעה
          </a>
        </div>
      ) : null}
    </form>
  );
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm text-silver">{label}{error ? <span className="text-wine"> — {error}</span> : null}</span>
      {children}
    </label>
  );
}
