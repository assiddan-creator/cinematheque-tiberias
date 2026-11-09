import { FormEvent, useEffect, useId, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { addons, eventTypes, venue } from "../content";
import { quoteSubject, quoteText } from "../messages";
import { fieldClass, goldButton, lineButton } from "../ui";

type Fields = {
  name: string;
  org: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  addons: string[];
};

const empty: Fields = {
  name: "",
  org: "",
  phone: "",
  eventType: "",
  date: "",
  guests: "",
  addons: [],
};

type Errors = Partial<Record<"name" | "org" | "phone" | "eventType" | "date" | "guests", string>>;

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "נא למלא שם מלא.";
  if (fields.org.trim().length < 2) errors.org = "נא למלא שם ארגון, בית ספר או חברה.";
  const digits = fields.phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) errors.phone = "נא להזין מספר טלפון.";
  if (!fields.eventType) errors.eventType = "נא לבחור סוג אירוע.";
  if (!fields.date) errors.date = "נא לבחור תאריך משוער.";
  else if (fields.date < todayIso()) errors.date = "התאריך כבר עבר. בחרו תאריך מהיום והלאה.";
  const guests = Number(fields.guests);
  if (!fields.guests || !Number.isInteger(guests) || guests < 1 || guests > 319) {
    errors.guests = "נא להזין מספר משתתפים בין 1 ל-319.";
  }
  return errors;
}

export function QuoteForm() {
  const [params] = useSearchParams();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<{ href: string; text: string; channel: "wa" | "mail" } | null>(null);
  const errorSummaryId = useId();

  useEffect(() => {
    const type = params.get("type");
    if (type && eventTypes.some((item) => item.id === type)) {
      setFields((current) => ({ ...current, eventType: type }));
    }
  }, [params]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function toggleAddon(label: string) {
    setFields((current) => ({
      ...current,
      addons: current.addons.includes(label)
        ? current.addons.filter((item) => item !== label)
        : [...current.addons, label],
    }));
  }

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.value === "mail" ? "mail" : "wa";
    const eventLabel = eventTypes.find((item) => item.id === fields.eventType)?.label ?? fields.eventType;
    const text = quoteText({ ...fields, eventType: eventLabel });

    if (channel === "wa") {
      const href = `https://wa.me/${venue.whatsappE164}?text=${encodeURIComponent(text)}`;
      window.open(href, "_blank", "noopener,noreferrer");
      setResult({ href, text, channel });
      return;
    }

    const href = `mailto:${venue.email}?subject=${encodeURIComponent(quoteSubject(fields.org))}&body=${encodeURIComponent(text)}`;
    window.location.href = href;
    setResult({ href, text, channel });
  }

  const errorList = Object.values(errors).filter(Boolean);

  return (
    <form onSubmit={send} noValidate className="border border-gold/20 bg-stone p-5 sm:p-7" aria-describedby={errorList.length ? errorSummaryId : undefined}>
      <h2 className="text-3xl">בדיקת זמינות והצעת מחיר לאירוע</h2>
      <p className="mt-3 max-w-2xl text-silver">
        ממלאים את הפרטים, ובוחרים אם לפתוח הודעת וואטסאפ אל {venue.whatsappDisplay} או מייל אל {venue.email}.
        אפשר גם להתקשר אל {venue.phoneDisplay}.
      </p>
      <p className="mt-2 text-sm text-mist">שדות המסומנים בכוכבית הם חובה.</p>

      {errorList.length > 0 ? (
        <div id={errorSummaryId} role="alert" className="mt-4 border border-[#ffb4b4] px-3 py-2 text-sm text-[#ffb4b4]">
          יש לתקן את השדות המסומנים לפני השליחה.
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="name" label="שם מלא" error={errors.name} required>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field id="org" label="ארגון / בית ספר / חברה" error={errors.org} required>
          <input
            id="org"
            name="organization"
            autoComplete="organization"
            value={fields.org}
            onChange={(event) => update("org", event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.org)}
            aria-describedby={errors.org ? "org-error" : undefined}
          />
        </Field>
        <Field id="phone" label="טלפון" error={errors.phone} required>
          <input
            id="phone"
            name="tel"
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={`${fieldClass} text-end`}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>
        <Field id="eventType" label="סוג האירוע" error={errors.eventType} required>
          <select
            id="eventType"
            name="eventType"
            value={fields.eventType}
            onChange={(event) => update("eventType", event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.eventType)}
            aria-describedby={errors.eventType ? "eventType-error" : undefined}
          >
            <option value="">בחרו סוג אירוע</option>
            {eventTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="date" label="תאריך משוער" error={errors.date} required>
          <input
            id="date"
            name="date"
            type="date"
            dir="ltr"
            min={todayIso()}
            value={fields.date}
            onChange={(event) => update("date", event.target.value)}
            className={`${fieldClass} text-end`}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
        </Field>
        <Field id="guests" label="כמות משתתפים (עד 319)" error={errors.guests} required>
          <input
            id="guests"
            name="guests"
            type="number"
            dir="ltr"
            inputMode="numeric"
            min={1}
            max={319}
            step={1}
            value={fields.guests}
            onChange={(event) => update("guests", event.target.value)}
            className={`${fieldClass} nums text-end`}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? "guests-error" : undefined}
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-lg text-ivory">שדרוגים ושירותי הפקה משלימים</legend>
        <div className="mt-3 grid gap-2">
          {addons.map((item) => (
            <label key={item.id} className="flex min-h-11 items-start gap-3 border border-gold/20 px-3 py-2">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-[#d4af37]"
                checked={fields.addons.includes(item.label)}
                onChange={() => toggleAddon(item.label)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" name="channel" value="wa" className={goldButton}>
          שליחה לוואטסאפ
        </button>
        <button type="submit" name="channel" value="mail" className={lineButton}>
          שליחה במייל
        </button>
      </div>

      {result ? (
        <div role="status" className="mt-6 border border-gold/25 p-4">
          <p>
            {result.channel === "wa"
              ? "נפתחה הודעת וואטסאפ עם פרטי הפנייה."
              : "נפתח המייל עם פרטי הפנייה."}
          </p>
          <p className="mt-2 text-sm text-silver">
            אם החלון לא נפתח,{" "}
            <a href={result.href} className="text-ivory underline decoration-gold/40 underline-offset-4" target={result.channel === "wa" ? "_blank" : undefined} rel="noopener noreferrer">
              לחצו כאן
            </a>
            .
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-sans text-sm text-silver">{result.text}</pre>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-silver">
        {label}
        {required ? (
          <span className="text-gold" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-[#ffb4b4]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
