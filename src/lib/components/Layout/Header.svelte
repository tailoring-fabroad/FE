<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from './Navbar.svelte';
	import { fly, scale } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let isMenuOpen = false;
	let isScrolled = false;
	let isWide = false;

	$: showHamburger = isScrolled && isWide;
	$: navbarMode = isScrolled && isMenuOpen ? 'dropdown' : 'horizontal';
	$: showNavbar = (!isScrolled && isWide) || isMenuOpen;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	onMount(() => {
		const handleScroll = () => {
			if (isWide) {
				isScrolled = window.scrollY > 5;
			}
		};
		const handleResize = () => {
			isWide = window.innerWidth >= 768;
			if (!isWide) {
				isScrolled = false;
				isMenuOpen = false;
			}
		};

		handleScroll();
		handleResize();

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<style>
	.navbar-wrapper {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		z-index: 40;
		overflow: hidden;
		will-change: transform, opacity;
		transition: all 0.25s ease-in-out;
	}
</style>

<header class="sticky top-0 z-50 bg-white border-b border-gray-200">
	<div class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
		<div class="flex items-center space-x-2">
			<span class="font-bold text-xl text-black-600">Tailoring Svelte</span>
		</div>

		<div class="flex items-center space-x-4">
			<div class="hidden md:flex items-center border rounded-full px-3 py-1">
				<svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 16.65A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.5 13.65z"/>
				</svg>
				<input type="text" placeholder="Search Keywords..." class="outline-none text-sm w-48" />
			</div>

			<button
				class="hidden md:block bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-full"
				on:click={() => goto('/articles')}
			>
				Upload
			</button>

			<button class="hidden md:block bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-full">
				SIGNUP
			</button>

			{#if showHamburger}
				<button on:click={toggleMenu} aria-label="Toggle menu" class="focus:outline-none">
					{#if isMenuOpen}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			{/if}
		</div>
	</div>
</header>

{#if showNavbar}
	<div
		class="navbar-wrapper bg-white border-b border-gray-200 shadow-md"
		in:fly={{ y: -24, duration: 200 }}
		out:fly={{ y: -24, duration: 150 }}
	>
		<div class="flex justify-center py-3 transition-all duration-300"
			class:!flex-col={navbarMode === 'dropdown'}
			class:!items-center={navbarMode === 'dropdown'}
			class:!text-center={navbarMode === 'dropdown'}
		>
			<Navbar vertical={navbarMode === 'dropdown'} />
		</div>
	</div>
{/if}
