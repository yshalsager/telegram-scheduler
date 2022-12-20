<script>
	import { splitLines } from '../utils/files.js';

	let file;
	let text;

	async function readText(event) {
		// HTML <input> element returns a FileList.
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		// We get the first selected item of the FileList, which is a File object.
		// https://developer.mozilla.org/en-US/docs/Web/API/File
		file = event.target.files.item(0);
		// The File object is a Blob, which has `text()` method that returns a Promise
		//  that resolves with a string containing the contents of the blob, interpreted as UTF-8.
		// https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
		const fileText = await file.text();
		const splittedText = await splitLines(fileText);
		text = splittedText.join('\n\n\n');
	}
</script>

<h1>Telegram Scheduler</h1>

<input type="file" on:change={readText} />
<p>file: {file ? file.name : ''}</p>
<pre id="output">{text ? text : ''}</pre>
