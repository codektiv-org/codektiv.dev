import { type Actions, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { yeet } from '@typek/typek';

const token = env.RESEND_TOKEN ?? yeet('Missing RESEND_TOKEN environment variable');

const resend = new Resend(token);
export const actions = {
	contact: async ({ request }) => {
		const data = await request.formData();

		if (data.get('email') === null) return error(400, 'Nebyl vyplněn email');
		if (data.get('message') === null) return error(400, 'Nebyla vyplněna zpráva');

		const email = data.get('email')!.toString();
		const message = data.get('message')!.toString();
		const err = (
			await resend.emails.send({
				subject: 'Message from contact form',
				from: 'info@codektiv.dev',
				to: 'info@codektiv.dev',
				replyTo: email,
				text: `From: ${email}\nMessage: ${message}`
			})
		).error;
		if (err)
			return error(
				500,
				'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu nebo nám napište přímo na info@codektiv.dev.'
			);
		return { success: true };
	}
} satisfies Actions;
