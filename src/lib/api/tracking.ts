import { redis } from "@/lib/api/redis";
import { viewsKey, viewedKey } from "@/lib/api/utils";

const DEDUP_WINDOW_SECONDS = 60 * 30; // 30 minutes

export async function trackView(
  site: string,
  path: string,
  visitorId: string
): Promise<boolean> {
  const dedupKey = viewedKey(site, path, visitorId);
  const counterKey = viewsKey(site, path);

  const isNew = await redis.set(dedupKey, "1", {
    nx: true,
    ex: DEDUP_WINDOW_SECONDS,
  });

  if (!isNew) {
    return false;
  }

  await redis.incr(counterKey);

  return true;
}

export async function getViews(site: string, path: string): Promise<number> {
  const key = viewsKey(site, path);
  const count = await redis.get<number>(key);
  return count ?? 0;
}
