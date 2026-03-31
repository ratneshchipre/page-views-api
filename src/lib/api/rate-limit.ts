import { redis } from "@/lib/api/redis";
import { rateLimitKey } from "@/lib/api/utils";

const RATE_LIMIT_REQUESTS = 60; // max requests per window
const RATE_LIMIT_WINDOW_SECONDS = 60; // 1 minute

export async function rateLimit(
  ip: string,
  site?: string,
  path?: string
): Promise<void> {
  const key = rateLimitKey(ip, site, path);

  const pipeline = redis.pipeline();
  pipeline.incr(key);
  pipeline.ttl(key);
  const [count, ttl] = (await pipeline.exec()) as [number, number];

  if (ttl === -1 || ttl === -2) {
    await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
  }

  if (count > RATE_LIMIT_REQUESTS) {
    throw new RateLimitError(
      `Rate limit exceeded. Maximum ${RATE_LIMIT_REQUESTS} requests per ${RATE_LIMIT_WINDOW_SECONDS}s window.`
    );
  }
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}
