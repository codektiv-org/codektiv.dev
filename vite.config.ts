import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
	build: {
		target: 'es2022'
	},
	plugins: [sveltekit(), wasm()]
});
