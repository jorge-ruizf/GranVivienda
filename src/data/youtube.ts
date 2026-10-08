export type YoutubeOrientation = "portrait" | "landscape";

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function isValidId(value: string): boolean {
  return ID_PATTERN.test(value);
}

export function parseYoutubeId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  if (isValidId(raw)) return raw;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www|m|music)\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return isValidId(id) ? id : null;
  }
  if (host !== "youtube.com" && host !== "youtube-nocookie.com") return null;

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments[0] === "watch") {
    const id = url.searchParams.get("v") ?? "";
    return isValidId(id) ? id : null;
  }
  if (
    segments[0] === "shorts" ||
    segments[0] === "embed" ||
    segments[0] === "live" ||
    segments[0] === "v"
  ) {
    const id = segments[1] ?? "";
    return isValidId(id) ? id : null;
  }
  return null;
}

export function getYoutubeThumb(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function resolveYoutubeOrientation(
  url: string,
  orientation?: YoutubeOrientation
): YoutubeOrientation {
  if (orientation === "portrait" || orientation === "landscape") return orientation;
  return /\/shorts\//.test(url) ? "portrait" : "landscape";
}
