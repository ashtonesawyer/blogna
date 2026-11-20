/*
Shared helpers used by SinglePost and PostFeed.
API requests use the existing session cookie through Vite's proxy.
 */
export const requestJSON = async function requestJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error('Could not read the server response. Please try again.');
  }

  if (!response.ok) {
    const error = new Error(data?.msg || data?.errors?.[0]?.message || 'The request failed.');

    error.status = response.status;
    throw error;
  }

  return data;
};

//Display publication dates consistently across the feed & article page.
export const formatDate = function formatDate(value) {
  const date = new Date(value);

  if (!value || Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

//Generate initials for the circular author avatars from the mockup.
export const initials = function initials(name = '') {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => Array.from(word)[0])
      .join('')
      .toUpperCase() || '?'
  );
};
