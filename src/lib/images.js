export const IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80';

export function handleImageError(event) {
  if (event.currentTarget.src !== IMAGE_FALLBACK) {
    event.currentTarget.src = IMAGE_FALLBACK;
  }
}
