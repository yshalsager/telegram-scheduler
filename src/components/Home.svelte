<script>
	import { navigateAndReplaceState } from '../lib/navigation.js';
</script>

<div class="hero min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-3xl">
			<h1 class="text-5xl font-bold text-primary">مجدول رسائل تيليجرام</h1>
			<p class="py-6 text-lg">
				طريقة سهلة لجدولة رسائل تيليجرام المخزنة في ملف نصي. كل ما عليك هو تسجيل الدخول، ثم اختيار
				الملف، واختيار المحادثة التي تود إرسال الرسائل إليها، وإعداد كيفية الجدولة ثم اﻹرسال!
			</p>
			<button
				class="btn btn-lg btn-primary text-base-100 text-xl"
				on:click={() => navigateAndReplaceState('/app/')}>البدء الآن!</button
			>
		</div>
	</div>
</div>
