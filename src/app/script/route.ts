import { NextResponse, type NextRequest } from "next/server";

const DEBUG = process.env.NODE_ENV !== "production";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = request.nextUrl.origin;

  const script = `
(function () {
  var globalDebug = ${DEBUG ? "true" : "false"};
  var debug = globalDebug; // Default from server

  function log() {
    if (!debug || typeof console === "undefined" || !console.log) return;
    console.log.apply(console, arguments);
  }

  window.__PV__ = window.__PV__ || {};
  window.__PV__.status = "loading";

  try {
    if (typeof window === "undefined" || window.__PV_LOADED__) return;
    window.__PV_LOADED__ = true;

    var normalize = function (p) {
      if (!p) return "/";
      p = String(p).trim().replace(new RegExp("/+$"), "");
      if (!p.startsWith("/")) p = "/" + p;
      p = p.replace(new RegExp("/+", "g"), "/");
      if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
      return p || "/";
    };

    var findScript = function () {
      var cur = document.currentScript;
      if (cur && cur.getAttribute("data-site")) return cur;
      var all = document.querySelectorAll("script[data-site]");
      for (var i = all.length - 1; i >= 0; i--) {
        var s = all[i];
        var src = s.getAttribute("src") || "";
        if (src.indexOf("/script") !== -1) return s;
      }
      return document.querySelector("script[data-site]");
    };

    var scriptTag = findScript();

    if (!scriptTag) {
      window.__PV__.status = "missing-script-tag";
      return;
    }

    var site = scriptTag.getAttribute("data-site");
    var manualPath = scriptTag.getAttribute("data-path");
    var userDebug = scriptTag.getAttribute("data-debug") === "true";

    // Update debug state if user explicitly asks for it
    debug = globalDebug || userDebug;

    if (!site || !manualPath) {
      window.__PV__.status = "missing-parameters";
      if (!site) console.warn("[PV] data-site is required.");
      if (!manualPath) console.warn("[PV] data-path is required for Precision Tracking.");
      return;
    }

    var apiOrigin = "${origin}";

    function track() {
      var currentPath = normalize(window.location.pathname);
      var trackPath = normalize(manualPath);

      // Strict Precision Tracking: Only fire if configured path matches current URL
      if (currentPath !== trackPath) {
        log("[PV] Path mismatch, skipping:", { current: currentPath, target: trackPath });
        return;
      }

      var trackUrl =
        apiOrigin +
        "/api/v1/track?site=" +
        encodeURIComponent(site) +
        "&path=" +
        encodeURIComponent(trackPath);

      log("[PV] Tracking visit:", trackPath);

      fetch(trackUrl, { method: "GET", keepalive: true, mode: "cors", credentials: "omit" }).catch(
        function (err) {
          console.error("[PV] error", err);
        }
      );
    }

    if (document.readyState === "complete") {
      track();
    } else {
      window.addEventListener("load", track);
    }

    // Monitor route changes to see if we navigate INTO the target path
    window.addEventListener("popstate", track);
    var originalPushState = history.pushState;
    if (typeof originalPushState === "function") {
      history.pushState = function () {
        var ret = originalPushState.apply(this, arguments);
        if (typeof queueMicrotask === "function") {
          queueMicrotask(track);
        } else {
          setTimeout(track, 0);
        }
        return ret;
      };
    }

    window.__PV__.status = "ready";
    window.__PV__.track = track;
  } catch (e) {
    window.__PV__.status = "error";
  }
})();
`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
