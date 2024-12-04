export function isRootPublicFile(pathname: string): boolean {
  const isOnePartPathname = !pathname.slice(1).includes("/");
  if (!isOnePartPathname) {
    return false;
  }

  const rootPublicFilenames = [
    "favicon.ico",
  ];
  return !!rootPublicFilenames.find(filename => {
    return pathname === `/${filename}`;
  });
}

export function replaceBaseUrl(originalUrl: string, newBaseUrl: string): string {
  const originalUrlObj = new URL(originalUrl);
  const newBaseUrlObj = new URL(newBaseUrl);

  originalUrlObj.protocol = newBaseUrlObj.protocol;
  originalUrlObj.hostname = newBaseUrlObj.hostname;
  originalUrlObj.port = newBaseUrlObj.port;

  return originalUrlObj.toString();
}
