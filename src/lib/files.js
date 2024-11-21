/**
 * Splits text content into an array of note objects based on a separator
 * @param {string} content - The text content to split
 * @param {string} lineSeparator - The separator used to split the content
 * @returns {Array} Array of note objects with id, text, prefix, and suffix properties
 */
export function splitTextContent(content, lineSeparator) {
    let splittedText = []
    let noteIndex = 0
    const lines = content.split('\n')
    let text

    lines.forEach((line, itemIndex) => {
        if (line.startsWith(lineSeparator)) {
            if (!text) {
                text = line.trim()
            } else {
                splittedText.push({id: noteIndex++, text, prefix: '', suffix: ''})
                text = line.trim()
            }
        } else {
            if (text) text += '\n' + line
        }
        if (itemIndex === lines.length - 1) {
            text += '\n' + line
            splittedText.push({id: noteIndex++, text, prefix: '', suffix: ''})
        }
    })
    return splittedText
}
