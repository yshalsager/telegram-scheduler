<script>
import {navigateAndReplaceState} from '../lib/navigation.js'
</script>

<div class="hero min-h-[75vh]">
    <div class="hero-content text-center">
        <div class="max-w-3xl">
            <h1 class="text-5xl font-bold text-primary">Telegram 消息定时发送系统</h1>
            <p class="py-6 text-lg dark:text-gray-300">
                企业级 Telegram 定时消息批处理解决方案。只需登录您的账号，上传包含消息内容的文本文件，
                选择目标联系人或群组，配置发送计划，即可实现自动化批量发送！
            </p>
            <button
                class="btn btn-primary btn-lg text-xl text-base-100"
                onclick={() => navigateAndReplaceState('/app/')}>立即开始使用</button
            >
        </div>
    </div>
</div>
