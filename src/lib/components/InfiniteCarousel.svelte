<script lang="ts">
	import { onMount } from 'svelte';
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let images: { src: EnhancedImgAttributes['src']; alt: string; title: string }[];
	export let autoscrollInterval = 5_000;

	let carouselDiv: HTMLDivElement;
	let observer: IntersectionObserver;

	/** Scroll to the image with the provided (zero-based) index. */
	function slideTo(index: number, behavior: ScrollOptions['behavior'] = 'smooth') {
		// There is a fake “−1th” image which is the same as the last image
		// That's why we have to add one to the index
		carouselDiv.scrollTo({ left: (index + 1) * carouselDiv.clientWidth, behavior });
		restartInterval();
	}

	/** Scroll by `indexDelta` images. To move forward or backward by one, use `+1` or `-1` respectively.  */
	function slideBy(indexDelta: number, behavior: ScrollOptions['behavior'] = 'smooth') {
		carouselDiv.scrollBy({ left: indexDelta * carouselDiv.clientWidth, behavior });
		restartInterval();
	}

	let intervalId: number;
	function restartInterval() {
		clearInterval(intervalId);
		intervalId = setInterval(() => slideBy(1), autoscrollInterval);
	}

	onMount(() => {
		slideTo(0, 'instant'); // instantly snap to the first image

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting || items.length <= 1) return;

					const nextIdx = entry.target.classList.contains('first') ? items.length - 2 : 1;

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
		<div class="carousel-item w-full" class:observed class:first={i === 0}>
			<enhanced:img {src} {title} {alt} />
		</div>
	{/each}
</div>
<div class="absolute inset-0 flex justify-between items-stretch group">
	<button
		class="opacity-0 group-hover:opacity-30 transition w-1/5 text-white bg-black"
		on:click={() => slideBy(-1)}><ChevronLeft /></button
	>
	<button
		class="opacity-0 group-hover:opacity-30 transition w-1/5 text-white bg-black"
		on:click={() => slideBy(+1)}><ChevronRight /></button
	>
</div>
