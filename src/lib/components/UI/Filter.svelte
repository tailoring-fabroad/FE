<script lang="ts">
    import { debounce } from '$lib/utils/debounce';
	import { createEventDispatcher, onMount } from 'svelte';
	import { searchStore } from '$lib/stores/search'

	export let search = '';
	export let category = 'all';
	export let rating = 'any';
	export let reviewer = '';

	const dispatch = createEventDispatcher();
	let inputEl: HTMLInputElement;
	let reviewerEl: HTMLInputElement;
    
    const debouncedSearch = debounce((value: string) => {
	    dispatch('search', value);
    }, 300);

    function handleSearch(e: Event) {
	    const value = (e.target as HTMLInputElement).value;
	    search = value;
	    debouncedSearch(value);
    }

	function handleCategory(e: Event) {
		dispatch('category', (e.target as HTMLSelectElement).value);
	}

	function handleRating(e: Event) {
		dispatch('rating', (e.target as HTMLSelectElement).value);
	}

	function handleReviewer(e: Event) {
		dispatch('reviewer', (e.target as HTMLInputElement).value);
	}

	function clearSearch() {
		search = '';
		dispatch('search', '');
		inputEl?.focus();
	}

	function clearAll() {
		clearSearch();
		dispatch('category', 'all');
		dispatch('rating', 'any');
		dispatch('reviewer', '');
		reviewer = '';
	}

	onMount(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === '/') {
				e.preventDefault();
				inputEl?.focus();
			}
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});
</script>

<div class="w-full max-w-6xl mx-auto flex flex-col gap-6 px-4">
	<div class="relative w-full">
		<label for="search-input" class="sr-only">Search Products</label>
		<svg class="absolute left-5 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 16.65A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.5 13.65z" />
		</svg>
		<input
			id="search-input"
			bind:this={inputEl}
			type="text"
			class="w-full pl-14 pr-12 py-3 text-lg placeholder-gray-400 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
			placeholder="Search movie titles..."
			bind:value={$searchStore.search}
			on:input={handleSearch}
		/>
		{#if search}
			<button
				on:click={clearSearch}
				class="absolute right-5 top-3.5 text-gray-400 hover:text-gray-600"
				aria-label="Clear search"
			>
				&times;
			</button>
		{/if}
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm mt-4 items-end">
		<div>
			<label for="category-select" class="font-semibold block mb-1">By Category</label>
			<select
				id="category-select"
				class="w-full rounded-full border border-gray-300 py-2 px-4 text-sm"
				on:change={handleCategory}
				bind:value={category}
			>
				<option value="all">All categories</option>
				<option value="electronics">Electronics</option>
				<option value="clothing">Clothing</option>
				<option value="accessories">Accessories</option>
			</select>
		</div>

		<div>
			<label for="rating-select" class="font-semibold block mb-1">By Rating</label>
			<select
				id="rating-select"
				class="w-full rounded-full border border-gray-300 py-2 px-4 text-sm"
				on:change={handleRating}
				bind:value={rating}
			>
				<option value="any">No rating</option>
				<option value="4">★★★★ & up</option>
				<option value="3">★★★ & up</option>
				<option value="2">★★ & up</option>
			</select>
		</div>

		<div>
			<label for="reviewer" class="font-semibold block mb-1">By Reviewer</label>
			<input
				id="reviewer"
				bind:this={reviewerEl}
				type="text"
				placeholder="Filter by reviewer"
				class="w-full rounded-full border border-gray-300 py-2 px-4 text-sm"
				bind:value={reviewer}
				on:input={handleReviewer}
			/>
		</div>

		<div class="flex justify-end items-center h-full">
			<button
				on:click={clearAll}
				class="text-yellow-700 hover:underline text-sm"
				aria-label="Reset filters"
			>
				Reset
			</button>
		</div>
	</div>
</div>
