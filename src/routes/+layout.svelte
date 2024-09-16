<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/components/ThemeSwitcher.svelte';

	import '../app.css';

	onMount(() => themeStore.subscribe((value) => (document.documentElement.dataset.theme = value)));
</script>

<svelte:head>
	<title>codektiv</title>
	<meta
		name="description"
		content="Jsme mladý kolektiv absolventů MFF UK s vášní pro programování. Rádi s vámi probereme možnou spolupráci. Napište nám. ;)"
	/>
</svelte:head>

<slot />
