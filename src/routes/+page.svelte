<script>
	import Home from '../components/Home.svelte';
	import { splitLines } from '../lib/files.js';

	let files;
	let selectedFile;
	let textContent;

	async function readText() {
		// HTML <input> element returns a FileList.
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		// We get the first selected item of the FileList, which is a File object.
		// https://developer.mozilla.org/en-US/docs/Web/API/File
		selectedFile = files.item(0);
		// The File object is a Blob, which has `text()` method that returns a Promise
		//  that resolves with a string containing the contents of the blob, interpreted as UTF-8.
		// https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
		const selectedFileContent = await selectedFile.text();
		const splittedText = await splitLines(selectedFileContent);
		textContent = splittedText.join('\n\n\n');
	}
</script>

<Home />

<input bind:files type="file" on:change={readText} />
<p>file: {selectedFile ? selectedFile.name : ''}</p>
<textarea cols="50" rows="5" bind:value={textContent} />
