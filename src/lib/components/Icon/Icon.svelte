<svelte:options namespace="svg" />

<script context="module">
  import icons from './icons.svg';
</script>

<script lang="ts">
  import type { Icons } from './icons';
  export let name: Icons;
  export let size = "1.5rem";
  export let color = "var(--stroke, currentColor)";
  export let fill = "none";
  export let style = "";

  $: href = `${icons}#${name}`;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  focusable="false"
  {fill}
  stroke-width={fill !== "none" ? 0 : 2}
  stroke-linecap="round"
  stroke-linejoin="round"
  style={`width: ${size}; height: ${size}; stroke: ${color}; ${style}; transition: stroke linear 50ms;`}
  viewBox="0 0 24 24"
>
  <use {href} />
</svg>

<style lang="scss">
  @use './index.scss';
</style>
