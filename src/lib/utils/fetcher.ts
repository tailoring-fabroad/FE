export async function fetcher<T>(url: string, options?: RequestInit & { fetch?: typeof globalThis.fetch }): Promise<T> {
	const fetchFn = options?.fetch ?? fetch;
	const res = await fetchFn(url, options);

	if (!res.ok) {
		throw new Error(`Failed to fetch: ${res.status}`);
	}

	return await res.json();
}
