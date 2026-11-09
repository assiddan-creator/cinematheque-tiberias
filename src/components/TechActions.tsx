import { useState } from "react";
import { Copy, MessageCircle, Printer } from "lucide-react";
import { techShareText, techUrl } from "../messages";
import { wineButton, lineButton } from "../ui";

export function TechActions() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = techUrl();
    try {
      await Promise.race([
        navigator.clipboard.writeText(url),
        new Promise((_, reject) => {
          window.setTimeout(() => reject(new Error("timeout")), 700);
        }),
      ]);
    } catch {
      const area = document.createElement("textarea");
      area.value = url;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  function share() {
    const href = `https://wa.me/?text=${encodeURIComponent(techShareText(techUrl()))}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="no-print mt-6 flex flex-wrap gap-3">
      <button type="button" className={lineButton} onClick={copyLink}>
        <Copy aria-hidden="true" className="ms-0 me-2 size-4" />
        {copied ? "הקישור הועתק" : "העתק קישור למפרט הטכני"}
      </button>
      <button type="button" className={lineButton} onClick={share}>
        <MessageCircle aria-hidden="true" className="me-2 size-4" />
        שלח בוואטסאפ למפיק
      </button>
      <button type="button" className={wineButton} onClick={() => window.print()}>
        <Printer aria-hidden="true" className="me-2 size-4" />
        הדפס / שמור מפרט כ-PDF
      </button>
      <p role="status" className="sr-only">
        {copied ? "הקישור הועתק" : ""}
      </p>
      <p className="basis-full text-sm text-mist">בחלון ההדפסה בחרו ״שמירה כ-PDF״.</p>
    </div>
  );
}
