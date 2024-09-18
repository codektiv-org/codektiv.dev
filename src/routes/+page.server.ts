import { error, type Actions } from '@sveltejs/kit';
import { Resend } from 'resend';
import { yeet } from '@typek/typek';

const token = process.env.RESEND_TOKEN ?? yeet('Missing RESEND_TOKEN environment variable');

const resend = new Resend(token);
export const actions = {
	contact: async ({ request }) => {
		const data = await request.formData();

		const email = (data.get('email') ?? error(400, 'Failed to specify email')).toString();
		const message = (data.get('message') ?? error(400, 'Failed to specify message')).toString();

		const err = (
			await resend.emails.send({
				subject: 'Message from contact form',
				from: 'info@codektiv.dev',
				to: 'info@codektiv.dev',
				replyTo: email,
				text: `From: ${email}\nMessage: ${message}`
			})
		).error;

		if (err) throw error(500, 'Sending the e-mail failed.');
	}
} satisfies Actions;
