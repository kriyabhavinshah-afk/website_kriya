/**
 * Analytics placeholder component.
 * Disabled by default. Enable by setting ENABLE_ANALYTICS to true
 * and implementing your analytics provider (e.g. Google Analytics, Vercel Analytics).
 */

// Set to true when ready to enable analytics
const ENABLE_ANALYTICS = false;

export default function Analytics() {
  if (!ENABLE_ANALYTICS) return null;

  // Add your analytics script or component here
  // Example: return <Script src="..." strategy="afterInteractive" />;
  return null;
}
