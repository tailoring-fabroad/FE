<script lang="ts">
	import { Star } from 'phosphor-svelte';
	import type { Product } from '$lib/types';

	export let product: Product;

	const progress = Math.floor(Math.random() * 80) + 10;

	const maxStars = 5;
	const filledStars = Math.floor(product.rating.rate);
	const hasHalf = product.rating.rate - filledStars >= 0.25 && product.rating.rate - filledStars < 0.75;
	const emptyStars = maxStars - filledStars - (hasHalf ? 1 : 0);

	const stars = [
		...Array(filledStars).fill('full'),
		...(hasHalf ? ['half'] : []),
		...Array(emptyStars).fill('empty')
	];
</script>

<div class="w-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
	<div class="relative w-full h-40">
		<img
			src={product.image}
			alt={product.title}
			class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
		/>
		<button
		type="button"
			aria-label="More options"
			class="absolute top-2 right-2 w-9 h-9 flex items-center justify-center 
			rounded-lg border border-gray-300 bg-white text-gray-500 
			hover:bg-gray-200 hover:text-gray-700 
			shadow-sm hover:shadow-md 
			focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1 
			transition-all duration-200"
		>
			<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
				<path d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 11.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 17a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
			</svg>
		</button>	
	</div>

	<div class="p-3 space-y-1">
		<p class="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 h-[2.75rem]">
			{product.title}
		</p>		
		<p class="text-xs text-gray-500">By Creator Placeholder</p>

		<div class="flex items-center gap-1 text-xs mt-1">
			<div class="flex items-center gap-1 text-xs mt-1">
				{#each stars as star}
					{#if star === 'full'}
						<Star class="w-4 h-4 text-yellow-400" weight="fill" />
					{:else if star === 'half'}
						<Star class="w-4 h-4 text-yellow-400" weight="duotone" />
					{:else}
						<Star class="w-4 h-4 text-gray-300" weight="regular" />
					{/if}
				{/each}
				<span class="font-semibold text-gray-800 ml-1">{product.rating.rate}</span>
				<span class="text-gray-500">({product.rating.count})</span>
			</div>
		</div>

		<div class="mt-3">
			<div class="flex justify-between text-[11px] text-gray-600 mb-1">
				<span>{progress}% complete</span>
			</div>
			<div class="w-full bg-gray-200 rounded-full h-1">
				<div class="bg-yellow-600 h-1 rounded-full transition-all duration-300" style="width: {progress}%"></div>
			</div>
		</div>
	</div>
</div>
