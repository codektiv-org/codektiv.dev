<script lang="ts">
	let count = $state(0);
</script>

<main class="mx-auto mb-4 mt-20 max-w-[50rem] px-5">
	<h1 class="text-8xl text-center mb-5">codektiv</h1>
	<p class="text-justify">
		Jsme mladý kolektiv absolventů Matematicko-fyzikální fakulty Univerzity Karlovy s vášní pro
		programování. Jako tým pracujeme již několik let a klademe důraz na kvalitní kód s extrémně
		nízkou tolerancí pro technologický dluh. Umíme používat současné i bleeding-edge technologie,
		ale jejich použití samozřejmě přizpůsobujeme požadavkům daného projektu. Rádi prototypujeme
		řešení specifických problémů tak, aby si klient byl schopen daná řešení vyzkoušet a říct, které
		se mu líbí. Stejně tak rádi poskytneme náš názor na různá řešení na základě našich předchozích
		zkušeností. A hlavně: dá se s námi domluvit 😉.

		<button
			class="block m-5 cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
			onclick={() => (count += 1)}
		>
			Clicked {count} times
		</button>
	</p>
</main>

<style lang="postcss">
	h1 {
		font-family: 'CMU', cursive, serif;
		font-weight: normal;
		font-style: italic;
	}
</style>
