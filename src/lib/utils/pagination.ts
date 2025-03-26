export function paginate<T>(items: T[], page: number, limit: number) {
	const total = items.length;
	const totalPages = Math.ceil(total / limit);
	const start = (page - 1) * limit;
	const end = start + limit;
	const results = items.slice(start, end);

	return {
		page,
		results,
		totalPages,
		totalResults: total
	};
}
