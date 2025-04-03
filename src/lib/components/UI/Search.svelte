<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { debounce } from '$lib/utils/debounce';

	export let placeholder = 'Search...';
	export let delay = 750;
	export let value = '';

	const dispatch = createEventDispatcher();

	const emitSearch = debounce((val: string) => {
		dispatch('search', val);
	}, delay);
</script>

<input
	type="text"
	bind:value
	placeholder={placeholder}
	class="w-full rounded border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
	on:input={() => emitSearch(value)}
/>
