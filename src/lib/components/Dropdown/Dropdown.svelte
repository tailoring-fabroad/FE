<script lang="ts">
    import Icon from '$lib/components/Icon/Icon.svelte';
    import type { Icons } from '$lib/components/Icon/icons';
  
    export let label: string;
    export let icon: Icons | null = null;
    export let items: { label: string; href?: string; children?: typeof items }[] = [];
  </script>
  
  <div class="dropdown">
    <div class="trigger">
      {#if icon}
        <Icon name={icon} size="1em" />
      {/if}
      <span>{label}</span>
    </div>
    <div class="menu">
      {#each items as item}
        {#if item.children}
          <div class="submenu">
            <span>{item.label}</span>
            <div class="submenu-items">
              <svelte:self label={item.label} items={item.children} />
            </div>
          </div>
        {:else}
          <a href={item.href} class="dropdown-item">{item.label}</a>
        {/if}
      {/each}
    </div>
  </div>
  
  <style lang="scss">
    @use './index.scss';
  </style>
  