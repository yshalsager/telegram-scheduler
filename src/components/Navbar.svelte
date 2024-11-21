<script>
import {navigateAndReplaceState} from '../lib/navigation.js'
import {logOut} from '../lib/logout.js'
import {showToast} from '../lib/toast.js'
import {toggleTheme} from '../lib/theme.js'
import {theme, isAuthenticated, telegramUser} from '../store.js'
import {page} from '$app/stores'

// import Gear from 'phosphor-svelte/lib/Gear';
import Moon from 'phosphor-svelte/lib/Moon'
import SignIn from 'phosphor-svelte/lib/SignIn'
import SignOut from 'phosphor-svelte/lib/SignOut'
import Sun from 'phosphor-svelte/lib/Sun'

const logOutAndShowToast = () => {
    showToast('سجل الخروج بنجاح!', logOut)
}

// TODO: Add settings page and clear data button
</script>

<div class="navbar sticky top-0 z-10 mb-5 border-b-2 bg-base-100 text-primary">
    <div class="flex-1">
        <a href="/" class="sm:text-md font-bold md:text-xl">مجدول رسائل تيليجرام</a>
    </div>
    {#if $isAuthenticated}
        <span>مرحبا!<strong class="p-1">{$telegramUser.name ?? ''}</strong></span>
    {/if}

    <ul class="menu menu-horizontal rounded-box bg-base-100 p-2">
        <li>
            {#if $isAuthenticated}
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a id="signOutBtn" title="تسجيل خروج" href="#" onclick={logOutAndShowToast}>
                    <SignOut size={24} weight="bold" />
                </a>
            {:else}
                <a
                    title="تسجيل الدخول"
                    href="/login"
                    onclick={() =>
                        $page.url.pathname !== '/login' && navigateAndReplaceState('/login')}
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
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
        <li onclick={toggleTheme}>
            <!-- svelte-ignore a11y_invalid_attribute -->
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
