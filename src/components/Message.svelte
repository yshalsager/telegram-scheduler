<script>
import {format} from 'date-fns'

let authorChannel
let {author, messageDateTime, children} = $props()
</script>

<div
    class="bg-base-100 text-base-content relative mb-4 max-w-sm rounded-tr-lg rounded-b-lg px-2 py-1 text-start drop-shadow-sm
        dark:bg-gray-700 dark:text-gray-100"
>
    <i class="pointer-events-none absolute -top-px -left-2">
        <svg width="10px" height="20px" viewBox="0 0 10 20">
            <g fill="none">
                <path
                    fill="currentColor"
                    class="fill-base-100 dark:fill-gray-700"
                    d="M8,1 L9,1 L9,20 L8,20 L8,18 C7.807,15.161 7.124,12.233 5.950,9.218 C5.046,6.893 3.504,4.733 1.325,2.738 L1.325,2.738 C0.917,2.365 0.89,1.732 1.263,1.325 C1.452,1.118 1.72,1 2,1 L8,1 Z"
                />
                <path
                    d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0 L9,0 L9,20 L7,20 L7,20 L7.002,18.068 C6.816,15.333 6.156,12.504 5.018,9.58 C4.172,7.406 2.72,5.371 0.649,3.475 C-0.165,2.729 -0.221,1.464 0.525,0.649 C0.904,0.236 1.439,0 2,0 Z"
                />
                <path
                    d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0.5 L9,0.5 L9,20 L7.5,20 L7.5,20 L7.501,18.034 C7.312,15.247 6.64,12.369 5.484,9.399 C4.609,7.15 3.112,5.052 0.987,3.106 C0.376,2.547 0.334,1.598 0.894,0.987 C1.178,0.677 1.579,0.5 2,0.5 Z"
                />
                <path
                    d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0.667 L9,0.667 L9,20 L7.667,20 L7.667,20 L7.668,18.023 C7.477,15.218 6.802,12.324 5.64,9.338 C4.755,7.064 3.243,4.946 1.1,2.983 C0.557,2.486 0.52,1.643 1.017,1.1 C1.269,0.824 1.626,0.667 2,0.667 Z"
                />
            </g>
        </svg>
    </i>
    {#if author}
        <div
            class="text-primary mt-1 overflow-hidden text-sm leading-4 overflow-ellipsis
                whitespace-nowrap dark:text-blue-400"
        >
            {#if authorChannel}
                <a href={authorChannel}><span dir="auto">{author}</span></a>
            {:else}
                <span dir="auto">{author}</span>
            {/if}
        </div>
    {/if}

    <div class="mt-1.5 text-sm leading-6 break-words" dir="auto">
        {@render children?.()}
    </div>

    {#if messageDateTime}
        <div
            class="text-secondary mt-1 -mr-0.5 overflow-hidden text-xs leading-4 dark:text-gray-400"
        >
            <time datetime={format(messageDateTime, "yyyy-MM-dd'T'HH:mm:ssxx")} class="time"
                >{format(messageDateTime, 'yyyy-MM-dd HH:mm')}</time
            >
        </div>
    {/if}
</div>
