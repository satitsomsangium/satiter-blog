/** ~200 wpm; returns at least 1 minute for any non-empty body. */
export function getReadingTimeMinutesFromText(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) {
    return 1;
  }
  return Math.max(1, Math.round(words / 200));
}
