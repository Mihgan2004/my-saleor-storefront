export function withChannel(path = "/") {
  const ch = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL ?? "default-channel";
  const p = path.startsWith("/") ? path : `/${path}`;
  return p.startsWith(`/${ch}`) ? p : `/${ch}${p}`;
}
