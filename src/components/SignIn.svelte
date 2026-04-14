<script>
import {telegram} from '../lib/telegram.js'
import {logOutCompletely} from '../lib/logout.js'
import {showToast} from '../lib/toast.js'
import {isEmpty} from '../lib/utils.js'

import {
    isAuthenticated,
    telegramApiID,
    telegramApiHash,
    telegramStringSession,
    telegramUser,
    isLoggedOut,
    isLoggedIn,
} from '../store.js'
import Redirect from './Redirect.svelte'

let apiID = $state('')
let apiHash = $state('')
let phoneNumber = $state('')

const logIn = async () => {
    // Use login data from local storage if it exists
    let signedIn
    if ($isLoggedOut) {
        telegram.setupAuth($telegramApiID, $telegramApiHash, $telegramStringSession)
        await telegram.setupClient()
        signedIn = await telegram.signIn()
    } else {
        // Login for the first time
        telegram.setupAuth(apiID, apiHash, '')
        await telegram.setupClient()
        signedIn = await telegram.newSignIn(phoneNumber)
    }
    if (signedIn) {
        showToast('登录成功！')
        if (isEmpty($telegramStringSession)) {
            // Save to store
            telegramApiID.set(apiID)
            telegramApiHash.set(apiHash)
            telegramStringSession.set(await telegram.getStringSession())
        }
        telegramUser.set(await telegram.getMe())
        isAuthenticated.set(true)
    } else {
        showToast('登录失败！')
    }
    return signedIn
}

const logOutAndShowToast = () => {
    showToast('已成功退出登录！', logOutCompletely)
}
</script>

{#if !$isLoggedIn}
    <div class="mt-10 flex flex-col items-center justify-center">
        {#if isEmpty($telegramStringSession)}
            <div class="form-control">
                <label class="label" for="apiID">
                    <span class="label-text">API ID</span>
                    <span class="badge badge-secondary">必填</span>
                </label>
                <input
                    name="apiID"
                    type="text"
                    placeholder="000000"
                    class="input input-bordered input-primary"
                    bind:value={apiID}
                />
                <span class="label label-text-alt">Telegram 个人账号的 API ID。</span>
            </div>
            <div class="form-control">
                <label class="label" for="apiHash">
                    <span class="label-text">API Hash</span>
                    <span class="badge badge-secondary">必填</span>
                </label>
                <input
                    name="apiHash"
                    type="password"
                    placeholder="xxxxxxxxxxxxxxxxx"
                    class="input input-bordered input-primary"
                    bind:value={apiHash}
                />
                <span class="label label-text-alt"
                    >Telegram 个人账号的 API Hash。</span
                >
            </div>
            <div class="form-control">
                <label class="label" for="phone">
                    <span class="label-text">手机号码</span>
                    <span class="badge badge-secondary">必填</span>
                </label>
                <input
                    name="phone"
                    dir="ltr"
                    type="tel"
                    placeholder="+xxxxxxxxxx"
                    class="input input-bordered input-primary self-end"
                    bind:value={phoneNumber}
                />
                <span class="label label-text-alt">包含国际区号的 Telegram 手机号码（如 +86...）。</span>
            </div>
            <span class="label-text-alt mt-6"
                >登录凭证将安全保存在本地，以便下次自动登录。</span
            >
        {:else}
            <span class="label text-center"
                >检测到本地保存的登录凭证。您可以点击直接登录，<br />或选择退出以使用其他账号。</span
            >
        {/if}
        <div class="form-control my-6">
            <div class="flex flex-wrap gap-4 justify-center">
                <button onclick={logIn} class="btn btn-primary">登录系统</button>
                {#if $isLoggedOut}
                    <button onclick={logOutAndShowToast} class="btn btn-warning">退出当前账号</button>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <aside class="label block text-center">
        正在跳转至系统控制台... <a class="text-primary" href="/app">如果未自动跳转，请点击此处。</a>
    </aside>
{/if}
<Redirect url="/app/" condition={isLoggedIn} timeout="2100" />
