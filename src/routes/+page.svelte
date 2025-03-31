<script lang="ts">
	import Header from '$lib/components/Layout/Header.svelte';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import ArticleCard from '$lib/components/Articles/Card.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Spinner from '$lib/components/UI/Spinner.svelte';
	import Filter from '$lib/components/UI/Filter.svelte';

	import type { Article } from '$lib/types';
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate, goto } from '$app/navigation';

	export let data: {
		articles: Article[];
		page: number;
		totalPages: number;
		search?: string;
	};

	let search = data.search ?? '';
	let category = 'all';
	let rating = 'any';

	let isNavigating = false;

	onMount(() => {
		beforeNavigate(() => (isNavigating = true));
		afterNavigate(() => (isNavigating = false));
	});

	function updateSearch(value: string) {
		search = value;
		const query = new URLSearchParams(window.location.search);
		query.set('search', value);
		query.set('page', '1');
		goto(`?${query.toString()}`);
	}

	function updateCategory(value: string) {
		category = value;
		const query = new URLSearchParams(window.location.search);
		query.set('category', value);
		query.set('page', '1');
		goto(`?${query.toString()}`);
	}

	function updateRating(value: string) {
		rating = value;
		const query = new URLSearchParams(window.location.search);
		query.set('rating', value);
		query.set('page', '1');
		goto(`?${query.toString()}`);
	}
</script>

<main class="min-h-screen flex flex-col bg-gray-100">
	{#if isNavigating}
		<Spinner />
	{/if}

	<Header />

	<section class="flex flex-col items-center justify-start min-h-screen px-4 pt-36 pb-20">
		<div class="w-full max-w-4xl mb-12">
			<Filter
				{search}
				{category}
				{rating}
				on:search={(e) => updateSearch(e.detail)}
				on:category={(e) => updateCategory(e.detail)}
				on:rating={(e) => updateRating(e.detail)}
			/>
		</div>
	
		<div class="w-full max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
			{#each data.articles as article}
				<ArticleCard {article} />
			{/each}
		</div>		
	</section>

	<Pagination current={data.page} total={data.totalPages} />

	<Footer />
</main>
