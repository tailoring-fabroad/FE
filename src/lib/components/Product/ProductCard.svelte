<script lang="ts">
	import { Star } from 'phosphor-svelte';
	import type { Product } from '$lib/types';

	export let product: Product;
</script>

<div class="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
	<img src={product.image} alt={product.title} class="h-48 w-full object-cover" />
	<div class="p-4 space-y-2">
		<p class="truncate text-lg font-medium text-gray-800">{product.title}</p>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-1 text-yellow-500">
				<Star class="size-4" />
				<span class="text-sm text-gray-700">
					{product.rating.rate} ({product.rating.count})
				</span>
			</div>
			<button class="rounded-full bg-sky-600 px-4 py-2 text-sm text-white transition hover:bg-sky-700">
				View Detail
			</button>
		</div>
	</div>
</div>
