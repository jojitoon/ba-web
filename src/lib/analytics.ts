// Analytics configuration constants
export const VIEW_TRACKING_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds
// Change this value to adjust the view tracking window (e.g., 2 hours = 2 * 60 * 60 * 1000)

/**
 * Get the storage key for tracking views for a specific item
 * Each page (itemId) has its own unique key, so tracking is independent per page
 */
export function getViewTrackingKey(
  itemType: 'project' | 'businessStory',
  itemId: string
): string {
  // Each page gets its own unique key based on itemType and itemId
  // This ensures that viewing one page does not affect tracking for another page
  return `view_track_${itemType}_${itemId}`;
}

/**
 * Check if a view should be counted based on the tracking window
 * Each page is tracked independently - viewing one page does not affect tracking for other pages
 * Returns true if the view should be counted, false otherwise
 */
export function shouldCountView(
  itemType: 'project' | 'businessStory',
  itemId: string
): boolean {
  if (typeof window === 'undefined') return false;

  // Get the unique key for this specific page
  // Each page (itemId) has its own localStorage entry, so they are tracked independently
  const key = getViewTrackingKey(itemType, itemId);
  const lastViewTime = localStorage.getItem(key);

  if (!lastViewTime) {
    // First view of this specific page, count it
    localStorage.setItem(key, Date.now().toString());
    return true;
  }

  const lastView = parseInt(lastViewTime, 10);
  const now = Date.now();
  const timeSinceLastView = now - lastView;

  if (timeSinceLastView >= VIEW_TRACKING_WINDOW_MS) {
    // Enough time has passed since the last view of THIS specific page, count this view
    localStorage.setItem(key, now.toString());
    return true;
  }

  // Within the tracking window for THIS specific page, don't count
  // Note: This only affects the current page, not other pages
  return false;
}
