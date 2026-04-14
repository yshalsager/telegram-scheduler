<script>
import {switchTheme} from '../lib/theme.js'
let themes = [
    {value: 'telegram', name: `浅色主题`},
    {value: 'telegramDark', name: `深色主题`},
]
let selectedTheme = $state()
</script>

<div class="mt-16 grid grid-cols-2 gap-4">
    <div class="text-center font-bold">系统主题</div>
    <div>
        <select
            bind:value={selectedTheme}
            onchange={() => switchTheme(selectedTheme)}
            class="select select-bordered select-primary w-full max-w-xs"
        >
            {#each themes as theme}
                <option value={theme.value}>
                    {theme.name}
                </option>
            {/each}
        </select>
    </div>
    <div class="text-center font-bold">文件内容默认分割符：</div>
    <div>
        <input
            type="text"
            placeholder="-"
            class="input input-bordered input-primary w-full max-w-xs"
            value="-"
        />
    </div>
</div>
