import {TelegramClient} from 'telegram'
import {StringSession} from 'telegram/sessions'

class Telegram {
    /**
     * Creates an instance of Telegram.
     *
     * @param {number} apiId - Telegram API ID.
     * @param {string} apiHash - Telegram API Hash.
     * @param {string} stringSession - Session string for Telegram client.
     */
    constructor(apiId, apiHash, stringSession) {
        this.setupAuth(apiId, apiHash, stringSession)
    }

    /**
     * Creates a singleton instance of Telegram.
     *
     * @param {number} apiId - Telegram API ID.
     * @param {string} apiHash - Telegram API Hash.
     * @param {string} stringSession - Session string for Telegram client.
     * @returns {Telegram} - Singleton instance of Telegram.
     */
    static createClient(apiId, apiHash, stringSession) {
        // Singleton
        if (!this.instance) {
            this.instance = new Telegram(apiId, apiHash, stringSession)
        }
        return this.instance
    }

    /**
     * Setup authentication details for Telegram client.
     *
     * @param {number} apiId - Telegram API ID.
     * @param {string} apiHash - Telegram API Hash.
     * @param {string} stringSession - Session string for Telegram client.
     */
    setupAuth(apiId, apiHash, stringSession) {
        this.apiId = parseInt(apiId)
        this.apiHash = apiHash
        this.stringSession = new StringSession(stringSession)
        // this.isNewSignIn = !stringSession;
    }

    /**
     * Sets up the Telegram client using the provided session, API ID, and API hash. It also sets the number of connection retries to 5.
     * @param none
     * @returns {undefined}
     */
    setupClient() {
        this.client = new TelegramClient(this.stringSession, this.apiId, this.apiHash, {
            connectionRetries: 5,
        })
    }

    /**
     * Connects the Telegram client to the server and returns true
     *
     * @returns {boolean} true
     */
    async signIn() {
        await this.client.connect()
        return true
    }

    /**
     * Starts a new sign in process with the given phone number
     *
     * @param {string} phoneNumber - phone number to sign in with
     * @returns {boolean} true
     */
    async newSignIn(phoneNumber) {
        await this.client.start({
            phoneNumber,
            phoneCode: async () =>
                prompt('أدخل رمز التحقق الذي وصلك على تطبيق تيليجرام أو في رسالة الآن'),
            password: async () => prompt('أدخل كلمة السر الخاصة بالمصادقة الثنائية'),
            onError: err => {
                return console.log(err.toString())
            },
        })
        return true
    }

    /**
     * saves the current session, which can be passed to the TelegramClient constructor to authenticate the user.
     *
     * @async
     * @returns {Promise<String>} - Returns a string session that can be used to authenticate the user
     */
    async getStringSession() {
        return await this.client.session.save()
    }

    /**
     * Retrieves the information of the authenticated user by calling the TelegramClient's getMe() function.
     * @async
     * @returns {Promise<Object>} - Returns an object containing the user's username, name, and id
     */
    async getMe() {
        const me = await this.client.getMe()
        return {
            username: me.username ?? '',
            name: `${me.firstName || ''} ${me.lastName || ''}`.trim(),
            id: String(me.id),
        }
    }

    /**
     * Retrieves the information of all the chats by calling the TelegramClient's getDialogs function.
     * @async
     * @returns {Promise<Object>} - Returns an array of objects containing the title and id of each chat
     */
    async getAllChats() {
        const dialogs = await this.client.getDialogs({archived: false})
        return dialogs.map(dialog => ({title: dialog.title, id: dialog.id}))
    }

    /**
     * Sends a message to the specified chat by calling the TelegramClient's sendMessage() function
     * and passing the message text, chat id and schedule timestamp as parameters.
     * @async
     * @param {string} messageText - The text of the message to send
     * @param {string} chatID - The ID of the chat to send the message to
     * @param {number} scheduleTimeStamp - Unix timestamp of the scheduled time to send the message
     * @returns {Promise<import('telegram').Api.Message>} - Returns Api Message object
     */
    async sendScheduledMessage(messageText, chatID, scheduleTimeStamp) {
        // const chat = await this.client.getEntity(chatID);
        await this.client.sendMessage(chatID, {
            message: messageText.trim(),
            schedule: scheduleTimeStamp,
        })
    }

    /**
     * Sends multiple messages to a specific chat.
     * @async
     * @param {Array<Object>} messages - An array of objects representing the messages to be sent.
     * Each object should contain the following properties: prefix, text, suffix, and unixTimestamp.
     * The method concatenates the prefix, text, and suffix properties to form the message text, and uses the unixTimestamp property to schedule when the message should be sent. chatID: The ID of the chat to which the messages will be sent.
     * @param {string} chatID - The ID of the chat to send the message to
     * @returns {undefined}
     */
    async batchSendMessage(messages, chatID) {
        if (!messages) return
        for (const message of messages) {
            try {
                await this.sendScheduledMessage(
                    message.prefix + message.text + message.suffix,
                    chatID,
                    message.unixTimestamp,
                )
            } catch (error) {
                console.error(error)
                if (error.errorMessage === 'FLOOD') {
									console.warn(`Got flood wait, will sleep for ${error.seconds} seconds.`)
                    await new Promise(resolve => setTimeout(resolve, error.seconds * 1000))
                } else throw error
            }
            // Wait for 1 seconds after sending a message
            await new Promise(resolve => setTimeout(resolve, 1 * 1000))
        }
        // const results = await Promise.all(
        // 	messages.map((message) => {
        // 		this.sendScheduledMessage(
        // 			message.prefix + message.text + message.suffix,
        // 			chatID,
        // 			message.unixTimestamp
        // 		);
        // 	})
        // );
        // const validResults = results.filter((result) => !(result instanceof Error));
        // results.filter((result) => result instanceof Error).forEach((result) => console.error(result));
        // return validResults.length === results.length;
    }
}

export const telegram = Telegram.createClient()
