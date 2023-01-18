<script>
	import { navigateAndReplaceState } from '../lib/navigation.js';
	import { logOut } from '../lib/logout.js';
	import { showToast } from '../lib/toast.js';
	import { toggleTheme } from '../lib/theme.js';
	import { theme, isAuthenticated, telegramUser } from '../store.js';
	import { page } from '$app/stores';

	// import Gear from 'phosphor-svelte/lib/Gear';
	import Moon from 'phosphor-svelte/lib/Moon';
	import SignIn from 'phosphor-svelte/lib/SignIn';
	import SignOut from 'phosphor-svelte/lib/SignOut';
	import Sun from 'phosphor-svelte/lib/Sun';

	const logOutAndShowToast = () => {
		showToast('سجل الخروج بنجاح!', logOut);
	};

	// TODO: Add settings page and clear data button
</script>

<div class="navbar bg-base-100 text-primary border-b-2 mb-5 sticky top-0 z-10">
	<div class="flex-1">
		<a href="/" class="md:text-xl sm:text-md font-bold">مجدول رسائل تيليجرام</a>
	</div>
	{#if $isAuthenticated}
		<span>مرحبا!<strong class="p-1">{$telegramUser.name ?? ''}</strong></span>
	{/if}

	<ul class="menu menu-horizontal bg-base-100 p-2 rounded-box">
		<li>
			{#if $isAuthenticated}
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a id="signOutBtn" title="تسجيل خروج" href="#" on:click={logOutAndShowToast}>
					<SignOut size={24} weight="bold" />
				</a>
			{:else}
				<a
					title="تسجيل الدخول"
					href="/login"
					on:click={() => $page.url.pathname !== '/login' && navigateAndReplaceState('/login')}
				>
					<SignIn size={24} weight="bold" />
				</a>
			{/if}
		</li>
		<!-- <li>
			<a
				title="اﻹعدادات"
				href="/settings"
				on:click={() => $page.url.pathname !== '/settings' && navigateAndReplaceState('/settings')}
			>
				<Gear size={24} weight="bold" />
			</a>
		</li> -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li on:click={toggleTheme}>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a title="تبديل المظهر" href="#">
				{#if $theme === 'telegramDark'}
					<Moon size={24} weight="bold" />
				{:else}
					<Sun size={24} weight="bold" />
				{/if}
			</a>
		</li>
	</ul>
</div>
