import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { API_BASE_URL } from '$lib/config';
import type { Article } from '$lib/types';

export const load: PageServerLoad = async ({ params , cookies }) => {
	
	const token = cookies.get('token');
	
	const slug = params.slug;

	try {
		const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
			method: 'GET',
			headers: {
				Accept: '*.*',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			}
		});

		const data = await res.json();

		if (!res.ok) {
			console.error(data);
			throw error(res.status, 'Data Not Found');
		}

		return {
			article: data.data as Article
		};

	} catch (err) {
		console.error(err);
		throw error(500, 'Internal Server Error');
	}
};

export const actions: Actions = {
	updateArticle: async ({ request, url , cookies }) => {

		const token = cookies.get('token');
		
		const slug = url.searchParams.get('slug');

		if (!slug) {
			return error(400, { message: 'Missing slug' });
		}

		const form = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
			image: string;
		};

		const body = {
			article: {
				title: form.title,
				description: form.description,
				body: '-',
				image: form.image
			}
		};

		try {
			const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
				method: 'PUT',
                headers: {
                    Accept: '*.*',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
				body: JSON.stringify(body)
			});

			if (!res.ok) {
				console.error(await res.text());
				return error(res.status, { message: 'Failed to update article' });
			}
		} catch (err) {
			console.error(err);
			return error(500, { message: 'Could not update the article' });
		}

		throw redirect(303, '/articles');
	}
};