import type { PageLoad } from './$types';
import type { Product, Response } from '$lib/types';
import { paginate } from '$lib/utils/pagination';
import { fetcher } from '$lib/utils/fetcher';

export const load: PageLoad = async ({ url, fetch }) => {
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = 6;

	const allProducts = await fetcher<Product[]>('https://fakestoreapi.com/products', { fetch });

	const { results, totalPages, totalResults } = paginate(allProducts, page, limit);

	const response: Response<Product[]> = {
		dates: { maximum: '', minimum: '' },
		page,
		results,
		total_pages: totalPages,
		total_results: totalResults
	};

	return {
		products: response.results,
		page: response.page,
		totalPages: response.total_pages
	};
};
