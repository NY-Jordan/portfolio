export function scrollToPanel(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest",
  });
}
