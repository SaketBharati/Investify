const windows = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ENTRIES = 10000;

const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of windows) {
    if (entry.resetAt <= now) windows.delete(key);
  }
}, WINDOW_MS).unref();

function rateLimit({ limit = 10 } = {}) {
  return (req, res, next) => {
    const now = Date.now();
    const key = `${req.path}:${req.ip}`;
    let entry = windows.get(key);
    if (!entry || entry.resetAt <= now) {
      if (windows.size >= MAX_ENTRIES) {
        const oldestKey = windows.keys().next().value;
        if (oldestKey) windows.delete(oldestKey);
      }
      entry = { count: 0, resetAt: now + WINDOW_MS };
      windows.set(key, entry);
    }
    entry.count += 1;
    res.set("RateLimit-Limit", String(limit));
    res.set("RateLimit-Remaining", String(Math.max(0, limit - entry.count)));
    res.set("RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));
    if (entry.count > limit) {
      return res.status(429).json({ success: false, message: "Too many attempts. Please try again later." });
    }
    return next();
  };
}

module.exports = rateLimit;
