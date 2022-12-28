import { toastMessage } from '../store.js';

export const showToast = (message, callback = null, timeout = 3000) => {
	if (callback) callback();
	toastMessage.set(message);
	setTimeout(() => {
		toastMessage.set('');
	}, timeout);
};
