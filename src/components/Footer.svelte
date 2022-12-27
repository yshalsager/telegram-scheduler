<script>
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import TelegramLogo from 'phosphor-svelte/lib/TelegramLogo';
	import ClockCounterClockwise from 'phosphor-svelte/lib/ClockCounterClockwise';
</script>

<footer class="footer footer-center p-10 bg-base">
	<div>
		<ClockCounterClockwise size={50} weight="bold" />
		<p class="font-bold">مجدول رسائل تيليجرام</p>
		<p>Copyright © 2022 - All right reserved</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a href="#/"><GithubLogo size={24} weight="bold" /></a>
			<a href="#/"><TelegramLogo size={24} weight="bold" /></a>
		</div>
	</div>
</footer>
