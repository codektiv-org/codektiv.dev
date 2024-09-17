<script lang="ts">
	export let slideCarousel: (direction: 'left' | 'right') => void;
</script>

<div class="carousel-item relative w-full">
	<enhanced:img
		src="/static/fair-2.png"
		title="Snímek obrazovky ukazující seznam aktuálních pracovních nabídek."
		alt="
Snímek obrazovky ukazující seznam aktuálních pracovních nabídek. Nahoře je nadpis
„Pracovní nabídky“, pod ním vstupní pole pro vyhledávání a tlačítko s ikonou filtru.
Níže následuje seznam karet s konkrétními pracovními nabídkami – každá obsahuje nadpis
(např. „Vývojář C, C++ a C sharp“ nebo „Junior engineer“), logo firmy a tři až čtyři
tagy se specifiky nabídky. Na spodním kraji obrazovky je navigační panel s ikonkami pro
rychlou navigaci: „domů“, „seznam“, „mapa“ a „kalendář“.
            "
	/>
	<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
		<button on:click={() => slideCarousel('left')} class="btn btn-circle">❮</button>
		<button on:click={() => slideCarousel('right')} class="btn btn-circle">❯</button>
	</div>
</div>
<div class="carousel-item relative w-full">
	<enhanced:img
		src="/static/fair-1.png"
		title="Snímek obrazovky ukazující hlavní menu aplikace Veletrh iKariéra"
		alt="Snímek obrazovky ukazující hlavní menu aplikace Veletrh iKariéra.
              Nahoře je ikona pro přepnutí jazyka, pod ní titulek „veletrh... iKariéra na ČVUT“
              a pod titulkem tlačítka: O veletrhu, Seznam firem, Pracovní nabídky, Program dne,
              O IAESTE, Soutěž. Na spodním kraji obrazovky je navigační panel s ikonkami pro
              rychlou navigaci: „domů“, „seznam“, „mapa“ a „kalendář“.
            "
	/>
	<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
		<button on:click={() => slideCarousel('left')} class="btn btn-circle">❮</button>
		<button on:click={() => slideCarousel('right')} class="btn btn-circle">❯</button>
	</div>
</div>
