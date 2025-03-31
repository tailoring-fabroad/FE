<script lang="ts">
	import { Star, Heart, ThumbsUp, CaretDown, CaretUp } from 'phosphor-svelte';
	import Rating from '$lib/components/UI/Rating.svelte';
	import type { Article } from '$lib/types';
	import { onMount, tick } from 'svelte';

	export let article: Article;

	let isExpanded = false;
	let isOverflowing = false;
	let descEl: HTMLParagraphElement;

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleString(undefined, {
			dateStyle: 'medium',
			timeStyle: 'short'
		});
	}

	const fallbackAvatar = '/avatar-default.avif';

	onMount(async () => {
		await tick();
		if (descEl) {
			const { scrollHeight, clientHeight } = descEl;
			isOverflowing = scrollHeight > clientHeight;
		}
	});
</script>

<div class="w-full h-full bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all flex flex-col overflow-hidden">
	<div class="flex items-center gap-3 px-4 pt-4">
		<img
			src={article.author.image ?? fallbackAvatar}
			alt={article.author.username}
			class="w-10 h-10 rounded-full object-cover border border-gray-300"
		/>
		<div class="text-sm">
			<p class="font-medium">
				{article.author.username ?? 'Unknown'} 
				<span class="text-gray-500 font-normal">wrote an article</span>
			</p>
			<p class="text-xs text-gray-400">{formatDate(article.updatedAt)}</p>
		</div>
	</div>

	{#if article.description}
		<div class="mt-3 w-full aspect-[4/3] overflow-hidden">
			<img
				src={article.image}
				alt={article.title}
				class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</div>
	{/if}

	<div class="px-4 mt-3 space-y-1">
		<p class="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
			{article.title}
		</p>

		<!-- <div class="flex items-center gap-1 text-sm text-gray-600">
			<Star class="w-4 h-4 text-yellow-400" weight="fill" />
			<Star class="w-4 h-4 text-yellow-400" weight="fill" />
			<Star class="w-4 h-4 text-yellow-400" weight="fill" />
			<Star class="w-4 h-4 text-yellow-400" weight="regular" />
			<Star class="w-4 h-4 text-gray-300" weight="regular" />
			<span class="ml-1 text-xs text-gray-500">123</span>
		</div> -->
		<!-- Di dalam ArticleCard atau page -->
		<Rating rating={4.3} count={999} />


		{#if article.tag_list.length > 0}
			<div class="flex flex-wrap gap-1">
				{#each article.tag_list as tag}
					<span class="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded-full">
						#{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	{#if article.description}
		<div class="px-4 mt-2">
			<p
				class="text-sm text-gray-700 transition-all duration-300 overflow-hidden"
				class:is-expanded={isExpanded}
				class:line-clamp-2={!isExpanded}
				bind:this={descEl}
			>
				{article.description}
			</p>

			{#if isOverflowing}
				<button
					type="button"
					class="flex items-center gap-1 text-blue-500 text-xs mt-1 hover:underline focus:outline-none"
					on:click={() => (isExpanded = !isExpanded)}
				>
					{#if isExpanded}
						Read less <CaretUp class="w-3 h-3" />
					{:else}
						Read more <CaretDown class="w-3 h-3" />
					{/if}
				</button>
			{/if}
		</div>
	{/if}

	{#if !article.description}
		<div class="mt-3 w-full aspect-[4/3] overflow-hidden">
			<img
				src={article.image}
				alt={article.title}
				class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</div>
	{/if}

	<div class="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-gray-500 text-sm mt-auto">
		<div class="flex gap-3 items-center">
			<Heart class="w-5 h-5 cursor-pointer hover:text-red-500" />
			<ThumbsUp class="w-5 h-5 cursor-pointer hover:text-blue-500" />
		</div>
		<a href={`/articles/${article.slug}`} class="text-xs text-blue-500 hover:underline">View detail</a>
	</div>
</div>
