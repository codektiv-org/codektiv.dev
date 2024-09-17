<script lang="ts" module>
	const btns = [
		['left', '❮'],
		['right', '❯']
	] as const;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';

	export let images: { src: EnhancedImgAttributes['src']; alt: string; title: string }[];
	export let autoscrollInterval = 5_000;

	let intervalId: number;
	function restartInterval() {
		clearInterval(intervalId);
		intervalId = setInterval(() => slideCarousel('right'), autoscrollInterval);
	}

	let observer: IntersectionObserver;
	let carouselDiv: HTMLDivElement;
	onMount(() => {
		carouselDiv.scrollTo({ behavior: 'instant', left: carouselDiv.clientWidth });

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting || items.length <= 1) return;

					const nextIdx =
						entry.target === entry.target.parentElement?.firstChild ? items.length - 2 : 1;

					carouselDiv.scrollTo({ behavior: 'instant', left: nextIdx * carouselDiv.clientWidth });
				});
			},
			{
				root: carouselDiv,
				threshold: 0.999
			}
		);

		resetObserver();
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

	function resetObserver() {
		if (!observer) return;

		observer.disconnect();
		carouselDiv.querySelectorAll('.observed').forEach((d) => observer.observe(d));
	}

	$: items = images.length > 1 ? [images.at(-1)!, ...images, images.at(0)!] : images;
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$: items, resetObserver();
</script>

<div class="carousel" bind:this={carouselDiv}>
	{#each items as { src, alt, title }, i}
		{@const observed = i === 0 || i === items.length - 1}
		<div class="carousel-item w-full" class:observed>
			<enhanced:img {src} {title} {alt} />
		</div>
	{/each}
</div>
<div class="absolute inset-0 flex justify-between items-stretch group">
	{#each btns as [direction, icon]}
		<button
			class="opacity-0 group-hover:opacity-30 transition w-1/5 text-white bg-black"
			on:click={() => buttonSlideCarousel(direction)}>{icon}</button
		>
	{/each}
</div>
