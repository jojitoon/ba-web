// Analytics configuration constants
export const VIEW_TRACKING_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds
// Change this value to adjust the view tracking window (e.g., 2 hours = 2 * 60 * 60 * 1000)

/**
 * Get the storage key for tracking views for a specific item
 */
export function getViewTrackingKey(
  itemType: 'project' | 'businessStory',
  itemId: string
): string {
  return `view_track_${itemType}_${itemId}`;
}

/**
 * Check if a view should be counted based on the tracking window
 * Returns true if the view should be counted, false otherwise
 */
export function shouldCountView(
  itemType: 'project' | 'businessStory',
  itemId: string
): boolean {
  if (typeof window === 'undefined') return false;

  const key = getViewTrackingKey(itemType, itemId);
  const lastViewTime = localStorage.getItem(key);

  if (!lastViewTime) {
    // First view, count it
    localStorage.setItem(key, Date.now().toString());
    return true;
  }

  const lastView = parseInt(lastViewTime, 10);
  const now = Date.now();
  const timeSinceLastView = now - lastView;

  if (timeSinceLastView >= VIEW_TRACKING_WINDOW_MS) {
    // Enough time has passed, count this view
    localStorage.setItem(key, now.toString());
    return true;
  }

  // Within the tracking window, don't count
  return false;
}
