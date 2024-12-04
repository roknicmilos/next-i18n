export function redirect(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}

export function openNewTab(url: string) {
  if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
}
