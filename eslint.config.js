import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettierConfig from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.svelte'],
		rules: {
				'svelte/no-at-html-tags': 'off',
		},
	},
	{
		files: ['**/*.js', '**/*.cjs', '**/*.svelte'],
		ignores: [
			'.DS_Store',
			'node_modules/**',
			'build/**',
			'.svelte-kit/**',
			'.env',
			'.env.*',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		],
		languageOptions: {
			sourceType: 'module',
			ecmaVersion: 2020,
			globals: {
				// Browser globals
				window: true,
				document: true,
				console: true,
				setTimeout: true,
				prompt: true,
				localStorage: true,
				sessionStorage: true,
				// Node.js globals
				process: true,
				require: true,
				__dirname: true,
				module: true
			}
		}
	},
	prettierConfig
];