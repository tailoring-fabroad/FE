<script lang="ts">
    import Filter from '$lib/components/UI/Filter.svelte';
    import { onMount, onDestroy} from 'svelte';
  
    export let search = '';
    export let category = 'all';
    export let rating = 'any';
    export let updateSearch;
    export let updateCategory;
    export let updateRating;
    
    export let slides = [
      { src: '/food.jpeg', title: 'First Slide', desc: 'Find the best food in town' },
      { src: '/work.jpg', title: 'Second Slide', desc: 'Explore tech & gadgets' },
      { src: '/car.jpg', title: 'Third Slide', desc: 'Discover amazing fashion' }
    ];
  
    let current = 0;
    let interval: ReturnType<typeof setInterval>;
  
    const next = () => (current = (current + 1) % slides.length);
    const prev = () => (current = (current - 1 + slides.length) % slides.length);
  
    onMount(() => {
      interval = setInterval(next, 5000);
    });
  
    onDestroy(() => clearInterval(interval));
  </script>
  
  <section class="relative h-[500px] w-full overflow-hidden">
    {#each slides as slide, i}
      <div class={`absolute inset-0 transition-opacity duration-5000 ease-in-out ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
           aria-hidden={i !== current}>
        <img src={slide.src} alt={slide.title} class="w-full h-full object-cover" />
        <div class="absolute z-20 bottom-10 left-10 text-white">
          <h2 class="text-3xl font-bold">{slide.title}</h2>
          <p class="text-sm">{slide.desc}</p>
        </div>
      </div>
    {/each}
  
    <div class="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-4">
      <div class="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6">
        <Filter
          {search}
          {category}
          {rating}
          on:search={(e) => updateSearch(e.detail)}
          on:category={(e) => updateCategory(e.detail)}
          on:rating={(e) => updateRating(e.detail)}
        />
      </div>
    </div>
    
    {#each slides as slide, i}
        <div
            class={`absolute inset-0 transition-opacity duration-5000 ease-in-out ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={i !== current}
        >
            <img src={slide.src} alt={slide.title} class="w-full h-full object-cover" />
            <div class="absolute z-20 bottom-8 left-6 md:left-16 text-white space-y-1 md:space-y-2">
                <h2 class="text-xl md:text-3xl font-bold drop-shadow">{slide.title}</h2>
                <p class="text-sm md:text-base drop-shadow">{slide.desc}</p>
            </div>
        </div>
    {/each}

    <div class="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-4">
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <Filter
                {search}
                {category}
                {rating}
                on:search={(e) => updateSearch(e.detail)}
                on:category={(e) => updateCategory(e.detail)}
                on:rating={(e) => updateRating(e.detail)}
            />
        </div>
    </div>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {#each slides as _, i}
            <button
                on:click={() => current = i}
                class={`h-2.5 w-10 rounded-full transition-all duration-1000 ${
                    current === i
                        ? 'bg-white shadow-md scale-105'
                        : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
            ></button>
        {/each}
    </div>
    
  </section>
  
  <style>
    section {
      will-change: transform, opacity;
    }
  </style>