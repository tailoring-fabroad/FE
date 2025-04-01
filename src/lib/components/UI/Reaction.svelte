<script lang="ts">
	import {
		Lightbulb,
		ThumbsUp,
		Heart,
		Frown
	} from 'lucide-svelte';

	export let reactions = [
		{ icon: Lightbulb, label: 'Helpful', count: 27, color: 'text-yellow-600' },
		{ icon: ThumbsUp, label: 'Thanks', count: 12, color: 'text-blue-600' },
		{ icon: Heart, label: 'Love this', count: 26, color: 'text-pink-600' },
		{ icon: Frown, label: 'Oh no', count: 12, color: 'text-green-700' }
	];

	let selected = '';

	function toggle(label: string) {
		selected = selected === label ? '' : label;
	}
</script>

<div class="grid grid-cols-4 gap-2 w-full text-gray-600 px-1 sm:px-2">
	{#each reactions as { icon: Icon, label, count, color }}
		<button
			class={`flex items-center justify-center gap-1 px-2 py-1 text-xs rounded-md transition-all duration-150 ${
				selected === label ? `${color} font-semibold bg-gray-100` : 'hover:bg-gray-50'
			}`}
			on:click={() => toggle(label)}
			aria-label={label || 'reaction'}
		>
			<Icon class="w-5 h-5" />
			<span class="text-[11px] font-medium">{count}</span>
		</button>
	{/each}
</div>