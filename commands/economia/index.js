const { token, default_prefix } = require('./config.json');
const { config } = require('dotenv');
const db = require('quick.db');
const Levels = require('discord-xp');
const discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new discord.Client({
	disableEveryone: true
});


client.commands = new discord.Collection();
client.aliases = new discord.Collection();


['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
  console.log('>---------------------------<'),
  console.log('Logado com:'),
  console.log('>---------------------------<'),
  console.log('Username: ' + client.user.username),
  console.log('Discriminador: ' + client.user.id),
  console.log('>---------------------------<');
  
});

client.on('message', async message => {

	if (message.author.bot) return;
	if (!message.guild) return;
	let prefix = db.get(`prefix_${message.guild.id}`);
	if (prefix === null) prefix = default_prefix;

	if (!message.content.startsWith(prefix)) return;

	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);

	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (!command)
		message.channel.send(
			'Infelizmente nao achei esse comando!' +
				`\n` +
				'Se foi algum erro de ortografia tente denovo'
		);
	if (command) command.run(client, message, args);
});


client.on('message', message => {
	let prefix = db.get(`prefix_${message.guild.id}`);
	if (prefix === null) prefix = default_prefix;
	if (message.content === `<@${client.user.id}>`)
		return message.channel.send(
			`O meu prefixo nesse servidor é ${prefix} use ${prefix}help para mais informações`
		);
});

client.login(process.env.TOKEN);