<script lang="ts">
	import Header from '$lib/components/Layout/Header.svelte';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import ProductCard from '$lib/components/Product/Card.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Spinner from '$lib/components/UI/Spinner.svelte';
	import SearchInput from '$lib/components/UI/Search.svelte';

	import type { Product } from '$lib/types';
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';

	export let data: {
		products: Product[];
		page: number;
		totalPages: number;
		search?: string;
	};

	let isNavigating = false;

	onMount(() => {
		beforeNavigate(() => (isNavigating = true));
		afterNavigate(() => (isNavigating = false));
	});

	function handleSearch(event: CustomEvent<string>) {
		const value = event.detail;
		const query = new URLSearchParams(window.location.search);
		query.set('search', value);
		query.set('page', '1'); // reset ke page 1 saat search
		goto(`?${query.toString()}`);
	}
</script>

<main class="min-h-screen flex flex-col bg-gray-100">
	{#if isNavigating}
		<Spinner />
	{/if}

	<Header />

	<div class="p-4 max-w-2xl w-full mx-auto">
		<SearchInput
			placeholder="Search products..."
			value={data.search ?? ''}
			on:search={handleSearch}
		/>
	</div>

	<div class="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each data.products as product}
			<ProductCard {product} />
		{/each}
	</div>

	<div class="flex-grow"></div>

	<Pagination current={data.page} total={data.totalPages} />

	<Footer />
</main>
