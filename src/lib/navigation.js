import { browser } from '$app/environment';
import { goto } from '$app/navigation';
export const navigateAndReplaceState = (page) => {
	console.log(`Navigating to ${page}`);
	browser && goto(page, { replaceState: true });
};
