import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";
import { wineButton } from "../ui";

export function NotFoundPage() {
  usePageTitle("העמוד לא נמצא — סינמטק טבריה");

  return (
    <div className="mx-auto flex min-h-[50svh] w-full max-w-3xl flex-col justify-center px-4 py-20 sm:px-6">
      <h1 className="display-section">העמוד לא נמצא</h1>
      <p className="mt-4 max-w-xl text-silver">הקישור שהגעת אליו אינו קיים. אפשר לחזור לדף הבית או ללוח ההקרנות.</p>
      <Link to="/" className={`${wineButton} mt-6 self-start`}>
        חזרה לדף הבית
      </Link>
    </div>
  );
}
