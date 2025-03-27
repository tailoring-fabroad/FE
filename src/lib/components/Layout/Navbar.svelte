<script lang="ts">
    export let vertical = false;
  
    const links = [
      { label: 'MOVIE REVIEWS', href: '/movie-reviews' },
      { label: 'GREAT MOVIES', href: '/great-movies', icon: '⚜' },
      { label: 'TV/STREAMING', href: '/tv-streaming' },
      { label: 'INTERVIEWS', href: '/interviews' },
      { label: 'COLLECTIONS', href: '/collections' },
      { label: 'SUNDANCE', href: '/sundance' },
      { label: 'CONTRIBUTORS', href: '/contributors' }
    ];
  </script>
  
  <nav class={`text-sm font-bold ${vertical ? 'flex flex-col gap-4 text-center items-center' : 'flex gap-6 items-center justify-center'}`}>
    {#each links as { label, href, icon }}
      <a href={href} class="hover:text-yellow-600 flex items-center gap-1 transition-colors duration-200">
        {#if icon}
          <span class="text-yellow-500">{icon}</span>
        {/if}
        {label}
      </a>
    {/each}
  </nav>
  
  <style>
    a {
      text-decoration: none;
    }
  </style>
  