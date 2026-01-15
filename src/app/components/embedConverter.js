export default function EmbedConverter(url) {
  try {
    const u = new URL(url);

    // https://youtu.be/VIDEO_ID
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    // Si ce n'est pas un lien YT valide
    return null;
  } catch (e) {
    return null;
  }
}
