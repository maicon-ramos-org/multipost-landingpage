type FbqFunction = (
  method: string,
  eventNameOrPixelId: string,
  params?: Record<string, unknown>,
  options?: { eventID: string }
) => void;

interface Window {
  fbq?: FbqFunction;
  dataLayer?: Record<string, unknown>[];
}
