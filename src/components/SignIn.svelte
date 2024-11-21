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
        showToast('سجل الدخول بنجاح!')
        if (isEmpty($telegramStringSession)) {
            // Save to store
            telegramApiID.set(apiID)
            telegramApiHash.set(apiHash)
            telegramStringSession.set(await telegram.getStringSession())
        }
        telegramUser.set(await telegram.getMe())
        isAuthenticated.set(true)
    } else {
        showToast('فشل تسجيل الدخول!')
    }
    return signedIn
}

const logOutAndShowToast = () => {
    showToast('سجل الخروج بنجاح!', logOutCompletely)
}
</script>

{#if !$isLoggedIn}
    <div class="mt-10 flex flex-col items-center justify-center">
        {#if isEmpty($telegramStringSession)}
            <div class="form-control">
                <label class="label" for="apiID">
                    <span class="label-text">API ID</span>
                    <span class="badge badge-secondary">مطلوب</span>
                </label>
                <input
                    name="apiID"
                    type="text"
                    placeholder="000000"
                    class="input input-bordered input-primary"
                    bind:value={apiID}
                />
                <span class="label label-text-alt">معرف واجهة برمجة تيليجرام للحساب الشخصي.</span>
            </div>
            <div class="form-control">
                <label class="label" for="apiHash">
                    <span class="label-text">API Hash</span>
                    <span class="badge badge-secondary">مطلوب</span>
                </label>
                <input
                    name="apiHash"
                    type="password"
                    placeholder="xxxxxxxxxxxxxxxxx"
                    class="input input-bordered input-primary"
                    bind:value={apiHash}
                />
                <span class="label label-text-alt"
                    >الهاش الخاص بواجهة برمجة تيليجرام للحساب الشخصي.</span
                >
            </div>
            <div class="form-control">
                <label class="label" for="phone">
                    <span class="label-text">رقم الهاتف</span>
                    <span class="badge badge-secondary">مطلوب</span>
                </label>
                <input
                    name="phone"
                    dir="ltr"
                    type="tel"
                    placeholder="+xxxxxxxxxx"
                    class="input input-bordered input-primary self-end"
                    bind:value={phoneNumber}
                />
                <span class="label label-text-alt">رقم هاتف حساب تيليجرام بالتنسيق الدولي.</span>
            </div>
            <span class="label-text-alt mt-6"
                >سيتم حفظ بيانات تسجيل الدخول واستخدامها في المرات القادمة.</span
            >
        {:else}
            <span class="label text-center"
                >لقد سجلت الدخول سابقا. اضغط للتسجيل بواسطة البيانات المحفوظة.<br />أو سجل الخروج
                للتسجيل ببيانات مختلفة.</span
            >
        {/if}
        <div class="form-control my-6">
            <button onclick={logIn} class="btn btn-primary mb-4">تسجيل الدخول</button>
            {#if $isLoggedOut}
                <button onclick={logOutAndShowToast} class="btn btn-warning">تسجيل الخروج</button>
            {/if}
        </div>
    </div>
{:else}
    <aside class="label block text-center">
        يعاد توجهيك الآن... <a class="text-primary" href="/app">اضغط هنا إذا لم تحول تلقائيا.</a>
    </aside>
{/if}
<Redirect url="/app/" condition={isLoggedIn} timeout="2100" />
