<script lang="ts">
	import InfiniteCarousel from './InfiniteCarousel.svelte';
	import Image1 from '$lib/fair-1.png?enhanced';
	import Image2 from '$lib/fair-2.png?enhanced';
</script>

<div class="mockup-phone m-0 lg:-order-1 place-self-center lg:place-self-end">
	<div class="camera"></div>
	<div class="display">
		<div class="artboard-demo">
			<InfiniteCarousel
				widthPx={284}
				heightPx={533}
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
		</div>
	</div>
</div>
