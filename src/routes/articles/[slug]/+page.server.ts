import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { API_BASE_URL } from '$lib/config';
import type { Article } from '$lib/types';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBldGVyemFsYWlfbG9jYWxob3N0IiwiZXhwIjoxNzQzNzgyNzExLCJzdWIiOiJhY2Nlc3MifQ.J-qb-7I5WulNQyb_PfqJ5MsW2W9L-cfGIkNB9asudns';

export const load: PageServerLoad = async ({ params }) => {
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
	updateArticle: async ({ request, url }) => {
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