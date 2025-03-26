<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
	export let variant: 'primary' | 'outline' = 'primary';
	export let disabled = false;
	export let className = '';
</script>

<button
	type={type}
	disabled={disabled}
	class={`rounded-full px-4 py-2 text-sm transition duration-200
		${variant === 'primary' ? 'bg-sky-600 text-white hover:bg-sky-700' : ''}
		${variant === 'outline' ? 'border border-sky-600 text-sky-600 hover:bg-sky-100' : ''}
		${disabled ? 'opacity-50 cursor-not-allowed' : ''}
		${className}
	`}
>
	<slot />
</button>
