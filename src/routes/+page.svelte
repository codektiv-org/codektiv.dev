<script lang="ts">
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { Moon, RefreshCcw, Sun } from 'lucide-svelte';
	import { ChartComponent as Chart, NumericDateRepresentation, TraceList } from 'libchartium';
	import { browser } from '$app/environment';

	let count = 0;

	const traces = TraceList.fromColumns({
		x: {
			type: 'f64',
			data: Float64Array.from({ length: 20 }, (_, i) => +new Date(`01-${i + 1}-2024`)),
			unit: NumericDateRepresentation.EpochMilliseconds()
		},
		y: {
			type: 'f64',
			columns: [
				{ id: 'foo', data: Float64Array.from({ length: 20 }, (_, i) => Math.sin(i / Math.PI)) }
			]
		}
	});
</script>

<main class="mx-auto mb-4 mt-20 max-w-[80rem] px-8">
	<style lang="postcss">
		h1 {
			font-family: 'CMU', cursive, serif;
			font-weight: normal;
			font-style: italic;
		}
	</style>
	<h1 class="flex flex-row justify-center mb-5">
		<span class="text-8xl">codektiv</span>
		<span class="inline-block h-full">
			<label class="swap swap-rotate">
				<input
					tabindex="0"
					aria-label="Přepnout světlý / tmavý režim"
					type="checkbox"
					class="theme-controller rounded-full"
					value="light"
				/>
				<Sun class="swap-off fill-current" />
				<Moon class="swap-on fill-current" />
			</label>
		</span>
	</h1>
	<p class="text-justify max-w-[40rem] mx-auto">
		Jsme mladý kolektiv absolventů Matematicko-fyzikální fakulty Univerzity Karlovy s vášní pro
		programování. Jako tým pracujeme již několik let a klademe důraz na kvalitní kód s extrémně
		nízkou tolerancí pro technologický dluh. Umíme používat současné i bleeding-edge technologie,
		ale jejich použití samozřejmě přizpůsobujeme požadavkům daného projektu. Rádi prototypujeme
		řešení specifických problémů tak, aby si klient byl schopen daná řešení vyzkoušet a říct, které
		se mu líbí. Stejně tak rádi poskytneme náš názor na různá řešení na základě našich předchozích
		zkušeností. A&nbsp;hlavně: dá se s námi domluvit 😉.

		<style lang="postcss">
			button.indicator:hover:not(:has(.indicator-item:hover)) {
				--tw-bg-opacity: 1;
				background-color: rgb(17 24 39 / var(--tw-bg-opacity)) /* #111827 */;
			}
		</style>
		<button
			class="
			    indicator block my-5 ml-auto cursor-pointer
				rounded-md bg-gray-800 px-4 py-3 text-center
				text-sm font-semibold text-white transition
				duration-200 ease-in-out
			"
			tabindex="0"
			on:click={() => (count += 1)}
		>
			{#if count > 0 && count !== 69}
				<span
					class="
					    indicator-item rounded-full bg-gray-700
						p-2 rotate-12 transition duration-200
						hover:bg-sky-700 focus:bg-sky-700
						hover:rotate-0 focus:rotate-0
					"
					role="button"
					tabindex="0"
					aria-label="Resetovat číselník"
					on:click|stopPropagation={() => (count = 0)}
					on:keypress|stopPropagation={(e) => ['Enter', ' '].includes(e.key) && (count = 0)}
					transition:scale={{ easing: elasticOut }}
				>
					<RefreshCcw size={20} />
				</span>
			{:else if count === 69}
				<span
					class="indicator-item rounded-md bg-lime-700 px-1"
					transition:scale={{ easing: elasticOut }}>Nice!</span
				>
			{/if}
			Kliknuto {count} krát!
		</button>
	</p>

	<h2 class="text-2xl">Zkušenosti</h2>
	<div class="flex flex-row">
		<div class="w-1/2 card m-2 p-4 bg-neutral">
			<h3 class="card-title">Chartium</h3>
			<p>
				V dlouhodobé spolupráci se společností Soumind vyvíjíme nástroj pro analýzu diskových polí,
				který používá společnost DHL.
			</p>
		</div>
		<div class="w-1/2">
			{#if browser}
				<Chart {traces} hideLegend={true} margins={{ top: { px: 10 } }} />
			{/if}
		</div>
	</div>
</main>
