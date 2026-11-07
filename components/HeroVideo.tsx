/**
 * Full-screen background: a thermal-camera view of a heating pipe, rendered by
 * scripts/hero-video.py (isotherms, a spot-meter on the leak, a light glitch).
 * Replace public/video/hero.mp4 and poster.jpg with real footage, same names.
 * The viewfinder corners are markup, so they stay in place on any screen.
 * Reduced-motion users get the poster: /public/site.js pauses the video.
 */
export default function HeroVideo() {
  return (
    <div className="hero__media" aria-hidden>
      <video className="hero__video" poster="/video/poster.jpg" autoPlay muted loop playsInline preload="auto">
        {/* portrait screens get a cut where the pipe runs below the text; the media source must come first */}
        <source src="/video/hero-portrait.mp4" media="(max-aspect-ratio: 4/5)" type="video/mp4" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__shade" />
      <div className="hero__frame">
        <span className="hero__corner hero__corner--tl" />
        <span className="hero__corner hero__corner--tr" />
        <span className="hero__corner hero__corner--bl" />
        <span className="hero__corner hero__corner--br" />
      </div>
    </div>
  );
}
