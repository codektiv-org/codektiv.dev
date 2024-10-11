<script lang="ts">
	import TeamMember from '$lib/components/TeamMember.svelte';
	import FairAppDemo from '$lib/components/FairAppDemo.svelte';

	import risaiPfp from '../pfps/risai.jpeg?w=128&enhanced';
	import cshaPfp from '../pfps/csha.jpeg?w=128&enhanced';
	import quackenPfp from '../pfps/quacken.jpeg?w=128&enhanced';
	import Contact from '$lib/components/Contact.svelte';
	import Title from '$lib/components/Title.svelte';

	const ChartiumDemoPromise = import('$lib/components/ChartiumDemo.svelte').then((d) => d.default);
</script>

<main class="mx-auto mb-4 mt-20 max-w-[80rem] px-8">
	<Title />
	<div class="max-w-[40rem] mx-auto">
		<p class="text-justify">
			Jsme mladý kolektiv absolventů Matematicko-fyzikální fakulty Univerzity Karlovy s vášní pro
			programování. Jako tým pracujeme již několik let a&nbsp;klademe důraz na kvalitní kód
			s&nbsp;extrémně nízkou tolerancí pro technologický dluh. Umíme používat současné
			i&nbsp;bleeding-edge technologie, ale jejich použití samozřejmě přizpůsobujeme požadavkům
			daného projektu. Rádi prototypujeme řešení specifických problémů tak, aby si klient byl
			schopen daná řešení vyzkoušet a říct, které se mu líbí. Stejně tak rádi poskytneme náš názor
			na různá řešení na základě našich předchozích zkušeností. A&nbsp;hlavně: dá se s námi
			domluvit&nbsp;😉.

			<!-- <Counter /> -->
		</p>
		<Contact />
	</div>
	<h2 class="h2">Zkušenosti</h2>
	<div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
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
			{#await ChartiumDemoPromise}
				<div class="skeleton absolute h-3/4 w-3/4 left-0 top-0 blur-[1px] shadow-sm"></div>

				<div
					class="skeleton absolute h-3/4 w-3/4 right-0 bottom-0 bg-base-200 rounded-lg pr-8 shadow-sm"
				></div>
			{:then ChartiumDemo}
				<ChartiumDemo />
			{/await}
		</div>
		<div class="grid grid-cols-subgrid gap-[inherit] lg:col-span-2 items-start">
			<card class="card">
				<h3 class="card-title">Aplikace Veletrh iKariéra</h3>
				<p class="prose">
					V roce 2022 si nás studentská organizace IAESTE ČVUT Praha vybrala pro vývoj mobilní
					aplikace, která sloužila jako průvodce jejich <a href="https://veletrhikariera.cz/"
						>veletrhem práce</a
					>. Díky spokojenosti s naší prací jsme byli v roce 2023 opět osloveni, abychom aplikaci
					dále vylepšili.
				</p>
			</card>
			<FairAppDemo />
		</div>
		<div>
			<card class="card">
				<h3 class="card-title">Koronainfo.cz</h3>
				<p class="prose">
					Na začátku pandemie jsme s kamarády napsali stránku, která sloužila jako informační a
					predikční web pro vývoj pandemie v České republice a na Slovensku.
				</p>
			</card>
			<card class="card">
				<p class="prose">
					Podoba webu z června 2021 je k dispozici ve <a
						href="https://web.archive.org/web/20210616023919/https://koronainfo.cz/"
						>webovém archivu</a
					>
					a zdrojový kód na <a href="https://gitlab.com/RisaI/koronainfo">GitLabu</a>.
				</p>
			</card>
		</div>
		<div class="mockup-window bg-base-300 border border-gray-600">
			<enhanced:img
				src="/static/koronainfo.png?w=900;600"
				title="Snímek obrazovky z webu koronainfo.cz z června 2021"
				alt="
				Snímek obrazovky z webu koronainfo.cz z června 2021. Na obrazovce je vidět dashboard
				s několika grafy, tabulkami a mapou. Graf vlevo nahoře ukazuje počty testovaných,
				pozitivních, aktuálně nemocných, mrtvých a uzdravených v Česku. Graf vpravo ukazuje
				tytéž metriky pro celý svět. Uprostřed je interaktivní mapa střední Evropy, na každém
				státu je umístěný bod s aktuálními informacemi o daném státě. Dole na obrazovce je
				tabulka „Denní stav v Česku“ s každodenními aktualizacemi, a graf „Tendence v Česku“,
				který ukazuje procento pozitivních denních testů za poslední měsíc.
			"
			/>
		</div>
		<!-- <card class="card">
			<h3 class="card-title">Knihovník</h3>
			<p class="prose">
				Aplikace pro knihovní ekonomiku která umí všechno bro je fakt dobrá bro idk bro ještě jsme
				ji neudělali ale je fakt dobrá bro
			</p>
		</card>
		<div>screenshot knihovníka?</div> -->
	</div>

	<h2 class="h2">Tým</h2>
	<div class="grid lg:grid-cols-3 gap-6">
		<TeamMember name="Richard Ivánek" nick="risai" pfp={risaiPfp}>
			Fullstack developer, <br />
			milovník zajímavých problémů, <br />
			řešení, technologií a vědy, <br />
			<small class="opacity-90">a Pentel EnerGel 0.7mm Metal Tip modré.</small>
		</TeamMember>
		<TeamMember name="Michal Grňo" nick="csha" pfp={cshaPfp}>
			UI & UX designer, <br />
			fanoušek permakultury, <br />
			humanitních věd, <br />
			a anarchistických zínů.
		</TeamMember>
		<TeamMember name="Ondra Janoška" nick="quacken" pfp={quackenPfp}>
			Frontend developer, <br />
			srdcem astrofyzik, <br />
			táta jednookého kocoura <br />
			a milovník kafe.
		</TeamMember>
	</div>
</main>

<style lang="postcss">
	.card {
		@apply lg:mt-8;
	}
</style>
