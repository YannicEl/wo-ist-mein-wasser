import fetch from 'node-fetch';
import { Context } from 'telegraf';

export async function getDate(ctx: Context) {
	try {
		const date = await fetchDate();
		ctx.reply(`Die nächste Lieferung kommt am ${date} 💧🚰`);
	} catch (err) {
		console.error(err);
		ctx.reply('ups da ist etwas schief gelaufen');
	}
}

async function fetchDate() {
	const { text } = await await fetch(
		'https://www.aquaalpina.at/wp-admin/admin-ajax.php',
		{
			headers: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body:
				'action=custom_action&function=get-tracking-details&contractId=10120007',
			method: 'POST',
		}
	).then((e) => e.json());

	const parts = text.split(':  ');

	return parts[1];
}
