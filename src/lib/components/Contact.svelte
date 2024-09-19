<script lang="ts">
	import { enhance } from '$app/forms';
	import { Mails } from 'lucide-svelte';
	const LottiePromise = import('@lottiefiles/dotlottie-svelte').then((_) => _.DotLottieSvelte);

	let sent = false;
	let modal: HTMLDialogElement;
	let lottie: import('@lottiefiles/dotlottie-svelte').DotLottie;
</script>

<!-- 
	<a href="mailto:info@codektiv.dev" class="btn btn-neutral" tabindex="0"
		><Mails />Kontaktujte nás!</a
	>
</span> -->
<span class="indicator block my-5 ml-auto">
	<button class="btn btn-primary" tabindex="0" on:click={() => modal.showModal()}
		><Mails />Kontaktujte nás!</button
	>
</span>
<dialog bind:this={modal} class="modal">
	<div class="modal-box stack place-items-stretch">
		<div class="!opacity-0 pointer-events-none" class:!opacity-100={sent}>
			{#await LottiePromise then Lottie}
				<Lottie
					src="/sent.lottie"
					dotLottieRefCallback={(ref) => {
						lottie = ref;
						lottie.addEventListener('complete', () => {
							setTimeout(() => {
								sent = false;
								modal.close();
							}, 500);
						});
					}}
				/>
			{/await}
		</div>
		<div class:!opacity-0={sent}>
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			</form>

			<h3 class="text-lg font-bold">Kontaktujte nás!</h3>
			<form
				method="post"
				use:enhance={() =>
					async ({ result, formElement }) => {
						formElement.reset();
						if (lottie) {
							sent = true;
							lottie?.play();
						} else {
							modal.close();
						}
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
				<button type="submit" class="btn mt-4 ml-auto">Odeslat</button>
			</form>
		</div>
	</div>
	<form class="modal-backdrop" method="dialog">
		<button class="modal-backdrop cursor-default"></button>
	</form>
</dialog>
