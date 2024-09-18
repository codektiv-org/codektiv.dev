import type { Actions } from '@sveltejs/kit';
import { Resend } from 'resend';

const token = process.env.RESEND_TOKEN;
if (!token) console.warn('No RESEND_TOKEN provided');
const resend = new Resend(token ?? 're_1234567890');
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
