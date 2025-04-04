import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { API_BASE_URL } from '$lib/config';
import type { Article } from '$lib/types';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBldGVyemFsYWlfbG9jYWxob3N0IiwiZXhwIjoxNzQzNzgyNzExLCJzdWIiOiJhY2Nlc3MifQ.J-qb-7I5WulNQyb_PfqJ5MsW2W9L-cfGIkNB9asudns';

export const load: PageServerLoad = async () => {
	try {
		const res = await fetch(`${API_BASE_URL}/articles?author=peterzalai_localhost&limit=20&offset=0`, {
			method: 'GET',
			headers: {
                Accept: '*.*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
			}
		});

		const data = await res.json();

		if (!res.ok) {
			console.error('Failed to fetch articles:', data);
			throw new Error('Failed to fetch articles');
		}

		return {
			articles: data.data.articles as Article[]
		};

	} catch (err) {
		console.error('Error loading articles:', err);
		return {
			articles: []
		};
	}
};

export const actions: Actions = {
    createArticle: async ({ request }) => {
		const form = await request.formData();
        const tagList = form.get('tagList')?.toString() || '';

		const formData = new FormData();
		formData.set('title', form.get('title') as string);
		formData.set('description', form.get('description') as string);
		formData.set('body', form.get('body') as string);
		formData.set('tagList', tagList);

		const image = form.get('image');
		if (image instanceof File) {
			formData.set('image', image, image.name);
		}

        try {
            const res = await fetch(`${API_BASE_URL}/articles`, {
                method: 'POST',
                headers: {
                    Accept: '*.*',
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (!res.ok) {
                console.error(await res.text());
                return fail(res.status, { message: 'Failed to create article' });
            }
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Could not create the article' });
        }

        throw redirect(303, '/articles');
    },

    deleteArticle: async ({ request }) => {
		const form = await request.formData();
		const slug = form.get('slug');

		if (typeof slug !== 'string') {
			return fail(400, { message: 'Invalid request' });
		}

		try {
			const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
				method: 'DELETE',
				headers: {
					Accept: '*/*',
					Authorization: `Bearer ${token}`,
				}
			});

			if (!res.ok) {
				console.error(await res.text());
				return fail(res.status, { message: 'Failed to delete article' });
			}
		} catch (err) {
			console.error('Delete error:', err);
			return fail(500, { message: 'Could not delete article' });
		}

		throw redirect(303, '/articles');
	},

    updateArticle: async ({ request }) => {
		const form = Object.fromEntries(await request.formData());
		const slug = form.slug?.toString();

		const body = {
			article: {
				title: form.title,
				description: form.description,
				body: form.body ?? '-',
				image: form.image
			}
		};

		const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
            },
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			console.error(await res.text());
			return fail(res.status, { message: 'Failed to update article' });
		}

		throw redirect(303, '/articles');
	}
};
