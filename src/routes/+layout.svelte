<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/components/ThemeSwitcher.svelte';

	import '../app.css';

	onMount(() => themeStore.subscribe((value) => (document.documentElement.dataset.theme = value)));
</script>

<svelte:head>
	<title>codektiv</title>
</svelte:head>

<slot />
