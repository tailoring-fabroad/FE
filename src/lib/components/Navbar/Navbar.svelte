<script lang="ts">
    import Icon from '$lib/components/Icon/Icon.svelte';
    import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
    import type { Icons } from '$lib/components/Icon/icons';

    export let vertical = false;

    const links: {
        label: string;
        href: string;
        icon: Icons;
        children?: {
            label: string;
            href?: string;
            children?: any[];
        }[];
    }[] = [
        { 
            label: 'IMAGES',
            href: '/images',
            icon: 'image',
            children: [
                {
                    label: 'Images Home',
                    href: '/images/home',
                },
                {
                    label: 'Photos',
                    href: '/photos',
                },
                {
                    label: 'Vectors',
                    href: '/vectors',
                },
            ]
        },
        { 
            label: 'VIDEO', 
            href: '/videos', 
            icon: 'play',
        },
        {   
            label: 'MUSIC', 
            href: '/musics', 
            icon: 'music',
        },
        {   
            label: 'NEWS', 
            href: '/news', 
            icon: 'radio',
        },
    ];
</script>

<nav class={vertical ? 'navbar-vertical' : 'navbar-horizontal'}>
    {#each links as link}
        {#if link.children}
            <Dropdown label={link.label} icon={link.icon} items={link.children} />
        {:else}
            <a href={link.href} class="nav-link">
                <Icon name={link.icon} size="1em" />
                <span>{link.label}</span>
            </a>
        {/if}
    {/each}
</nav>

<style lang="scss">
    @use './index.scss';
</style>
