import { FormEvent, useEffect, useId, useState, type ReactNode } from "react";
import { venue } from "../content";
import { hebrewInputDate } from "../schedule";
import { btnRed, btnLine, fieldClass } from "../ui";

/**
 * /hall inquiry form (Ortal's fields, 2026-11-25).
 * Required: full name, mobile, email, event purpose, expected participants.
 * Optional: company number (ח.פ), approximate date.
 * The site is static, so the details are sent as a WhatsApp message to Ortal or as an email to the cinema mailbox.
 */

type Fields = {
  name: string;
  mobile: string;
  email: string;
  purpose: string;
  guests: string;
  companyId: string;
  date: string;
};

const empty: Fields = { name: "", mobile: "", email: "", purpose: "", guests: "", companyId: "", date: "" };

type Errors = Partial<Record<keyof Fields, string>>;

function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "נא למלא שם מלא.";
  const digits = f.mobile.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) e.mobile = "נא להזין מספר סלולרי.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "נא להזין כתובת מייל תקינה.";
  if (f.purpose.trim().length < 2) e.purpose = "נא לכתוב מה מטרת האירוע.";
  const guests = Number(f.guests);
  if (!f.guests || !Number.isInteger(guests) || guests < 1 || guests > 319) {
    e.guests = "נא להזין מספר משתתפים בין 1 ל-319.";
  }
  if (f.companyId.trim() && !/^\d{9}$/.test(f.companyId.replace(/[\s-]/g, ""))) e.companyId = "ח.פ הוא 9 ספרות.";
  if (f.date && f.date < todayIso()) e.date = "התאריך כבר עבר.";
  return e;
}

const clean = (v: string) => v.replace(/\s+/g, " ").trim();

function message(f: Fields) {
  return [
    "שלום, אשמח לבדוק זמינות של האולם בסינמטק טבריה.",
    "",
    `שם מלא: ${clean(f.name)}`,
    `סלולרי: ${clean(f.mobile)}`,
    `מייל: ${clean(f.email)}`,
    `מטרת האירוע: ${clean(f.purpose)}`,
    `מספר משתתפים צפוי: ${clean(f.guests)}`,
    `ח.פ: ${clean(f.companyId) || "לא צוין"}`,
    `תאריך משוער: ${f.date ? hebrewInputDate(f.date) : "לא צוין"}`,
  ].join("\n");
}

export function HallForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<{ href: string; text: string; channel: "wa" | "mail" } | null>(null);
  const [minDate, setMinDate] = useState<string>();
  const summaryId = useId();
  useEffect(() => setMinDate(todayIso()), []);

  function update(key: keyof Fields, value: string) {
    setFields((c) => ({ ...c, [key]: value }));
    setErrors((c) => ({ ...c, [key]: undefined }));
  }

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`hall-${first}`)?.focus();
      return;
    }
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.value === "mail" ? "mail" : "wa";
    const text = message(fields);
    if (channel === "wa") {
      const href = `https://wa.me/${venue.hallWhatsappE164}?text=${encodeURIComponent(text)}`;
      window.open(href, "_blank", "noopener,noreferrer");
      setResult({ href, text, channel });
      return;
    }
    const subject = `פנייה לאירוע בסינמטק: ${clean(fields.purpose)}`;
    const href = `mailto:${venue.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = href;
    setResult({ href, text, channel });
  }

  const hasErrors = Object.values(errors).some(Boolean);

  const input = (key: keyof Fields, props: Record<string, unknown> = {}) => ({
    id: `hall-${key}`,
    name: key,
    value: fields[key],
    onChange: (e: { target: { value: string } }) => update(key, e.target.value),
    className: fieldClass,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `hall-${key}-error` : undefined,
    ...props,
  });

  return (
    <form onSubmit={send} noValidate aria-describedby={hasErrors ? summaryId : undefined}>
      <p className="text-sm text-muted">שדות המסומנים בכוכבית הם חובה.</p>
      {hasErrors ? (
        <div id={summaryId} role="alert" className="mt-4 border-s-4 border-house bg-[#fbeef0] px-4 py-3 text-sm font-medium text-house-deep">
          יש לתקן את השדות המסומנים לפני השליחה.
        </div>
      ) : null}

      <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field id="name" label="שם מלא" error={errors.name} required>
          <input {...input("name", { autoComplete: "name" })} />
        </Field>
        <Field id="mobile" label="סלולרי" error={errors.mobile} required>
          <input {...input("mobile", { type: "tel", dir: "ltr", inputMode: "tel", autoComplete: "tel", className: `${fieldClass} text-end` })} />
        </Field>
        <Field id="email" label="מייל" error={errors.email} required>
          <input {...input("email", { type: "email", dir: "ltr", inputMode: "email", autoComplete: "email", className: `${fieldClass} text-end` })} />
        </Field>
        <Field id="guests" label="מספר משתתפים צפוי" error={errors.guests} required>
          <input
            {...input("guests", { type: "number", dir: "ltr", inputMode: "numeric", min: 1, max: 319, step: 1, className: `${fieldClass} nums text-end` })}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="purpose" label="מטרת האירוע" error={errors.purpose} required>
            <textarea {...input("purpose", { rows: 3, placeholder: "למשל: כנס עובדים, מופע סטנדאפ, טקס סיום, הקרנה לשכבה" })} />
          </Field>
        </div>
        <Field id="companyId" label="ח.פ (לא חובה)" error={errors.companyId}>
          <input {...input("companyId", { dir: "ltr", inputMode: "numeric", className: `${fieldClass} nums text-end` })} />
        </Field>
        <Field id="date" label="תאריך משוער (לא חובה)" error={errors.date}>
          <input {...input("date", { type: "date", dir: "ltr", min: minDate, className: `${fieldClass} text-end` })} />
        </Field>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" name="channel" value="wa" className={btnRed}>
          שליחה בוואטסאפ
        </button>
        <button type="submit" name="channel" value="mail" className={btnLine}>
          שליחה במייל
        </button>
      </div>

      {result ? (
        <div role="status" className="mt-6 border-s-4 border-house bg-paper p-4">
          <p>{result.channel === "wa" ? "נפתחה הודעת וואטסאפ עם הפרטים. נשאר רק ללחוץ שליחה." : "נפתח מייל עם הפרטים. נשאר רק ללחוץ שליחה."}</p>
          <p className="mt-2 text-sm text-muted">
            אם החלון לא נפתח,{" "}
            <a href={result.href} className="inline-link" target={result.channel === "wa" ? "_blank" : undefined} rel="noopener noreferrer">
              לחצו כאן
            </a>
            .
          </p>
        </div>
      ) : null}
    </form>
  );
}

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`hall-${id}`} className="mb-1.5 block text-[0.9375rem] font-medium">
        {label}
        {required ? (
          <span className="text-house" aria-hidden="true">
            {" "}*
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`hall-${id}-error`} className="mt-1.5 text-sm font-medium text-house">
          {error}
        </p>
      ) : null}
    </div>
  );
}
