<script lang="ts">
	export let name: string;
	export let imgsrc: string;
	export let invert = false;
</script>

<card class="card p-4 w-full lg:max-w-[calc(33%-1rem)] bg-base-200">
	<div class="card-title">
		<div class="avatar">
			<div class="w-24 rounded-xl">
				<img alt={name} src={imgsrc} style={invert ? 'filter: invert(100%);' : ''} />
			</div>
		</div>
		{name}
	</div>
	<div class="card-body prose">
		<slot />
	</div>
</card>
