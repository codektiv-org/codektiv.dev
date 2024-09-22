<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { onMount } from 'svelte';

	const restText = 'odektiv'.split('');
	let text = 'c';
	let title: HTMLSpanElement;

	const initialWait = 1.2;
	const letterDelay = 0.07;
	onMount(() => {
		console.log('mounted');
		setTimeout(() => {
			let interval: NodeJS.Timeout;
			interval = setInterval(() => {
				text += restText.shift();
				if (restText.length === 0) {
					title.classList.remove('typed');
					clearInterval(interval);
				}
			}, letterDelay * 1000);
		}, initialWait * 1000);
	});
</script>

<h1 class="flex flex-row justify-center mb-5">
	<span class="text-7xl md:text-8xl typed" bind:this={title}>{text}</span>

	<span class="inline-block h-full">
		<ThemeSwitcher />
	</span>
</h1>

<style>
	h1 {
		font-family: 'CMU', cursive, serif;
		font-weight: normal;
		font-style: italic;
	}

	.typed {
		border-right: 2px solid currentColor;
		padding-right: 4px;
		animation: blink-caret 1s step-end infinite;
	}

	@keyframes blink-caret {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: currentColor;
		}
	}
</style>
