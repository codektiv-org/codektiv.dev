<script lang="ts">
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { RefreshCcw } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import TeamMember from '$lib/components/TeamMember.svelte';

	const BiChart = import('$lib/components/BiChart.svelte').then((d) => d.default);

	let count = 0;
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
			<ThemeSwitcher />
		</span>
	</h1>
	<p class="text-justify max-w-[40rem] mx-auto">
		Jsme mladý kolektiv absolventů Matematicko-fyzikální fakulty Univerzity Karlovy s vášní pro
		programování. Jako tým pracujeme již několik let a&nbsp;klademe důraz na kvalitní kód
		s&nbsp;extrémně nízkou tolerancí pro technologický dluh. Umíme používat současné
		i&nbsp;bleeding-edge technologie, ale jejich použití samozřejmě přizpůsobujeme požadavkům daného
		projektu. Rádi prototypujeme řešení specifických problémů tak, aby si klient byl schopen daná
		řešení vyzkoušet a říct, které se mu líbí. Stejně tak rádi poskytneme náš názor na různá řešení
		na základě našich předchozích zkušeností. A&nbsp;hlavně: dá se s námi domluvit&nbsp;😉.

		<style lang="postcss">
			button.indicator:hover:not(:has(.indicator-item:hover)) {
				--tw-bg-opacity: 1;
				background-color: rgb(17 24 39 / var(--tw-bg-opacity)) /* #111827 */;
			}
		</style>

		<span class="indicator block my-5 ml-auto">
			<button class="btn btn-neutral" tabindex="0" on:click={() => (count += 1)}>
				Kliknuto {count}krát!
			</button>

			{#if count > 0 && count !== 69}
				<span class="indicator-item">
					<button
						class="btn btn-circle btn-sm"
						tabindex="0"
						aria-label="Resetovat číselník"
						on:click={() => (count = 0)}
						on:keypress={(e) => ['Enter', ' '].includes(e.key) && (count = 0)}
						transition:scale={{ easing: elasticOut }}
					>
						<RefreshCcw size={20} />
					</button>
				</span>
			{:else if count === 69}
				<span
					class="indicator-item rounded-md bg-lime-700 px-1"
					transition:scale={{ easing: elasticOut }}
				>
					Nice!
				</span>
			{/if}
		</span>
	</p>
	<h2 class="text-2xl mb-2">Zkušenosti</h2>
	<div class="space-y-8 flex flex-row flex-wrap">
		<card class="exp-card">
			<h3 class="card-title">Chartium</h3>
			<p class="prose">
				V dlouhodobé spolupráci se společností Soumind vyvíjíme nástroj pro analýzu diskových polí,
				který používá společnost DHL. Hlavní feature je přehledný dashboard zobrazující různé
				metriky, které vykreslujeme pomocí vlastní, ultra rychlé a ergonomické grafovací knihovny <a
					href="https://www.github.com/chartium/libchartium">libchartium</a
				>.
			</p>
		</card>
		<div class="w-full lg:w-1/2 relative h-64">
			{#if browser}
				{#await BiChart then Chart}
					<Chart />
				{/await}
			{/if}
		</div>
		<card class="exp-card">
			<h3 class="card-title">Knihovník</h3>
			<p class="prose">
				Aplikace pro knihovní ekonomiku která umí všechno bro je fakt dobrá bro idk bro ještě jsme
				ji neudělali ale je fakt dobrá bro
			</p>
		</card>
		<div class="w-full lg:w-1/2">screenshot knihovníka?</div>
		<card class="exp-card">
			<h3 class="card-title">Koronainfo</h3>
			<p class="prose">
				Na začátku pandemie jsme s kamarády napsali stránku, která sloužila jako informační a
				predikční web pro vývoj pandemie v České republice a na Slovensku
			</p>
		</card>
		<div class="w-full lg:w-1/2">screenshot coronainfa?</div>
	</div>

	<h2 class="text-2xl mb-2 mt-8">Tým</h2>
	<div class="flex flex-wrap justify-around gap-4">
		<TeamMember name="Richard Ivánek" imgsrc="https://avatars.githubusercontent.com/u/7413196?v=4">
			Backenďák & a smort guy
		</TeamMember>
		<TeamMember name="Michal Grňo" imgsrc="https://avatars.githubusercontent.com/u/1671665?v=4">
			Frontenďák & a smort guy
		</TeamMember>
		<TeamMember name="Ondra Janoška" imgsrc="https://avatars.githubusercontent.com/u/78506690?v=4">
			Cat dad & a silly guy
		</TeamMember>
		<!-- <TeamMember
			name="Ivan Richárdek"
			imgsrc="https://avatars.githubusercontent.com/u/7413196?v=4"
			invert
		>
			Fullstack & an evil twin
		</TeamMember> -->
	</div>
</main>

<style>
	.exp-card {
		@apply w-full lg:w-1/2 card p-4 bg-base-200;
	}
</style>
