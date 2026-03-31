import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = request.nextUrl.origin;

  const script = `(function() {
  if (typeof window === 'undefined' || window.__PV_LOADED__) return;
  window.__PV_LOADED__ = true;

  const normalize = function(p) {
    if (!p) return "/";
    p = p.trim().replace(/\/+$/, "");
    if (!p.startsWith("/")) p = "/" + p;
    p = p.replace(/\/+/g, "/");
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  };

  const script = document.currentScript || document.querySelector('script[src*="/script"]');
  const site = script ? script.getAttribute('data-site') : null;
  const scriptPathRaw = script ? script.getAttribute('data-path') : null;
  const currentPath = normalize(window.location.pathname);
  const trackPath = scriptPathRaw ? normalize(scriptPathRaw) : currentPath;

  if (!site) {
    console.debug("[PV] Tracking skipped: data-site parameter missing.");
    return;
  }

  if (scriptPathRaw && currentPath !== trackPath) {
    console.debug("[PV] Tracking skipped: path mismatch.", { current: currentPath, target: trackPath });
    return;
  }

  function track() {
    const apiBase = "${origin}";
    const trackUrl = apiBase + "/api/v1/track?site=" + encodeURIComponent(site) + "&path=" + encodeURIComponent(trackPath);

    try {
      if (typeof fetch === 'function') {
        fetch(trackUrl, { method: 'GET', keepalive: true, mode: 'no-cors' }).catch(function() {});
      } else if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const img = new Image();
        img.src = trackUrl;
      }
    } catch (e) {}
  }

  if (document.readyState === 'complete') {
    track();
  } else {
    window.addEventListener('load', track);
  }
})();`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
