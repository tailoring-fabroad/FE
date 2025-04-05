import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$lib/config';

export const load = () => {
    return {
        showHeader: false
    };
};
  
export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      return fail(400, { message: 'Invalid form input' });
    }

    const res = await fetch(`${API_BASE_URL}/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok || data.code !== 200) {
      return fail(res.status, { message: data.message || 'Login failed' });
    }

    const token = data.data.token;

    cookies.set('token', token, {
      path: '/',
      maxAge: 1440,
      sameSite: 'strict'
    });

    throw redirect(303, '/');
  }
};
