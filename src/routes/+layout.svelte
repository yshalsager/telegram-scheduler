<script>
	import '../styles/app.postcss';
	import Navbar from '../components/Navbar.svelte';

	// Set theme on page load, based on
	// https://github.com/CaptainCodeman/svelte-theme-select/blob/948df6a0020eb452ea04f5df2dac6fe991534dae/src/lib/Theme.svelte
	const setTheme = () =>
		(document.documentElement.dataset.theme =
			localStorage.theme === 'telegram' ? 'telegram' : 'telegramDark');
	// .substring(6) to remove '() => ' part
	const setThemeScript = `<script>${setTheme.toString().substring(6)}</scrip` + 't>';
</script>

<!-- this sets theme class based on localstorage settings (in head to avoid FOUC) -->
<svelte:head>{@html setThemeScript}</svelte:head>

<Navbar />

<slot />
