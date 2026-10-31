export function getPublicAssetPath(path: string) {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\/+/, '');
  return `${baseUrl}${cleanPath}`;
}
