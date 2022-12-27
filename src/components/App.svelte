<script>
	import Redirect from './Redirect.svelte';
	import { isLoggedOut } from '../store.js';
</script>

<Redirect url="/login/" condition={isLoggedOut} />
