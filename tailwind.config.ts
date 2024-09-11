import daisyui from 'daisyui';
import { dark } from 'daisyui/src/theming/themes';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	darkMode: 'class',
	plugins: [daisyui],
	daisyui: {
		themes: [
			'light',
			{
				dark: {
					...dark,
					'base-100': dark['base-300'],
					'base-300': dark['base-100']
				}
			}
		]
	}
} satisfies Config;
