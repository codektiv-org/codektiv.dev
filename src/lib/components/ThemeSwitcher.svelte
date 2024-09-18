<script lang="ts" module>
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

	let label = $derived($themeStore === 'dark' ? 'světlý režim' : 'tmavý režim');
</script>

<label class="swap swap-rotate" title="Přepnout na {label}">
	<input
		tabindex="0"
		aria-label="Přepnout na {label}"
		type="checkbox"
		class="theme-controller rounded-full"
		checked={$themeStore === 'dark'}
		onchange={() => themeStore.set($themeStore === 'dark' ? 'light' : 'dark')}
	/>
	<Sun class="swap-off fill-current" />
	<Moon class="swap-on fill-current" />
</label>
