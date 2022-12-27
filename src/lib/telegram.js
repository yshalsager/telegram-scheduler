import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

class Telegram {
	constructor(apiId, apiHash, stringSession) {
		this.setupAuth(apiId, apiHash, stringSession);
	}

	static createClient(apiId, apiHash, stringSession) {
		// Singleton
		if (!this.instance) {
			this.instance = new Telegram(apiId, apiHash, stringSession);
		}
		return this.instance;
	}

	setupAuth(apiId, apiHash, stringSession) {
		this.apiId = Number(apiId);
		this.apiHash = apiHash;
		this.stringSession = new StringSession(stringSession);
		this.isNewSignIn = !stringSession;
	}

	setupClient() {
		this.client = new TelegramClient(this.stringSession, this.apiId, this.apiHash, {
			connectionRetries: 5
		});
	}

	async signIn() {
		await this.client.connect();
		return true;
	}

	async newSignIn(phoneNumber) {
		await this.client.start({
			phoneNumber: phoneNumber,
			phoneCode: async () =>
				prompt('أدخل رمز التحقق الذي وصلك على تطبيق تيليجرام أو في رسالة الآن'),
			password: async () => prompt('أدخل كلمة السر الخاصة بالمصادقة الثنائية'),
			onError: (err) => {
				return console.log(err.toString());
			}
		});
		return true;
	}

	async getStringSession() {
		return await this.client.session.save();
	}

	async getMe() {
		const me = await this.client.getMe();
		return {
			username: me.username ?? '',
			name: `${me.firstName || ''} ${me.lastName || ''}`.trim(),
			id: String(me.id)
		};
	}
}

export const telegram = Telegram.createClient();
