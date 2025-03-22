/**
 * Splits text content into an array of note objects based on a separator
 * @param {string} content - The text content to split
 * @param {string} lineSeparator - The separator used to split the content
 * @returns {Array} Array of note objects with id, text, prefix, and suffix properties
 */
export function splitTextContent(content, lineSeparator) {
    const lines = content.split('\n');
    const splittedText = [];
    let noteIndex = 0;
    
    // Find the starting indices of each note
    const noteStartIndices = lines.reduce((indices, line, index) => {
        if (line.startsWith(lineSeparator)) {
            indices.push(index);
        }
        return indices;
    }, []);
    
    // Handle case with no separators
    if (noteStartIndices.length === 0) {
        if (content.trim()) {
            return [{id: 0, text: content, prefix: '', suffix: ''}];
        }
        return [];
    }
    
    // Process each note
    for (let i = 0; i < noteStartIndices.length; i++) {
        const startIdx = noteStartIndices[i];
        const endIdx = i < noteStartIndices.length - 1 ? noteStartIndices[i + 1] : lines.length;
        
        // Extract and join the note's lines
        const noteLines = lines.slice(startIdx, endIdx);
        const noteText = noteLines.join('\n');
        
        splittedText.push({
            id: noteIndex++,
            text: noteText,
            prefix: '',
            suffix: ''
        });
    }
    
    // Handle any text before the first separator if needed
    if (noteStartIndices[0] > 0) {
        const prefixLines = lines.slice(0, noteStartIndices[0]);
        const prefixText = prefixLines.join('\n');
        
        if (prefixText.trim()) {
            splittedText.unshift({
                id: 0,
                text: prefixText,
                prefix: '',
                suffix: ''
            });
            
            // Update other note IDs
            for (let i = 1; i < splittedText.length; i++) {
                splittedText[i].id = i;
            }
        }
    }
    
    return splittedText;
}