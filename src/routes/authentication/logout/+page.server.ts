import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.delete('token', { path: '/' });
    throw redirect(303, '/authentication/login');
  }
};