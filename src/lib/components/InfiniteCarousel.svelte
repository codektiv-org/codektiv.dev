<script lang="ts">
	import { onMount } from 'svelte';
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';

	export let images: { src: EnhancedImgAttributes['src']; alt: string; title: string }[];

	let intervalId: number;
	function restartInterval() {
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			slideCarousel('right');
		}, 5 * 1000);
	}

	let carouselDiv: HTMLDivElement;
	onMount(() => {
		carouselDiv.scrollTo({ behavior: 'instant', left: carouselDiv.clientWidth });

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;

					carouselDiv.scrollTo({
						behavior: 'instant',
						left:
							entry.target === entry.target.parentElement?.firstChild
								? carouselDiv.clientWidth * (carouselDiv.children.length - 2)
								: carouselDiv.clientWidth
					});
				});
			},
			{
				root: carouselDiv,
				threshold: 1.0
			}
		);

		carouselDiv.querySelectorAll('.observed').forEach((d) => observer.observe(d));

		restartInterval();

		return () => {
			observer.disconnect();
			clearInterval(intervalId);
		};
	});

	function slideCarousel(direction: 'left' | 'right') {
		const multiplier = direction === 'left' ? -1 : 1;
		carouselDiv.scrollBy({ left: multiplier });
	}

	function buttonSlideCarousel(direction: 'left' | 'right') {
		restartInterval();
		slideCarousel(direction);
	}

	$: items = images.length > 0 ? [images.at(-1)!, ...images, images.at(0)!] : images;
</script>

<div class="carousel" bind:this={carouselDiv}>
	{#each items as { src, alt, title }, i}
		{@const observed = i === 0 || i === items.length - 1}
		<div class="carousel-item w-full" class:observed>
			<enhanced:img {src} {title} {alt} />
		</div>
	{/each}
</div>
<div class="overlay">
	<button on:click={() => buttonSlideCarousel('left')}>❮</button>
	<button on:click={() => buttonSlideCarousel('right')}>❯</button>
</div>

<style>
	.overlay {
		position: absolute;
		inset: 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button {
		transition: ease 0.2s;
		background-color: black;
		color: white;
		height: 100%;
		width: 20%;

		opacity: 0;
	}

	.overlay:hover > button {
		opacity: 0.3;
	}
</style>
