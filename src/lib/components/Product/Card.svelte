<script lang="ts">
	import { Star } from 'phosphor-svelte';
	import type { Product } from '$lib/types';

	export let product: Product;
</script>

<div
	class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:scale-[1.03] hover:shadow-lg"
>
	<img
		src={product.image}
		alt={product.title}
		class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
	/>

	<div class="flex flex-1 flex-col justify-between p-4 space-y-3">
		<p class="line-clamp-2 text-base font-medium text-gray-800">{product.title}</p>

		<div class="flex items-center justify-between">
			<div class="flex items-center gap-1 text-yellow-500">
				<Star class="size-4" />
				<span class="text-sm text-gray-700">
					{product.rating.rate} ({product.rating.count})
				</span>
			</div>

			<button
				class="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-sky-700"
			>
				View Detail
			</button>
		</div>
	</div>
</div>
