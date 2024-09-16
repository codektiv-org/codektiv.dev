<script lang="ts">
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { RefreshCcw } from 'lucide-svelte';

	let count = 0;
</script>

<span class="indicator block my-5 ml-auto">
	<button class="btn btn-neutral" tabindex="0" on:click={() => (count += 1)}>
		Kliknuto {count}krát!
	</button>

	{#if count > 0 && count !== 69}
		<span class="indicator-item">
			<button
				class="
          btn btn-circle btn-sm
          transition duration-200
          hover:bg-sky-700 focus:bg-sky-700
          hover:-rotate-12 focus:-rotate-12
        "
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
