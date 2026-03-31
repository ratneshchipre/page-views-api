import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = request.nextUrl.origin;

  const script = `(function() {
  if (typeof window === 'undefined' || window.__PV_LOADED__) return;
  window.__PV_LOADED__ = true;

  const normalize = (p) => {
    if (!p) return "/";
    p = p.trim().replace(/\/+$/, "");
    if (!p.startsWith("/")) p = "/" + p;
    p = p.replace(/\/+/g, "/");
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  };

  // 1. Robust script tag detection
  const findScript = () => {
    const current = document.currentScript;
    if (current && current.getAttribute('data-site')) return current;
    
    // Fallback: Find script by src and required attribute
    return document.querySelector('script[src*="/script"][data-site]');
  };

  const scriptTag = findScript();
  
  if (!scriptTag) {
    console.warn("[PV] Tracking skipped: Script tag with 'data-site' not found.");
    return;
  }

  const site = scriptTag.getAttribute('data-site');
  const manualPath = scriptTag.getAttribute('data-path');

  // 2. Clear warning if data-site is missing
  if (!site) {
    console.warn("[PV] Tracking skipped: 'data-site' attribute is required.");
    return;
  }

  function track() {
    const currentPath = normalize(window.location.pathname);
    // Use manual path if provided, otherwise auto-detect current path
    const trackPath = manualPath ? normalize(manualPath) : currentPath;

    // 3. Strict precision check if manualPath is set
    if (manualPath && currentPath !== normalize(manualPath)) {
      console.debug("[PV] Path mismatch, skipping auto-track:", { current: currentPath, target: normalize(manualPath) });
      return;
    }

    const apiBase = "${origin}";
    const trackUrl = apiBase + "/api/v1/track?site=" + encodeURIComponent(site) + "&path=" + encodeURIComponent(trackPath);

    // 3. Debugging logs
    console.log("[PV] Attempting to track:", { site, currentPath, trackPath, trackUrl });

    // 3. Removed no-cors for better error reporting
    fetch(trackUrl, { method: 'GET', keepalive: true })
      .then(res => {
        if (res.ok) {
          console.log("[PV] Tracking successful.");
        } else {
          console.error("[PV] Tracking failed. Status:", res.status);
        }
      })
      .catch(err => {
        console.error("[PV] Tracking request error:", err);
      });
  }

  // 4. Handle initial load
  if (document.readyState === 'complete') {
    track();
  } else {
    window.addEventListener('load', () => track());
  }

  // 6. SPA Navigation Support (Next.js, etc.)
  let lastPath = window.location.pathname;
  const handleRouteChange = () => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      track();
    }
  };

  // Monkey-patch history.pushState to detect client-side navigation
  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    handleRouteChange();
  };
  
  window.addEventListener('popstate', handleRouteChange);
})();`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
