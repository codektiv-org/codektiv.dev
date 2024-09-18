<script lang="ts">
	import { enhance } from '$app/forms';
	import { Mails } from 'lucide-svelte';
	let modal: HTMLDialogElement;
</script>

<!-- 
	<a href="mailto:info@codektiv.dev" class="btn btn-neutral" tabindex="0"
		><Mails />Kontaktujte nás!</a
	>
</span> -->
<span class="indicator block my-5 ml-auto">
	<button class="btn btn-neutral" tabindex="0" on:click={() => modal.showModal()}
		><Mails />Kontaktujte nás!</button
	>
</span>
<dialog bind:this={modal} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>

		<h3 class="text-lg font-bold">Kontaktujte nás!</h3>
		<form
			method="post"
			use:enhance={() =>
				async ({ result, formElement }) => {
					console.log(result);
					formElement.reset();
					modal.close(); // show some nice animation
				}}
			action="?/contact"
		>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Váš email</span>
				</div>
				<input
					type="email"
					placeholder="example@mail.com"
					name="email"
					class="input input-bordered w-full prose"
				/>
			</label>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Vaše zpráva</span>
				</div>
				<textarea name="message" class="textarea textarea-bordered h-24 prose" placeholder="..."
				></textarea>
			</label>
			<button type="submit" class="btn mt-4">Odeslat</button>
		</form>
	</div>
	<form class="modal-backdrop" method="dialog">
		<button class="modal-backdrop"></button>
	</form>
</dialog>
