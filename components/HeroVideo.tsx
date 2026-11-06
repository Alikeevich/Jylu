/**
 * Full-screen background video. Placeholder lives in /public/video —
 * replace hero.mp4 (and poster.jpg) with real footage, same file names.
 * Reduced-motion users get the poster: /public/site.js pauses the video.
 */
export default function HeroVideo() {
  return (
    <div className="hero__media" aria-hidden>
      <video
        className="hero__video"
        src="/video/hero.mp4"
        poster="/video/poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="hero__shade" />
    </div>
  );
}
