<script lang="ts">
	export let name: string;
	export let nick: string | undefined = undefined;
	export let pfp: string;
	export let invert = false;
</script>

<card class="card">
	<div class="card-title">
		<div class="avatar">
			<div class="w-24 rounded-xl">
				<img alt={name} src={pfp} style={invert ? 'filter: invert(100%);' : ''} />
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
		<slot />
	</div>
</card>
