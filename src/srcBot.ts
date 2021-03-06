import { Telegraf } from 'telegraf';
import telegrafAws from 'telegraf-aws';
import { getDate } from './commands/getDate';

// Create telegraf instance for handle updates
const bot = new Telegraf(process.env.BOT_TOKEN!, {
	telegram: {
		webhookReply: true,
	},
});

// Register bot commands
bot.command('wann', (ctx) => getDate(ctx));

// Create webhook handler
const updateHandler = telegrafAws(bot, {
	timeout: 1000, // Optional parameter, after timeout, empty response will be sent to AWS and function execution will be stopped
});

// Telegraf Handler
export const handler = updateHandler;
