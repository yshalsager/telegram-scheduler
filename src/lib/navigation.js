import { goto } from '$app/navigation';
export const navigateAndReplaceState = (page) => {
	console.log(`Navigating to ${page}`);
	goto(page, { replaceState: true });
};
