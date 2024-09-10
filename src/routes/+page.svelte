<script lang="ts">
	import { scale } from 'svelte/transition';
	import { elasticInOut, elasticOut } from 'svelte/easing';
	import { RefreshCcw } from 'lucide-svelte';

	let count = $state(0);
</script>

<main class="mx-auto mb-4 mt-20 max-w-[50rem] px-8">
	<h1 class="text-8xl text-center mb-5">codektiv</h1>
	<p class="text-justify">
		Jsme mladý kolektiv absolventů Matematicko-fyzikální fakulty Univerzity Karlovy s vášní pro
		programování. Jako tým pracujeme již několik let a klademe důraz na kvalitní kód s extrémně
		nízkou tolerancí pro technologický dluh. Umíme používat současné i bleeding-edge technologie,
		ale jejich použití samozřejmě přizpůsobujeme požadavkům daného projektu. Rádi prototypujeme
		řešení specifických problémů tak, aby si klient byl schopen daná řešení vyzkoušet a říct, které
		se mu líbí. Stejně tak rádi poskytneme náš názor na různá řešení na základě našich předchozích
		zkušeností. A&nbsp;hlavně: dá se s námi domluvit 😉.

		<button
			class="indicator block m-5 ml-auto cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 ease-in-out"
			tabindex="0"
			onclick={() => (count += 1)}
		>
			{#if count > 0}
				{@const reset = (e: Event) => {
					count = 0;
					e.stopPropagation();
				}}
				<span
					class="indicator-item rounded-full bg-gray-700 p-2 rotate-12 transition duration-200 hover:bg-sky-700 hover:rotate-0"
					role="button"
					tabindex="0"
					onclick={reset}
					onkeypress={(e) => ['Enter', ' '].includes(e.key) && reset(e)}
					transition:scale={{
						easing: elasticOut
					}}
				>
					<RefreshCcw size={20} />
				</span>
			{/if}
			Kliknuto {count} krát!
		</button>
	</p>

	<h2 class="text-2xl">Zkušenosti</h2>
</main>

<style lang="postcss">
	h1 {
		font-family: 'CMU', cursive, serif;
		font-weight: normal;
		font-style: italic;
	}

	button.indicator:hover:not(:has(.indicator-item:hover)) {
		--tw-bg-opacity: 1;
		background-color: rgb(17 24 39 / var(--tw-bg-opacity)) /* #111827 */;
	}
</style>
