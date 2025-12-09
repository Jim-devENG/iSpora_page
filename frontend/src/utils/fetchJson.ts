/**
 * Safe JSON fetch utility
 * 
 * Validates response status and content-type before parsing JSON.
 * Throws descriptive errors instead of crashing on invalid responses.
 * 
 * @param url - The URL to fetch
 * @param options - Optional fetch options (method, headers, body, etc.)
 * @returns Promise resolving to parsed JSON data
 * @throws Error with descriptive message if fetch fails or response is not JSON
 * 
 * @example
 * ```ts
 * try {
 *   const posts = await fetchJson('/api/blog-posts');
 *   console.log(posts);
 * } catch (error) {
 *   console.error('Failed to fetch posts:', error.message);
 * }
 * ```
 */
export async function fetchJson<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  // Check if response is OK (status 200-299)
  if (!response.ok) {
    const statusText = response.statusText || 'Unknown Error';
    throw new Error(
      `Request failed: ${response.status} ${statusText}. URL: ${url}`
    );
  }

  // Validate content-type header
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    // Try to read the response body for debugging
    const text = await response.text();
    const preview = text.substring(0, 200);
    
    throw new Error(
      `Expected JSON but got ${contentType}. ` +
      `This usually means the API endpoint returned HTML (404 page) or another format. ` +
      `Response preview: ${preview}`
    );
  }

  // Parse and return JSON
  try {
    return await response.json();
  } catch (parseError: any) {
    throw new Error(
      `Failed to parse JSON response: ${parseError.message}. ` +
      `URL: ${url}`
    );
  }
}

