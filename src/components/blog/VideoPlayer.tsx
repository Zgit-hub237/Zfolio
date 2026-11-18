import { getVideoEmbed } from "@/lib/video";

export default function VideoPlayer({ url, title }: { url: string; title: string }) {
  const embed = getVideoEmbed(url);
  if (!embed) return null;
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-dark-4 bg-black">
      {embed.type === "iframe" ? (
        <iframe
          src={embed.src}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <video src={embed.src} controls preload="metadata" className="absolute inset-0 w-full h-full" />
      )}
    </div>
  );
}
