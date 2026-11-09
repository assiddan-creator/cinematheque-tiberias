import { FormEvent, useEffect, useId, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { addons, eventTypes, venue } from "../content";
import { quoteSubject, quoteText } from "../messages";
import { btnLine, btnRed, fieldClass } from "../ui";
import { SeatField } from "./SeatField";

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
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(todayIso()), []);

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
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
    <form onSubmit={send} noValidate className="lg:col-span-7" aria-describedby={errorList.length ? errorSummaryId : undefined}>
      <h2 className="display t-l">בדיקת זמינות והצעת מחיר לאירוע</h2>
      <p className="mt-4 max-w-2xl text-muted">
        ממלאים את הפרטים, ובוחרים אם לפתוח הודעת וואטסאפ אל {venue.whatsappDisplay} או מייל אל {venue.email}.
        אפשר גם להתקשר אל {venue.phoneDisplay}.
      </p>
      <p className="mt-2 text-sm text-muted">שדות המסומנים בכוכבית הם חובה.</p>

      {errorList.length > 0 ? (
        <div id={errorSummaryId} role="alert" className="mt-5 border-s-4 border-house bg-[#fbeef0] px-4 py-3 text-sm font-medium text-house-deep">
          יש לתקן את השדות המסומנים לפני השליחה.
        </div>
      ) : null}

      <div className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-2">
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
            min={minDate}
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

      <GuestPlanCompact guests={fields.guests} />

      <fieldset className="mt-10">
        <legend className="display text-[2rem] leading-none">שדרוגים ושירותי הפקה משלימים</legend>
        <div className="mt-3 grid gap-2">
          {addons.map((item) => (
            <label key={item.id} className="flex min-h-12 cursor-pointer items-start gap-3 border-b border-[var(--line)] py-3">
              <input
                type="checkbox"
                className="mt-1 size-5 shrink-0 accent-[#9e1430]"
                checked={fields.addons.includes(item.label)}
                onChange={() => toggleAddon(item.label)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" name="channel" value="wa" className={btnRed}>
          שליחה לוואטסאפ
        </button>
        <button type="submit" name="channel" value="mail" className={btnLine}>
          שליחה במייל
        </button>
      </div>

      {result ? (
        <div role="status" className="mt-6 border-s-4 border-house bg-paper p-4">
          <p>
            {result.channel === "wa"
              ? "נפתחה הודעת וואטסאפ עם פרטי הפנייה."
              : "נפתח המייל עם פרטי הפנייה."}
          </p>
          <p className="mt-2 text-sm text-muted">
            אם החלון לא נפתח,{" "}
            <a href={result.href} className="inline-link" target={result.channel === "wa" ? "_blank" : undefined} rel="noopener noreferrer">
              לחצו כאן
            </a>
            .
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-sans text-sm text-muted">{result.text}</pre>
        </div>
      ) : null}
    </form>
    <GuestPlan guests={fields.guests} />
    </div>
  );
}

function guestCount(guests: string) {
  const value = Number(guests);
  return Number.isFinite(value) ? Math.max(0, Math.min(319, Math.floor(value))) : 0;
}

/** Phones: the plan sits right under the guest field, so it answers while typing. */
function GuestPlanCompact({ guests }: { guests: string }) {
  const n = guestCount(guests);
  return (
    <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 bg-paper p-3 lg:hidden" aria-hidden="true">
      <div>
        <p className="mx-auto mb-2 w-3/4 border-b-[3px] border-ink pb-0.5 text-center text-xs font-medium text-muted">במה ומסך</p>
        <div className="aspect-[21/14] w-full">
          <SeatField mode="plan" filled={n} />
        </div>
      </div>
      <p className="nums pb-1 text-center leading-none">
        <span className="display block text-[3.4rem] text-house">{n}</span>
        <span className="mt-1 block text-sm text-muted">מתוך 319</span>
      </p>
    </div>
  );
}

function GuestPlan({ guests }: { guests: string }) {
  const n = guestCount(guests);
  return (
    <aside className="hidden lg:col-span-5 lg:block" aria-label="תפוסת האולם לפי כמות המשתתפים">
      <div className="lg:sticky lg:top-24">
        <div className="bg-paper p-4 sm:p-6">
          <p className="mx-auto mb-4 w-3/4 border-b-4 border-ink pb-1 text-center text-sm font-medium text-muted">במה ומסך</p>
          <div className="aspect-[21/16] w-full">
            <SeatField mode="plan" filled={n} />
          </div>
        </div>
        <p className="nums mt-5 leading-none" aria-live="polite">
          <span className="display text-[clamp(4.5rem,3rem+4vw,7rem)] text-house">{n}</span>
          <span className="display text-[2.2rem] text-muted"> / 319</span>
        </p>
        <p className="mt-3 max-w-[26rem] text-muted">
          {n === 0
            ? "המספר שתזינו בשדה כמות המשתתפים יתמלא כאן על מפת האולם, מהשורה הקרובה לבמה."
            : n >= 319
              ? "האולם מלא: כל 319 המקומות."
              : `${n} מקומות מתוך 319, מהשורה הקרובה לבמה.`}
        </p>
      </div>
    </aside>
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
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-medium">
        {label}
        {required ? (
          <span className="text-house" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-house">
          {error}
        </p>
      ) : null}
    </div>
  );
}
