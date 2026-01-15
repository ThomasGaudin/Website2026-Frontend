import Link from "next/link";
import { features } from "process";

async function getAbout() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/about`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.log("Response not OK, status:", res.status);
      return null;
    }

    const data = await res.json();

    if (data.code === 200) {
      const about = data.data;
      return about;
    }

    return null;
  } catch (error) {
    console.error("Error fetching features:", error);
    return null;
  }
}

export default async function AboutPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <div className="p-5 w-full">
        <Link href="/" className="mb-6 inline-block text-h3">
          ← Retour
        </Link>
        <p>Erreur lors du chargement de la page</p>
      </div>
    );
  }

  return (
    <div className="p-5 w-full">
      <Link href="/" className="mb-6 inline-block text-h3">
        ← Retour
      </Link>
      <div className="flex flex-col gap-10 md:w-3/4 w-full h-full items-stretch">
        <div className="flex-1">
          <h1 className="text-h1 leading-none mb-4">About</h1>
          <p className="text-h3 w-full mb-4">{about.texte}</p>
        </div>
        <div className="flex-1">
          <h2 className="text-h1 leading-none mb-4">Features</h2>
          {about.features && about.features.length > 0 ? (
            <div className="mb-8">
              {about.features.map((about) => (
                <div key={about.where}>
                  <h3 className="text-h3">
                    <Link
                      href={about.url || "#"}
                      className="md:opacity-100 opacity-70 md:hover:opacity-70 md:transition-opacity"
                      target={about.url ? "_blank" : undefined}
                      rel={about.url ? "noopener noreferrer" : undefined}
                    >
                      {about.date && new Date(about.date).getFullYear()}{" "}
                      {about.what} - {about.where}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
