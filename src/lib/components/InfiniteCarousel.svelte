<script lang="ts">
	import { onMount } from 'svelte';
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';

	let carouselDiv: HTMLDivElement;
	let firstDiv: HTMLDivElement;
	let lastDiv: HTMLDivElement;
	let observer: IntersectionObserver;
	export let images: { src: EnhancedImgAttributes['src']; alt: string; title: string }[];
	export let widthPx: number;
	export let heightPx: number;

	onMount(() => {
		carouselDiv.style.scrollBehavior = 'auto';
		carouselDiv.scrollLeft = carouselDiv.clientWidth;
		carouselDiv.style.scrollBehavior = 'smooth';

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						carouselDiv.style.scrollBehavior = 'auto';
						if (entry.target.id === 'first') {
							carouselDiv.scrollLeft = carouselDiv.clientWidth * (carouselDiv.children.length - 2);
						} else {
							carouselDiv.scrollLeft = carouselDiv.clientWidth;
						}
						carouselDiv.style.scrollBehavior = 'smooth';
					}
				});
			},
			{
				root: carouselDiv,
				threshold: 1.0
			}
		);
		[firstDiv, lastDiv].forEach((d) => {
			observer.observe(d);
		});

		const interval = setInterval(() => {
			slideCarousel('right');
		}, 5 * 1000);

		return () => clearInterval(interval);
	});

	function slideCarousel(direction: 'left' | 'right') {
		const multiplier = direction === 'left' ? -1 : 1;
		carouselDiv.scrollBy({ left: multiplier });
	}
</script>

<div
	class="carousel"
	style:width={`${widthPx}px`}
	style:height={`${heightPx}px`}
	bind:this={carouselDiv}
>
	{#if images.length > 0}
		{@const { src, title, alt } = images[images.length - 1]}
		<div class="carousel-item relative w-full" id="first" bind:this={firstDiv}>
			<enhanced:img {src} {title} {alt} />
			<div class="overlay">
				<button on:click={() => slideCarousel('left')} class="btn btn-circle">❮</button>
				<button on:click={() => slideCarousel('right')} class="btn btn-circle">❯</button>
			</div>
		</div>
	{/if}

	{#each images as { src, alt, title }}
		<div class="carousel-item relative w-full">
			<enhanced:img {src} {title} {alt} />
			<div class="overlay">
				<button on:click={() => slideCarousel('left')}>❮</button>
				<button on:click={() => slideCarousel('right')}>❯</button>
			</div>
		</div>
	{/each}

	{#if images.length > 0}
		{@const { src, title, alt } = images[0]}
		<div class="carousel-item relative w-full" id="last" bind:this={lastDiv}>
			<enhanced:img {src} {title} {alt} />
			<div class="overlay">
				<button on:click={() => slideCarousel('left')}>❮</button>
				<button on:click={() => slideCarousel('right')}>❯</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	div > button {
		transition: ease 0.2s;
		background-color: black;
		color: white;
		height: 100%;
		width: 20%;

		opacity: 0;
	}

	div:hover > button {
		opacity: 0.3;
	}
</style>
