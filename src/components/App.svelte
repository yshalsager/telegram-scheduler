<script>
import DOMPurify from 'dompurify'

import Message from './Message.svelte'
import Redirect from './Redirect.svelte'

import {getScheduleTimeStamps} from '../lib/datetime.js'
import {splitTextContent} from '../lib/files.js'
import {telegram} from '../lib/telegram.js'
import {showToast} from '../lib/toast.js'
import {isAuthenticated, isLoggedOut, isLoggedOutCompletely} from '../store.js'

import {format} from 'date-fns'
import FileText from 'phosphor-svelte/lib/FileText'

let selectedFile = $state()
let selectedChat = $state()
let files = $state()
let rawText = $state('')
let lineSeparators = $state([{value: '\n'}])
let messagePrefix = $state('')
let messageSuffix = $state('')
let scheduleStartDate = $state(format(Date.now(), 'yyyy-MM-dd'))
let scheduleStartTime = $state(format(Date.now(), 'HH:mm'))
let scheduleInterval = $state(60)
let scheduleStopTime = $state('22:00')
let scheduleNewDayStartTime = $state('09:00')
let isSending = $state()
let isDone = $state()

const [selectedChatID, selectedChatTitle] = $derived(selectedChat?.split('|') || ['', ''])

const rawTextMessages = $derived.by(() => {
    if (!rawText) return []
    let messages = [{text: rawText}]
    lineSeparators.forEach(separator => {
        if (!separator.value) return
        messages = messages.flatMap(msg => splitTextContent(msg.text, separator.value))
    })
    return messages
        .filter(msg => msg.text.length)
        .map(msg => ({
            ...msg,
            prefix: messagePrefix,
            suffix: messageSuffix
        }))
})

let scheduleTimestamps = $derived.by(() => {
    if (!rawTextMessages.length || !scheduleStartDate || !scheduleStartTime || !scheduleInterval)
        return null

    try {
        return getScheduleTimeStamps(
            rawTextMessages.length,
            scheduleStartDate,
            scheduleStartTime,
            scheduleInterval,
            scheduleStopTime,
            scheduleNewDayStartTime,
        )
    } catch (error) {
        console.error(error)
        return null
    }
})

const textMessages = $derived.by(() => {
    return rawTextMessages.map((message, index) => ({
        ...message,
        prefix: messagePrefix,
        suffix: messageSuffix,
        ...(scheduleTimestamps?.[index] || {}),
    }))
})

async function readText() {
    selectedFile = files.item(0).name
    rawText = await files.item(0).text()
}

function resetApp() {
    selectedFile = undefined
    files = undefined
    rawText = ''
    scheduleStartDate = format(Date.now(), 'yyyy-MM-dd')
    scheduleStartTime = format(Date.now(), 'HH:mm')
    messagePrefix = ''
    messageSuffix = ''
    isDone = false
}

function addSeparator() {
    lineSeparators = [...lineSeparators, {value: ''}]
}

function updateSeparator(index, value) {
    lineSeparators = lineSeparators.map((sep, i) => (i === index ? {value} : sep))
}

function removeSeparator(index) {
    lineSeparators = lineSeparators.filter((_, i) => i !== index)
}
</script>

