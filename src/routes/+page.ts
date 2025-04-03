import type { PageLoad } from './$types';
import type { Article, Response } from '$lib/types';
import { paginate } from '$lib/utils/pagination';
import { fetcher } from '$lib/utils/fetcher';
import { API_BASE_URL } from '$lib/config';

export const load: PageLoad = async ({ url, fetch }) => {
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = 12;

	const res = await fetcher<{ data: { articles: Article[], articlesCount: number } }>(
		`${API_BASE_URL}/articles/feed`,
		{ fetch }
	);

	const allArticles = res.data.articles ?? [];

	const { results, totalPages, totalResults } = paginate(allArticles, page, limit);

	const response: Response<Article[]> = {
		dates: { maximum: '', minimum: '' },
		page,
		results,
		total_pages: totalPages,
		total_results: totalResults
	};

	return {
		articles: response.results,
		page: response.page,
		totalPages: response.total_pages
	};
};
