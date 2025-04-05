<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Layout/Header.svelte';
  
	export let data: {
	  	isAuthenticated: boolean;
	};
</script>
  
<div class="relative">
	<Header {data} />
	<slot />
</div>

  