import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EmbedConverter from "../components/embedConverter.js";

async function getProject(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const url = `${apiUrl}/projects/${slug}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.log("Response not OK, status:", res.status);
      return null;
    }

    const data = await res.json();

    if (data.code === 200) {
      const project = data.data;
      return project;
    }

    return null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  if (!slug) {
    console.error("No slug provided");
    notFound();
  }

  const project = await getProject(slug);

  if (!project) {
    console.log("Project not found for slug:", slug);
    notFound();
  }

  return (
    <div className="w-screen p-5">
      <Link href="/" className="mb-6 inline-block text-h3">
        ← Retour
      </Link>

      <article className="w-full">
        <h1 className="text-h1 leading-none mb-4">{project.title}</h1>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag, index) => (
              <span key={index} className="text-h3 px-3 py-1 border rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.description && (
          <p className="text-h3 w-full md:w-3/4 mb-4">{project.description}</p>
        )}
        {project.date && (
          <p className="text-h3 mb-8 opacity-70">Date: {project.date}</p>
        )}

        {(project.imagePrincipale?.[0]?.url ||
          project.images?.length > 0 ||
          project.ytbUrl) && (
          <div className="mb-4 flex flex-col md:flex-row gap-5">
            {/* Image principale – gauche */}
            {project.imagePrincipale?.[0]?.url && (
              <div className="w-full md:w-1/2">
                <Image
                  src={project.imagePrincipale[0].url}
                  alt={project.imagePrincipale[0].alt || project.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Images secondaires – droite */}
            {project.images?.length > 0 && (
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                {project.images.map(
                  (image, index) =>
                    image.url && (
                      <div key={index}>
                        <Image
                          src={image.url}
                          alt={
                            image.alt || `${project.title} image ${index + 1}`
                          }
                          width={1200}
                          height={800}
                          className="w-full h-auto"
                        />
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        )}
        {project.ytbUrl && (
          <div className="w-full md:w-1/2 mb-4 aspect-video">
            <iframe
              src={EmbedConverter(project.ytbUrl)}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        )}

        {project.content && (
          <div
            className="text-h3 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        )}
      </article>
    </div>
  );
}
