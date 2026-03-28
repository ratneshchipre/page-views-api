import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = request.nextUrl.origin;

  const script = `(function() {
  if (typeof window === 'undefined' || window.__PV_LOADED__) return;
  window.__PV_LOADED__ = true;

  const script = document.currentScript || document.querySelector('script[src*="/script"]');
  const site = script ? script.getAttribute('data-site') : null;

  if (!site) {
    console.debug("[PV] Tracking skipped: data-site attribute missing.");
    return;
  }

  let lastTrackedPath = null;

  function track() {
    const path = window.location.pathname.replace(/\\/$/, "") || "/";
    
    // Prevent double tracking on same path (common in some SPA transitions)
    if (path === lastTrackedPath) return;
    lastTrackedPath = path;

    const apiBase = "${origin}";
    const trackUrl = apiBase + "/api/v1/track?site=" + encodeURIComponent(site) + "&path=" + encodeURIComponent(path);

    try {
      if (typeof fetch === 'function') {
        fetch(trackUrl, { method: 'GET', keepalive: true, mode: 'no-cors' }).catch(function() {});
      } else if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        // Beacon is POST, but your API currently only handles GET.
        // We fallback to simple image pixel if fetch isn't available to ensure GET works.
        const img = new Image();
        img.src = trackUrl;
      }
    } catch (e) {}
  }

  // Initial hit
  if (document.readyState === 'complete') {
    track();
  } else {
    window.addEventListener('load', track);
  }

  // SPA Route Change Tracking
  const handleRouteChange = function() {
    // Wait for Next.js/React to update the DOM and URL
    setTimeout(track, 0);
  };

  window.addEventListener('popstate', handleRouteChange);

  // Intercept History pushes
  const pushState = history.pushState;
  if (pushState) {
    history.pushState = function() {
      pushState.apply(history, arguments);
      handleRouteChange();
    };
  }

  const replaceState = history.replaceState;
  if (replaceState) {
    history.replaceState = function() {
      replaceState.apply(history, arguments);
      handleRouteChange();
    };
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