<Redirect url="/login/" condition={isLoggedOut} />
<Redirect url="/login/" condition={isLoggedOutCompletely} />
{#if isAuthenticated}
    <div id="filePreview" class="bg-base-100 min-h-[75vh] w-full">
        <div class="flex min-w-full flex-wrap py-6 sm:flex-nowrap">
            <div class="flex basis-1/2 flex-col items-center justify-center gap-4">
                <div class="form-control w-full max-w-sm">
                    <label class="label" for="lineSeparators">
                        <span class="label-text">按照以下规则分割文件内容：</span>
                    </label>
                    <div class="flex flex-col gap-2">
                        {#each lineSeparators as separator, index}
                            <div class="flex items-center gap-2">
                                <input
                                    class="input input-sm input-primary grow"
                                    type="text"
                                    placeholder="请输入分割符"
                                    value={separator.value}
                                    oninput={e => updateSeparator(index, e.target.value)}
                                />
                                {#if index > 0}
                                    <button
                                        class="btn btn-ghost btn-sm text-error"
                                        onclick={() => removeSeparator(index)}
                                    >
                                        ✕
                                    </button>
                                {/if}
                            </div>
                        {/each}
                        <button class="btn btn-outline btn-primary btn-sm" onclick={addSeparator}>
                            + 添加分割符
                        </button>
                    </div>
                </div>
                <div class="form-control w-full max-w-sm">
                    <label class="label" for="lineSeparator">
                        {#if !selectedFile}
                            <span class="label-text">请选择要上传的文本文件：</span>
                        {:else}
                            <span class="label-text">已选择文件：</span>
                        {/if}
                    </label>
                    <input
                        id="filesInput"
                        bind:files
                        onchange={readText}
                        type="file"
                        class="invisible hidden"
                    />
                    <button
                        class="btn btn-outline btn-primary btn-sm gap-2 normal-case"
                        onclick={() => document.getElementById('filesInput').click()}
                    >
                        {#if !selectedFile}
                            选择文本文件
                        {/if}
                        <FileText size="24" />
                        {#if selectedFile}
                            <span>{selectedFile}</span>
                        {/if}
                    </button>
                </div>
                <div class="form-control w-full max-w-sm">
                    <span class="label-text">选择目标群组或频道</span>
                    <span class="label-text mb-2 text-xs"
                        >(仅支持发送至具备发言权限的群组和频道)</span
                    >
                    {#await telegram.getAllChats()}
                        <p>正在加载会话列表...</p>
                    {:then chats}
                        <select
                            bind:value={selectedChat}
                            class="select select-bordered select-primary select-sm w-full max-w-sm"
                        >
                            {#each chats as chat (chat.id)}
                                <option value={`${chat.id}|${chat.title}`}>{chat.title}</option>
                            {/each}
                        </select>
                    {:catch error}
                        <p style="color: red">{error.message}</p>
                    {/await}
                </div>
                <div class="flex flex-wrap items-end gap-2 sm:flex-nowrap">
                    <div class="form-control">
                        <label class="label mb-2" for="messagePrefix">
                            <span class="label-text">在每条消息前追加内容：</span>
                        </label>
                        <textarea
                            id="messagePrefix"
                            type="text"
                            placeholder=""
                            bind:value={messagePrefix}
                            class="border-2 textarea textarea-bordered textarea-primary"
                        ></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label mb-2" for="messageSuffix">
                            <span class="label-text">在每条消息后追加内容：</span>
                        </label>
                        <textarea
                            id="messageSuffix"
                            type="text"
                            placeholder=""
                            bind:value={messageSuffix}
                            class="border-2 textarea textarea-bordered textarea-primary"
                        ></textarea>
                    </div>
                </div>
                <div class="flex w-full flex-wrap items-end gap-2 sm:flex-nowrap">
                    <div class="form-control">
                        <label class="label mb-2" for="scheduleStartDate">
                            <span class="label-text">计划开始发送日期：</span>
                        </label>
                        <input
                            id="scheduleStartDate"
                            type="text"
                            placeholder="2022-12-31"
                            bind:value={scheduleStartDate}
                            class="input input-sm input-bordered input-primary w-full max-w-sm"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label mb-2" for="scheduleStartTime">
                            <span class="label-text">每日首条消息发送时间：</span>
                        </label>
                        <input
                            id="scheduleStartTime"
                            type="text"
                            placeholder="08:00"
                            bind:value={scheduleStartTime}
                            class="input input-sm input-bordered input-primary w-full max-w-sm"
                        />
                    </div>
                </div>
                <div class="flex w-full flex-wrap items-end gap-2 sm:flex-nowrap">
                    <div class="form-control">
                        <label class="label mb-2" for="scheduleInterval">
                            <span class="label-text">发送间隔（分钟）：</span>
                        </label>
                        <input
                            id="scheduleInterval"
                            type="text"
                            placeholder="60"
                            bind:value={scheduleInterval}
                            class="input input-sm input-bordered input-primary w-full max-w-sm"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label mb-2" for="scheduleStopTime">
                            <span class="label-text">每日休眠时间（停止发送）：</span>
                        </label>
                        <input
                            id="scheduleStopTime"
                            type="text"
                            placeholder="22:00"
                            bind:value={scheduleStopTime}
                            class="input input-sm input-bordered input-primary w-full max-w-sm"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label mb-2" for="scheduleNewDayStartTime">
                            <span class="label-text">次日唤醒时间（恢复发送）：</span>
                        </label>
                        <input
                            id="scheduleNewDayStartTime"
                            type="text"
                            placeholder="09:00"
                            bind:value={scheduleNewDayStartTime}
                            class="input input-sm input-bordered input-primary w-full max-w-sm"
                        />
                    </div>
                </div>
                {#if isDone}
                    <button class="btn btn-primary text-base-100" onclick={resetApp}
                        >重新创建任务</button
                    >
                {:else if isSending}
                    <button class="btn btn-warning text-base-100"
                        >消息批量发送中，请勿关闭页面...</button
                    >
                {:else}
                    <button
                        class="btn btn-primary text-base-100"
                        onclick={async () => {
                            isSending = true
                            await telegram.batchSendMessage(textMessages, selectedChatID)
                            showToast('所有消息均已成功发送或加入队列！')
                            isSending = false
                            isDone = true
                        }}
                    >
                        开始执行任务</button
                    >
                {/if}
            </div>
            <div class="divider divider-horizontal"></div>
            <div class="flex basis-1/2 flex-col items-center justify-center overflow-y-auto">
                {#if !selectedFile}
                    <span class="mt-4 border-2 p-8 sm:p-32 text-gray-500">选择文本文件后，此处将预览待发送的消息队列。</span>
                {:else}
                    <div class="self-start py-3">
                        <span
                            >待发送消息来源：<strong class="mr-1">{selectedFile}</strong
                            ></span
                        >
                        <span class="text-sm text-gray-500">
                            (消息总数: {rawTextMessages.length})
                        </span>
                    </div>
                {/if}
                {#if rawTextMessages.length > 1}
                    <div class="max-h-[75vh]">
                        {#each rawTextMessages as message}
                            <Message author={selectedChatTitle} messageDateTime={message.date}>
                                {@html DOMPurify.sanitize(
                                    message.prefix.replaceAll('\n', '<br />'),
                                ) +
                                    DOMPurify.sanitize(message.text.replaceAll('\n', '<br />')) +
                                    DOMPurify.sanitize(message.suffix.replaceAll('\n', '<br />'))}
                            </Message>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
