<script lang="ts">
	import { browser } from '$app/environment';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import TeamMember from '$lib/components/TeamMember.svelte';
	import Counter from '$lib/components/Counter.svelte';

	const ChartiumDemoPromise = import('$lib/components/ChartiumDemo.svelte').then((d) => d.default);
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

		<Counter />
	</p>
	<h2 class="text-2xl mb-2">Zkušenosti</h2>
	<div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
		<card class="card">
			<h3 class="card-title">Chartium</h3>
			<p class="prose">
				V dlouhodobé spolupráci se společností Soumind vyvíjíme nástroj pro analýzu diskových polí,
				který používá společnost DHL. Hlavní feature je přehledný dashboard zobrazující různé
				metriky, které vykreslujeme pomocí vlastní, ultra rychlé a ergonomické grafovací knihovny <a
					href="https://www.github.com/chartium/libchartium">libchartium</a
				>.
			</p>
		</card>
		<div class="relative h-96">
			{#if browser}
				{#await ChartiumDemoPromise then ChartiumDemo}
					<ChartiumDemo />
				{/await}
			{/if}
		</div>
		<div class="grid grid-cols-subgrid gap-[inherit] lg:col-span-2 items-start">
			<card class="card">
				<h3 class="card-title">Aplikace Veletrh iKariéra</h3>
				<p class="prose">
					V letech 2022 a 2023 jsme pro studentskou organizaci IAESTE ČVUT Praha tvořili a
					vylepšovali mobilní aplikaci, která sloužila jako průvodce po jimi pořádaném <a
						href="https://veletrhikariera.cz/">veletrhu práce</a
					>.
				</p>
			</card>
			<div class="mockup-phone m-0 lg:-order-1 place-self-center lg:place-self-end">
				<div class="camera"></div>
				<div class="display">
					<div class="artboard-demo">
						<div class="carousel w-[284px]">
							<div class="carousel-item">
								<img
									src="/fair-1.png"
									title="Snímek obrazovky ukazující hlavní menu aplikace Veletrh iKariéra"
									alt="
										Snímek obrazovky ukazující hlavní menu aplikace Veletrh iKariéra.
										Nahoře je ikona pro přepnutí jazyka, pod ní titulek „veletrh... iKariéra na ČVUT“
										a pod titulkem tlačítka: O veletrhu, Seznam firem, Pracovní nabídky, Program dne,
										O IAESTE, Soutěž. Na spodním kraji obrazovky je navigační panel s ikonkami pro
										rychlou navigaci: „domů“, „seznam“, „mapa“ a „kalendář“.
									"
								/>
							</div>
							<div class="carousel-item">
								<img
									src="/fair-2.png"
									title="Snímek obrazovky ukazující seznam aktuálních pracovních nabídek."
									alt="
										Snímek obrazovky ukazující seznam aktuálních pracovních nabídek.
									"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<card class="card">
			<h3 class="card-title">Knihovník</h3>
			<p class="prose">
				Aplikace pro knihovní ekonomiku která umí všechno bro je fakt dobrá bro idk bro ještě jsme
				ji neudělali ale je fakt dobrá bro
			</p>
		</card>
		<div>screenshot knihovníka?</div>
		<card class="card">
			<h3 class="card-title">Koronainfo.cz</h3>
			<p class="prose">
				Na začátku pandemie jsme s kamarády napsali stránku, která sloužila jako informační a
				predikční web pro vývoj pandemie v České republice a na Slovensku
			</p>
		</card>
		<div>screenshot coronainfa?</div>
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
	</div>
</main>

<style lang="postcss">
	.card {
		@apply lg:mt-8;
	}
</style>
