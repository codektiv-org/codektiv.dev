<script lang="ts">
	import { enhance } from '$app/forms';
	import { Mails } from 'lucide-svelte';
	const LottiePromise = import('@lottiefiles/dotlottie-svelte').then((_) => _.DotLottieSvelte);

	let sent = false;
	let modal: HTMLDialogElement;
	let lottie: import('@lottiefiles/dotlottie-svelte').DotLottie;

	function playLottie() {
		if (lottie) {
			sent = true;
			lottie?.play();
		} else {
			modal.close();
		}
	}

	let emailInput: HTMLInputElement;

	const onError = (msg: string) => {
		alert(msg);
		emailInput.value = '';
	};

	let showLoading = false;
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
	<div class="modal-box relative">
		{#if showLoading}
			<div class="w-full h-full absolute flex items-center justify-center inset-0 backdrop-blur-sm">
				<span class="loading loading-dots"></span>
			</div>
		{/if}
		<div
			class="place-self-stretch !opacity-0 pointer-events-none absolute inset-0"
			class:!opacity-100={sent}
		>
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
		<div class:!opacity-0={sent} class:pointer-events-none={sent} class="place-self-stretch">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			</form>

			<h2 class="text-lg font-bold">Kontaktujte nás!</h2>
			<form
				method="post"
				use:enhance={() => {
					showLoading = true;
					return async ({ result, formElement }) => {
						showLoading = false;
						if (result.type === 'error') return onError(result.error.message);
						formElement.reset();
						playLottie();
					};
				}}
				action="?/contact"
			>
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Váš email</span>
					</div>
					<input
						bind:this={emailInput}
						type="email"
						placeholder="example@mail.com"
						name="email"
						required
						class="input input-bordered w-full prose"
					/>
				</label>
				<label class="form-control">
					<div class="label">
						<span class="label-text">Vaše zpráva</span>
					</div>
					<textarea
						name="message"
						class="textarea textarea-bordered h-24 prose"
						placeholder="..."
						required
					></textarea>
				</label>
				<div class="flex w-full justify-end">
					<button type="submit" class="btn mt-4">Odeslat</button>
				</div>
			</form>
		</div>
	</div>
	<form class="modal-backdrop" method="dialog">
		<button class="modal-backdrop cursor-default" aria-label="Zavřít modal"></button>
	</form>
</dialog>
