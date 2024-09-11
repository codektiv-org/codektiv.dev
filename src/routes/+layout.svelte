<script lang="ts">
	import { browser } from '$app/environment';
	import { themeStore } from '$lib/ThemeSwitcher.svelte';

	import '../app.css';

	$: {
		if (browser) {
			document.documentElement.classList.toggle('dark', $themeStore === 'dark');
			document.documentElement.dataset.theme = $themeStore;
		}
	}
</script>

<svelte:head>
	<title>codektiv</title>
</svelte:head>

<slot />
