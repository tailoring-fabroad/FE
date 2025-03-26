<script lang="ts">
	export let current: number;
	export let total: number;
</script>

<div class="mt-4 flex justify-center gap-2 px-4 py-6">
	{#if current > 1}
		<a
			href="?page={current - 1}"
			class="rounded bg-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-400"
		>
			Previous
		</a>
	{/if}

	{#each Array(total).fill(0).map((_, i) => i + 1) as pageNumber}
		<a
			href="?page={pageNumber}"
			class="rounded px-3 py-2 text-sm transition-all duration-200
				{current === pageNumber
					? 'bg-sky-600 text-white font-bold'
					: 'bg-white text-gray-800 hover:bg-gray-200 border border-gray-300'}"
		>
			{pageNumber}
		</a>
	{/each}

	{#if current < total}
		<a
			href="?page={current + 1}"
			class="rounded bg-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-400"
		>
			Next
		</a>
	{/if}
</div>
