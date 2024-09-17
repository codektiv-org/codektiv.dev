<script lang="ts">
	import { onMount } from 'svelte';

	let carouselDiv: HTMLDivElement;
	export let images: { src: string; alt: string; title: string }[];
	export let width: string;
	export let height: string;

	onMount(() => {
		carouselDiv.style.scrollBehavior = 'auto';
		carouselDiv.scrollLeft = carouselDiv.clientWidth;
		carouselDiv.style.scrollBehavior = 'smooth';
	});

	function slideCarousel(direction: 'left' | 'right') {
		const multiplier = direction === 'left' ? -1 : 1;

		const wouldScrollOut =
			carouselDiv.scrollLeft < carouselDiv.clientWidth ||
			carouselDiv.scrollLeft > carouselDiv.clientWidth * (carouselDiv.children.length - 2);

		if (wouldScrollOut) {
			carouselDiv.style.scrollBehavior = 'auto';
			carouselDiv.scrollBy({ left: -2 * carouselDiv.clientWidth * multiplier }); // todo this only works for two images, showe some .children.length in ter
			carouselDiv.style.scrollBehavior = 'smooth';
		}
		carouselDiv.scrollBy({ left: multiplier });
	}
</script>

<div class="carousel" style:width style:height bind:this={carouselDiv}>
	{#if images.at(-1) !== undefined}
		{@const { src, title, alt } = images[images.length - 1]}
		<div class="carousel-item relative w-full">
			<enhanced:img {src} {title} {alt} />
			<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<button on:click={() => slideCarousel('left')} class="btn btn-circle">❮</button>
				<button on:click={() => slideCarousel('right')} class="btn btn-circle">❯</button>
			</div>
		</div>
	{/if}
	{#each images as { src, alt, title }}
		<div class="carousel-item relative w-full">
			<enhanced:img {src} {title} {alt} />
			<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<button on:click={() => slideCarousel('left')} class="btn btn-circle">❮</button>
				<button on:click={() => slideCarousel('right')} class="btn btn-circle">❯</button>
			</div>
		</div>
	{/each}
</div>
