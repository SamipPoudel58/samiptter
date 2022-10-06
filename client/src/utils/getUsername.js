export function getUsername(name) {
  return "@" + name.toLowerCase().replace(/\s+/g, "").slice(0, 15);
}
