import type { Viewport } from "next";

/** Status bar colour for pages that open on the header, not the dark hero. */
export const legalViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d14" },
  ],
};
