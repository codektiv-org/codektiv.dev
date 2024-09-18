import type { Actions } from '@sveltejs/kit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_TOKEN!);
export const actions = {
	contact: async ({ request }) => {
		const data = await request.formData();
		console.log(data.get('email'), data.get('message'));
		const error = (
			await resend.emails.send({
				subject: 'Message from contact form',
				from: 'info@codektiv.dev',
				to: 'info@codektiv.dev',
				text: `From: ${data.get('email')!.toString()}<br>Message: ${data.get('message')!.toString()}`
			})
		).error;

		if (error) {
			return { error: error };
		}
		return { success: true };
	}
} satisfies Actions;
