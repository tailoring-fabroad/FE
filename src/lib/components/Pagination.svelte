<script lang="ts">
	export let current: number;
	export let total: number;
	export let useClientPagination = false;
	export let onClientPageChange: (page: number) => void = () => {};

	function getPagesToDisplay(current: number, total: number): (number | string)[] {
		const pages: (number | string)[] = [];

		if (total <= 7) {
			for (let i = 1; i <= total; i++) pages.push(i);
		} else {
			pages.push(1);

			if (current > 4) {
				pages.push('...');
			}

			for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
				pages.push(i);
			}

			if (current < total - 3) {
				pages.push('...');
			}

			pages.push(total);
		}

		return pages;
	}
</script>

<div class="mt-4 flex justify-center gap-2 px-4 py-6">
	{#if current > 1}
		{#if useClientPagination}
			<button
				on:click={() => onClientPageChange(current - 1)}
				class="rounded px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
			>
				Previous
			</button>
		{:else}
			<a
				href="?page={current - 1}"
				class="rounded px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
			>
				Previous
			</a>
		{/if}
	{/if}

	{#each getPagesToDisplay(current, total) as page}
		{#if typeof page === 'string'}
			<span class="px-3 py-2 text-sm text-gray-500">...</span>
		{:else}
			{#if useClientPagination}
				<button
					on:click={() => onClientPageChange(page)}
					class="rounded px-3 py-2 text-sm transition-all duration-200
						{current === page
							? 'bg-violet-100 text-violet-600 font-medium'
							: 'text-gray-800 hover:bg-gray-200'}"
				>
					{page}
				</button>
			{:else}
				<a
					href="?page={page}"
					class="rounded px-3 py-2 text-sm transition-all duration-200
						{current === page
							? 'bg-violet-100 text-violet-600 font-medium'
							: 'text-gray-800 hover:bg-gray-200'}"
				>
					{page}
				</a>
			{/if}
		{/if}
	{/each}

	{#if current < total}
		{#if useClientPagination}
			<button
				on:click={() => onClientPageChange(current + 1)}
				class="rounded px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
			>
				Next
			</button>
		{:else}
			<a
				href="?page={current + 1}"
				class="rounded px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
			>
				Next
			</a>
		{/if}
	{/if}
</div>
