import { noteLineStartsWithDash } from './patterns.js';

export const splitLines = (text) => text.match(noteLineStartsWithDash) || [''];
