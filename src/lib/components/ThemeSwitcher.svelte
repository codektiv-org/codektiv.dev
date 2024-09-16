<script lang="ts" context="module">
	import { browser } from '$app/environment';

	export const themeStore = writable<'light' | 'dark'>(
		(browser ? (localStorage.getItem('theme') ?? 'dark') : 'dark') as 'light' | 'dark'
	);

	if (browser) {
		themeStore.subscribe((value) => {
			localStorage.setItem('theme', value);
		});
	}
</script>

<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { writable } from 'svelte/store';
</script>

<label class="swap swap-rotate" title="Přepnout světlý / tmavý režim">
	<input
		tabindex="0"
		aria-label="Přepnout světlý / tmavý režim"
		type="checkbox"
		class="theme-controller rounded-full"
		checked={$themeStore === 'dark'}
		on:change={() => themeStore.set($themeStore === 'dark' ? 'light' : 'dark')}
	/>
	<Sun class="swap-off fill-current" />
	<Moon class="swap-on fill-current" />
</label>
