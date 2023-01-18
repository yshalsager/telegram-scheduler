/**
 *
 * @param {FileList} files - Files list from html input to take the first file to be read and split
 * @param {string} lineSeparator - The separator used to split the file's content
 *
 * @returns {Array} - An array of objects, where each object has the properties 'id', 'text', 'prefix', and 'suffix'
 */

export async function readAndSplitText(files, lineSeparator) {
	// HTML <input> element returns a FileList.
	// https://developer.mozilla.org/en-US/docs/Web/API/FileList
	// We get the first selected item of the FileList, which is a File object.
	// https://developer.mozilla.org/en-US/docs/Web/API/File
	const selectedFile = files.item(0);
	// The File object is a Blob, which has `text()` method that returns a Promise
	//  that resolves with a string containing the contents of the blob, interpreted as UTF-8.
	// https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
	const selectedFileContent = await selectedFile.text();
	let splittedText = [];
	let noteIndex = 0;
	const lines = selectedFileContent.split('\n');
	let text;

	lines.forEach((line, itemIndex) => {
		if (line.startsWith(lineSeparator)) {
			// Case 1: First match
			if (!text) {
				text = line.trim();
			} else {
				// Case 2: Any other match
				splittedText.push({ id: noteIndex++, text, prefix: '', suffix: '' });
				text = line.trim();
			}
		} else {
			if (text) text += '\n' + line;
		}
		if (itemIndex === lines.length - 1) {
			// Last line
			text += '\n' + line;
			splittedText.push({ id: noteIndex++, text, prefix: '', suffix: '' });
		}
	});
	return splittedText;
}
