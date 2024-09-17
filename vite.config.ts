import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
	build: {
		target: 'es2022'
	},
	plugins: [enhancedImages(), sveltekit(), wasm()]
});
