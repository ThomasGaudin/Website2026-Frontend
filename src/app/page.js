import Image from "next/image";
import Link from "next/link";
import ProjectPreviewList from "../components/ProjectPreviewList";

async function getProjects() {
  try {
    const res = await fetch("https://api.thomasgaudin.xyz/projects", {
      cache: "no-store", // Pour avoir les données à jour à chaque requête
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();

    if (data.code === 200) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div>
      <ProjectPreviewList projects={projects} />
    </div>
  );
}
