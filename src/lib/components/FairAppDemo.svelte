<script lang="ts">
	import { onMount } from 'svelte';
	import InfiniteCarousel from './InfiniteCarousel.svelte';
	import Image1 from '/static/fair-1.png';
	import Image2 from '/static/fair-2.png';

	let carouselDiv: HTMLDivElement;

	onMount(() => {
		carouselDiv.scrollLeft = 2 * carouselDiv.clientWidth;
	});

	function slideCarousel(direction: 'left' | 'right') {
		const multiplier = direction === 'left' ? -1 : 1;

		const wouldScrollOut =
			carouselDiv.scrollLeft < carouselDiv.clientWidth ||
			carouselDiv.scrollLeft > carouselDiv.clientWidth * (carouselDiv.children.length - 2);

		if (wouldScrollOut) {
			carouselDiv.style.scrollBehavior = 'auto';
			carouselDiv.scrollBy({ left: -2 * carouselDiv.clientWidth * multiplier });
			carouselDiv.style.scrollBehavior = 'smooth';
		}
		carouselDiv.scrollBy({ left: multiplier });
	}
</script>

<!-- <div class="mockup-phone m-0 lg:-order-1 place-self-center lg:place-self-end">
	<div class="camera"></div>
	<div class="display">
		<div class="artboard-demo">
			<div class="carousel w-[284px] h-[533px]" bind:this={carouselDiv}>
				<CarouselImages {slideCarousel} />
				<CarouselImages {slideCarousel} />
			</div>
		</div>
	</div>
</div> -->

<InfiniteCarousel
	width={'284px'}
	height={'533px'}
	images={[
		{
			src: Image1,
			title: 'Snímek obrazovky ukazující hlavní menu aplikace Veletrh iKariéra',
			alt: `Snímek obrazovky ukazující hlavní menu aplikace Veletrh iKariéra.
              Nahoře je ikona pro přepnutí jazyka, pod ní titulek „veletrh... iKariéra na ČVUT“
              a pod titulkem tlačítka: O veletrhu, Seznam firem, Pracovní nabídky, Program dne,
              O IAESTE, Soutěž. Na spodním kraji obrazovky je navigační panel s ikonkami pro
              rychlou navigaci: „domů“, „seznam“, „mapa“ a „kalendář“.
            `
		},
		{
			src: Image2,
			title: 'Snímek obrazovky ukazující seznam aktuálních pracovních nabídek.',
			alt: `
Snímek obrazovky ukazující seznam aktuálních pracovních nabídek. Nahoře je nadpis
„Pracovní nabídky“, pod ním vstupní pole pro vyhledávání a tlačítko s ikonou filtru.
Níže následuje seznam karet s konkrétními pracovními nabídkami – každá obsahuje nadpis
(např. „Vývojář C, C++ a C sharp“ nebo „Junior engineer“), logo firmy a tři až čtyři
tagy se specifiky nabídky. Na spodním kraji obrazovky je navigační panel s ikonkami pro
rychlou navigaci: „domů“, „seznam“, „mapa“ a „kalendář`
		}
	]}
/>
