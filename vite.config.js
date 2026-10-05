import adapter from '@sveltejs/adapter-auto'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import {sveltekit} from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */ const config = {
    plugins: [sveltekit({preprocess: vitePreprocess(), adapter: adapter()})],
}

export default config
