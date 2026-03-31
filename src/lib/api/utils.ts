import { createHash } from "crypto";

export function viewsKey(site: string, path: string): string {
  return `views:${site}:${path}`;
}

export function viewedKey(
  site: string,
  path: string,
  visitorId: string
): string {
  return `viewed:${site}:${path}:${visitorId}`;
}

export function rateLimitKey(ip: string, site?: string, path?: string): string {
  const parts = ["rate", ip];
  if (site) parts.push(site);
  if (path) parts.push(path);
  return parts.join(":");
}

export function getVisitorId(request: Request): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";

  const ua = request.headers.get("user-agent") || "unknown";

  return createHash("sha256").update(`${ip}:${ua}`).digest("hex").slice(0, 16);
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
