import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen p-5">
      <h1 className="text-h1 leading-none mb-7">404</h1>
      <Link href="/" className="text-h3">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
