import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";
import { goldButton } from "../ui";

export function NotFoundPage() {
  usePageTitle("העמוד לא נמצא — סינמטק טבריה");

  return (
    <div className="mx-auto flex min-h-[50svh] w-full max-w-3xl flex-col justify-center px-4 py-20 sm:px-6">
      <h1 className="display-section">העמוד לא נמצא</h1>
      <p className="mt-3 text-silver">הקישור אינו מוביל לעמוד באתר.</p>
      <Link to="/" className={`${goldButton} mt-6 self-start`}>
        חזרה לעמוד הבית
      </Link>
    </div>
  );
}
