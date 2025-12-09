import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProject(slug) {
  try {
    const url = `http://localhost:8000/projects/${slug}`;
    console.log("Fetching from URL:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      console.log("Response not OK, status:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("Response data:", data);

    if (data.code === 200) {
      // Transformer les URLs relatives en URLs absolues pour les images
      const project = data.data;
      if (project.images) {
        project.images = project.images.map((image) => ({
          ...image,
          url: image.url.startsWith("http")
            ? image.url
            : `http://localhost:8000${image.url}`,
        }));
      }
      return project;
    }

    return null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }) {
  // Dans Next.js 16, params est une Promise et doit être await
  const { slug } = await params;

  if (!slug) {
    console.error("No slug provided");
    notFound();
  }

  console.log("Fetching project with slug:", slug);

  const project = await getProject(slug);

  if (!project) {
    console.log("Project not found for slug:", slug);
    notFound();
  }

  console.log("Project found:", project.title);

  return (
    <div className="w-screen p-5">
      <Link href="/" className="mb-8 inline-block text-h3">
        ← Retour
      </Link>

      <article className="max-w-4xl">
        <h1 className="text-h1 leading-none mb-7">{project.title}</h1>

        {project.description && (
          <p className="text-h3 mb-8">{project.description}</p>
        )}

        {project.date && (
          <p className="text-h3 mb-8 opacity-70">Date: {project.date}</p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mb-8">
            <p className="text-h3 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="text-h3 px-3 py-1 border rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.images && project.images.length > 0 && (
          <div className="mb-8 space-y-4">
            {project.images.map((image, index) => (
              <div key={index} className="w-full">
                <Image
                  src={image.url}
                  alt={image.alt || project.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            ))}
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
