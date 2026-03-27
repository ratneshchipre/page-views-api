import { z } from "zod";

export function normalizePath(raw: string | null | undefined): string {
  if (!raw || raw.trim() === "") return "/";

  let path = raw.trim();

  if (!path.startsWith("/")) path = `/${path}`;

  path = path.replace(/\/+/g, "/");

  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path;
}

export function normalizeSite(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

export const TrackQuerySchema = z.object({
  site: z
    .string()
    .min(1, "Missing or empty required query parameter: site")
    .transform(normalizeSite),

  path: z
    .string()
    .optional()
    .transform((v) => normalizePath(v)),
});

export const ViewsQuerySchema = z.object({
  site: z
    .string()
    .min(1, "Missing or empty required query parameter: site")
    .transform(normalizeSite),

  path: z
    .string()
    .optional()
    .transform((v) => normalizePath(v)),
});

export type TrackQuery = z.infer<typeof TrackQuerySchema>;
export type ViewsQuery = z.infer<typeof ViewsQuerySchema>;

export function parseQueryParams<T extends z.ZodTypeAny>(
  searchParams: URLSearchParams,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const raw: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    raw[key] = value;
  });

  const result = schema.safeParse(raw);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Invalid request";
    return { success: false, error: message };
  }

  return { success: true, data: result.data };
}
