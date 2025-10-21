export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    // Try parsing error JSON, but safely
    let errorMessage = `Request failed: ${res.status}`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) errorMessage = body.error;
    } catch {
      /* ignore parsing errors */
    }

    throw new Error(errorMessage);
  }

  return (await res.json()) as T;
}
