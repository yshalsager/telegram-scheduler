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
	let splittedText =
		selectedFileContent.match(new RegExp(`^([\\s\\S]+?)(?=\\s+${lineSeparator})`, 'gm')) || [];
	// Last match isn't included, let's add it.
	const lastOccurrence = splittedText[splittedText.length - 1];
	const remainingText = selectedFileContent.slice(
		selectedFileContent.indexOf(lastOccurrence) + lastOccurrence.length + 1
	);
	const remainingMatch = remainingText.match(
		new RegExp(`^([\\s\\S]+)(?!\\s+${lineSeparator})`, 'gm')
	);
	splittedText = splittedText.concat(remainingMatch);
	// console.log(splittedText);
	return splittedText.map((text, index) => {
		return { id: index, text: text, prefix: '', suffix: '' };
	});
}
