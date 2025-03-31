<script lang="ts">
	export let rating: number = 0;
	export let count: number = 0;

	const maxStars = 5;
	const filled = Math.floor(rating);
	const hasHalf = rating - filled >= 0.25 && rating - filled < 0.75;
	const empty = maxStars - filled - (hasHalf ? 1 : 0);

	const stars = [
		...Array(filled).fill('full'),
		...(hasHalf ? ['half'] : []),
		...Array(empty).fill('empty')
	];
</script>

<div class="flex items-center space-x-1">
	{#each stars as star}
		{#if star === 'full'}
			<div class="w-5 h-5 bg-orange-400 rounded text-white text-xs flex items-center justify-center">★</div>
		{:else if star === 'half'}
			<div class="w-5 h-5 bg-orange-400 rounded text-white text-xs flex items-center justify-center relative overflow-hidden">
				<span class="absolute right-0 w-1/2 h-full bg-white opacity-70"></span>
				★
			</div>
		{:else}
			<div class="w-5 h-5 bg-gray-300 rounded text-white text-xs flex items-center justify-center">★</div>
		{/if}
	{/each}

	<span class="ml-2 text-sm text-gray-800">{rating.toFixed(1)} <span class="text-gray-500">({count} reviews)</span></span>
</div>
