import { goto } from '$app/navigation';
export const navigateAndReplaceState = (page) => {
	goto(page, { replaceState: true });
};
