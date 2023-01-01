<script>
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import TelegramLogo from 'phosphor-svelte/lib/TelegramLogo';
	import ClockCounterClockwise from 'phosphor-svelte/lib/ClockCounterClockwise';
</script>

<footer class="footer footer-center p-10 bg-base-100 border-t-2">
	<div>
		<span class="text-primary"
			><ClockCounterClockwise size={48} weight="bold" color="currentColor" /></span
		>
		<p class="font-bold">مجدول رسائل تيليجرام</p>
		<p>تطوير: يوسف شعبان الصغير yshalsager</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a href="https://github.com/yshalsager/" aria-label="Github Profile"
				><GithubLogo size={24} weight="bold" /></a
			>
			<a href="https://t.me/yshalsager" aria-label="Telegram Account"
				><TelegramLogo size={24} weight="bold" /></a
			>
		</div>
	</div>
</footer>
