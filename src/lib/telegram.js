import { Api, TelegramClient } from 'telegram';
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
		// this.isNewSignIn = !stringSession;
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

	async getAllChats() {
		// return {
		// 	chats: [
		// 		{ title: 'userbot', id: '-384723715' },
		// 		{ title: 'ysh', id: '152405066' }
		// 	]
		// };
		return await this.client.invoke(
			new Api.messages.GetAllChats({
				exceptIds: []
			})
		);
	}

	async sendScheduledMessage(messageText, chatID, scheduleTimeStamp) {
		// const chat = await this.client.getEntity(chatID);
		await this.client.sendMessage(chatID, {
			message: messageText.trim(),
			schedule: scheduleTimeStamp
		});
	}

	async batchSendMessage(messages, chatID) {
		if (!messages) return;
		const results = await Promise.all(
			messages.map((message) => {
				this.sendScheduledMessage(
					message.prefix + message.text + message.suffix,
					chatID,
					message.unixTimestamp
				);
			})
		);
		const validResults = results.filter((result) => !(result instanceof Error));
		results.filter((result) => result instanceof Error).forEach((result) => console.error(result));
		return validResults.length === results.length;
	}
}

export const telegram = Telegram.createClient();
