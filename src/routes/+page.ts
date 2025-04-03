import type { PageLoad } from './$types';
import type { Article, Response } from '$lib/types';
import type { LoadEvent } from '@sveltejs/kit';
import { paginate } from '$lib/utils/pagination';
import { fetcher } from '$lib/utils/fetcher';
import { API_BASE_URL } from '$lib/config';
import { searchStore } from '$lib/stores/search';

export const load: PageLoad = async ({ url, fetch }: LoadEvent) => {
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = 12;

	const res = await fetcher<{ data: { articles: Article[], articlesCount: number } }>(
		`${API_BASE_URL}/articles/feed`,
		{ fetch }
	);

	const allArticles = res.data.articles.map((article) => ({
		...article,
		searchTerms: `${article.author.username} ${article.title} `
	}));

	searchStore.set({
		data: allArticles,
		filtered: allArticles,
		search: url.searchParams.get('search') ?? ''
	});

	const { results, totalPages, totalResults } = paginate(allArticles, page, limit);

	return {
		articles: results,
		page,
		totalPages,
		search: url.searchParams.get('search') ?? ''
	};
};
