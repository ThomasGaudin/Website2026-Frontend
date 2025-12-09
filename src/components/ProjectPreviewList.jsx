"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function ProjectPreviewList({ projects = [] }) {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(projects[0]?.thumb || null);

  function handleMouseEnter(thumb) {
    if (!thumb) return;
    setCurrentVideo(thumb);
    
    // Jouer la vidéo
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
  }

const [hoveredTags, setHoveredTags] = useState(projects[0]?.tags || []);

    // si les projets arrivent après montage, initialiser les tags au premier projet
    useEffect(() => {
        if (projects && projects.length > 0 && (!hoveredTags || hoveredTags.length === 0)) {
            setHoveredTags(projects[0].tags || []);
        }
    }, [projects]);

return (
    <div className="w-full p-5 flex justify-between gap-8">
        {/* Liste des titres */}
        <div className="w-1/2">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project.id} className="mb-7">
                        <Link href={`/${project.slug}`}>
                            <h1
                                onMouseEnter={() => {
                                    handleMouseEnter(project.thumb);
                                    setHoveredTags(project.tags || []);
                                }}
                                className="text-h1 leading-none hover:opacity-70 transition-opacity cursor-pointer"
                            >
                                {project.title}
                            </h1>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-lg">Aucun projet trouvé</p>
            )}
        </div>

        {/* Vidéo */}
        <div className="w-2/5 flex-none">
            <div className="sticky top-5">
                <div
                    className="rounded overflow-hidden shadow-lg w-full project-preview-video-wrapper"
                    style={{ width: "100%", aspectRatio: "16/9" }}
                >
                    {currentVideo && (
                        <video
                            ref={videoRef}
                            src={currentVideo}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            autoPlay
                            style={{ width: "100%", height: "100%" }}
                        />
                    )}
                </div>

                {/* Tags du projet survolé */}
                {hoveredTags && hoveredTags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2 project-preview-tags">
                        {hoveredTags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-sm px-2 py-1 bg-gray-200 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    </div>
);
}