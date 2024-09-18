<script lang="ts">
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';

	const {
		name,
		nick = undefined,
		pfp,
		children
	} = $props<{
		name: string;
		nick?: string;
		pfp: EnhancedImgAttributes['src'];
		children?: Snippet;
	}>();
</script>

<card class="card">
	<div class="card-title">
		<div class="avatar">
			<div class="w-24 rounded-xl">
				<enhanced:img src={pfp} alt={name} />
			</div>
		</div>
		<div class="pl-4">
			<h3>{name}</h3>
			{#if nick}
				<p class="font-normal text-base">aka „{nick}“</p>
			{/if}
		</div>
	</div>
	<div class="card-body prose">
		{@render children?.()}
	</div>
</card>
